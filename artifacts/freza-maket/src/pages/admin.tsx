import React from "react";
import { useListOrders, getListOrdersQueryKey } from "@workspace/api-client-react";
import { useDocumentTitle } from "@/components/layout";
import { format } from "date-fns";
import { uk } from "date-fns/locale";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export default function AdminOrdersPage() {
  useDocumentTitle("Адмін-панель: Замовлення");
  
  const { data: orders, isLoading } = useListOrders({
    query: { queryKey: getListOrdersQueryKey() }
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'new': return <Badge variant="default" className="bg-blue-500">Нове</Badge>;
      case 'in_progress': return <Badge variant="secondary" className="bg-amber-500 text-white">В роботі</Badge>;
      case 'done': return <Badge variant="default" className="bg-green-600">Готово</Badge>;
      case 'cancelled': return <Badge variant="destructive">Скасовано</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-primary mb-2">Управління замовленнями</h1>
        <p className="text-muted-foreground">Внутрішня панель майстерні Freza Maket</p>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-20 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : !orders || orders.length === 0 ? (
          <div className="p-20 text-center text-muted-foreground">
            Немає замовлень
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Клієнт</TableHead>
                <TableHead>Контакти</TableHead>
                <TableHead>Сума</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Позицій</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="cursor-pointer hover:bg-muted/30">
                  <TableCell className="font-mono font-medium">#{order.id}</TableCell>
                  <TableCell className="text-sm">
                    {format(new Date(order.createdAt), "dd MMM yyyy, HH:mm", { locale: uk })}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{order.customerName}</div>
                    <div className="text-xs text-muted-foreground">{order.deliveryCity}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{order.customerPhone}</div>
                    {order.customerEmail && <div className="text-xs text-muted-foreground">{order.customerEmail}</div>}
                  </TableCell>
                  <TableCell className="font-bold text-primary">{order.totalPrice} грн</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-sm">
                    <div className="flex flex-col gap-1">
                      {order.items.slice(0, 2).map((item, i) => (
                        <div key={i} className="line-clamp-1" title={item.productTitle}>
                          {item.quantity}x {item.productTitle}
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <div className="text-xs italic text-muted-foreground">+{order.items.length - 2} ще</div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
