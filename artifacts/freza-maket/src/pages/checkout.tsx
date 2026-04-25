import React from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCart } from "@/components/cart-context";
import { useDocumentTitle } from "@/components/layout";
import { useCreateOrder } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  customerName: z.string().min(2, "Введіть ПІБ"),
  customerPhone: z.string().min(10, "Введіть коректний номер телефону"),
  customerEmail: z.string().email("Некоректний email").optional().or(z.literal("")),
  deliveryCity: z.string().min(2, "Введіть місто та відділення Нової Пошти"),
  paymentMethod: z.enum(["card", "fop", "prepayment"]),
  message: z.string().optional(),
});

export default function CheckoutPage() {
  useDocumentTitle("Оформлення замовлення");
  const { items, total, clearCart } = useCart();
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  
  const createOrder = useCreateOrder();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      deliveryCity: "",
      paymentMethod: "card",
      message: "",
    },
  });

  if (items.length === 0) {
    setLocation("/cart");
    return null;
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Find the first attachment to attach to the whole order if needed, 
      // though our schema supports attachment per order level or item level.
      // API expects it on Order level too:
      const firstItemWithFile = items.find(i => i.attachmentName);

      const orderData = {
        ...values,
        totalPrice: total,
        attachmentName: firstItemWithFile?.attachmentName,
        attachmentDataUrl: firstItemWithFile?.attachmentDataUrl,
        items: items.map(item => ({
          categoryId: item.categoryId,
          subcategoryId: item.subcategoryId,
          productId: item.productId,
          productTitle: item.productTitle,
          sizeLabel: item.sizeLabel,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          notes: item.notes,
        }))
      };

      const result = await createOrder.mutateAsync({ data: orderData });
      
      clearCart();
      setLocation(`/order/success?id=${result.id}`);
    } catch (error) {
      toast({
        title: "Помилка",
        description: "Не вдалося відправити замовлення. Спробуйте ще раз.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-serif font-bold mb-8">Дані для доставки</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-card p-6 border border-border rounded-xl">
              
              <div className="space-y-4">
                <h2 className="font-serif font-bold text-lg border-b border-border pb-2">Контакти</h2>
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ПІБ отримувача *</FormLabel>
                      <FormControl><Input placeholder="Іваненко Іван Іванович" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="customerPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Телефон *</FormLabel>
                        <FormControl><Input placeholder="+380..." type="tel" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="customerEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email (для чеку)</FormLabel>
                        <FormControl><Input placeholder="email@example.com" type="email" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h2 className="font-serif font-bold text-lg border-b border-border pb-2">Доставка (Нова Пошта)</h2>
                <FormField
                  control={form.control}
                  name="deliveryCity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Місто та відділення НП *</FormLabel>
                      <FormControl><Input placeholder="м. Київ, відділення №1" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4 pt-4">
                <h2 className="font-serif font-bold text-lg border-b border-border pb-2">Оплата</h2>
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0 p-3 border border-border rounded bg-background">
                            <FormControl><RadioGroupItem value="card" /></FormControl>
                            <FormLabel className="font-normal cursor-pointer flex-1">Оплата на карту (Монобанк)</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0 p-3 border border-border rounded bg-background">
                            <FormControl><RadioGroupItem value="fop" /></FormControl>
                            <FormLabel className="font-normal cursor-pointer flex-1">Рахунок ФОП (без ПДВ)</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0 p-3 border border-border rounded bg-background">
                            <FormControl><RadioGroupItem value="prepayment" /></FormControl>
                            <FormLabel className="font-normal cursor-pointer flex-1">Аванс 50% + накладений платіж</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4 pt-4">
                <h2 className="font-serif font-bold text-lg border-b border-border pb-2">Додатково</h2>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Коментар до замовлення</FormLabel>
                      <FormControl><Textarea placeholder="Залиште побажання..." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 mt-6" disabled={createOrder.isPending}>
                {createOrder.isPending ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                Підтвердити замовлення
              </Button>

            </form>
          </Form>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-secondary/50 rounded-xl p-6 border border-border sticky top-24">
            <h2 className="font-serif font-bold text-lg mb-4">Ваше замовлення</h2>
            <div className="space-y-4 mb-6">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm border-b border-border/50 pb-3 last:border-0 last:pb-0">
                  <div className="pr-4">
                    <p className="font-medium line-clamp-1">{item.productTitle}</p>
                    <p className="text-muted-foreground text-xs">{item.sizeLabel} x {item.quantity}</p>
                  </div>
                  <div className="font-medium whitespace-nowrap">{item.unitPrice * item.quantity} грн</div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-end border-t border-border pt-4">
              <span className="font-medium text-muted-foreground">До списання:</span>
              <span className="text-2xl font-serif font-bold text-primary">{total} грн</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
