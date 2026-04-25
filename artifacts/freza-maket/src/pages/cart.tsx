import React from "react";
import { Link } from "wouter";
import { useCart } from "@/components/cart-context";
import { useDocumentTitle } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus, ArrowRight, Image as ImageIcon } from "lucide-react";

export default function CartPage() {
  useDocumentTitle("Кошик");
  const { items, updateQuantity, removeItem, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingCartIcon className="w-10 h-10 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-serif font-bold mb-4">Ваш кошик порожній</h1>
        <p className="text-muted-foreground mb-8">Схоже, ви ще не додали жодного виробу до кошика.</p>
        <Link href="/">
          <Button size="lg" className="bg-primary">
            Повернутися до каталогу
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-serif font-bold mb-8">Оформлення замовлення</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-4 p-4 border border-border rounded-lg bg-card">
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif font-bold text-lg">{item.productTitle}</h3>
                  <button onClick={() => removeItem(index)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  <p>Розмір: <span className="font-medium text-foreground">{item.sizeLabel}</span></p>
                  {item.notes && <p className="mt-1">Коментар: <span className="italic">"{item.notes}"</span></p>}
                </div>
                
                {item.attachmentName && (
                  <div className="inline-flex items-center gap-2 text-xs bg-muted px-2 py-1 rounded mb-4">
                    <ImageIcon className="w-3 h-3 text-accent" />
                    <span className="truncate max-w-[200px]">{item.attachmentName}</span>
                  </div>
                )}

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2 bg-secondary rounded-md p-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateQuantity(index, item.quantity - 1)}>
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center font-mono text-sm">{item.quantity}</span>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateQuantity(index, item.quantity + 1)}>
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="font-medium">
                    {item.unitPrice * item.quantity} грн
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-secondary/50 rounded-xl p-6 border border-border sticky top-24">
            <h2 className="font-serif font-bold text-xl mb-6">Підсумок</h2>
            
            <div className="space-y-3 text-sm mb-6 pb-6 border-b border-border">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Товари ({items.reduce((s, i) => s + i.quantity, 0)} шт.)</span>
                <span>{total} грн</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Доставка</span>
                <span className="text-muted-foreground">За тарифами НП</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end mb-8">
              <span className="font-medium">До сплати:</span>
              <span className="text-3xl font-serif font-bold text-primary">{total} грн</span>
            </div>

            <Link href="/checkout">
              <Button size="lg" className="w-full h-12 text-base bg-accent text-accent-foreground hover:bg-accent/90">
                Продовжити <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Just an icon component helper
function ShoppingCartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
