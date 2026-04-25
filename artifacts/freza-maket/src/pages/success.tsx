import React from "react";
import { Link, useSearch } from "wouter";
import { useDocumentTitle } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SuccessPage() {
  useDocumentTitle("Замовлення прийнято");
  const search = useSearch();
  const orderId = new URLSearchParams(search).get("id") || "1001";
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(orderId);
    toast({ title: "Скопійовано", description: "Номер замовлення скопійовано в буфер обміну." });
  };

  return (
    <div className="container max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-100">
        <CheckCircle2 className="w-12 h-12 text-green-600" />
      </div>
      
      <h1 className="text-4xl font-serif font-bold mb-4 text-primary">Замовлення прийнято!</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Дякуємо за довіру до Freza Maket. Ми вже отримали ваші дані та макети. 
        Найближчим часом майстер зв'яжеться з вами для уточнення деталей та підтвердження.
      </p>

      <div className="bg-card border border-border rounded-xl p-8 max-w-sm mx-auto mb-10">
        <p className="text-sm text-muted-foreground mb-2">Номер вашого замовлення:</p>
        <div className="flex items-center justify-center gap-3">
          <span className="text-3xl font-mono font-bold text-accent">#{orderId}</span>
          <Button variant="ghost" size="icon" onClick={handleCopy} className="text-muted-foreground hover:text-foreground">
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/">
          <Button size="lg" className="w-full sm:w-auto bg-primary">
            На головну
          </Button>
        </Link>
        <a href="https://instagram.com/freza.maket" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
          <Button variant="outline" size="lg" className="w-full border-accent text-foreground">
            Ми в Instagram
          </Button>
        </a>
      </div>
    </div>
  );
}
