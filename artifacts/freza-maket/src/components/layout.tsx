import React, { useEffect } from "react";
import { Link } from "wouter";
import { useCart } from "./cart-context";
import { ShoppingCart, Menu, X, Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | Freza Maket`;
  }, [title]);
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { items } = useCart();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-[100dvh] flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-sm">
              <Hammer className="w-5 h-5" />
            </div>
            <span className="font-serif font-bold text-lg tracking-tight group-hover:text-accent transition-colors">Freza Maket</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/boxes" className="hover:text-accent transition-colors">Коробки</Link>
            <Link href="/leather" className="hover:text-accent transition-colors">Кліше для шкіри</Link>
            <Link href="/wood" className="hover:text-accent transition-colors">Гравіювання на дереві</Link>
            <Link href="/alphabets" className="hover:text-accent transition-colors">Алфавіти</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative p-2 hover:bg-muted rounded-full transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background px-4 py-4 flex flex-col gap-4 shadow-lg">
            <Link href="/boxes" className="font-medium text-lg" onClick={() => setMenuOpen(false)}>Коробки з логотипом</Link>
            <Link href="/leather" className="font-medium text-lg" onClick={() => setMenuOpen(false)}>Кліше для шкіри</Link>
            <Link href="/wood" className="font-medium text-lg" onClick={() => setMenuOpen(false)}>Гравіювання на дереві</Link>
            <Link href="/alphabets" className="font-medium text-lg" onClick={() => setMenuOpen(false)}>Наборні алфавіти</Link>
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col">
        {children}
      </main>

      <footer className="bg-primary text-primary-foreground py-12 mt-12">
        <div className="container max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Hammer className="w-5 h-5 text-accent" />
              <span className="font-serif font-bold text-xl text-accent">Freza Maket</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              Макети фрези напряму з виробництва. Працюємо з любов'ю до деталей та матеріалів.
            </p>
          </div>
          <div>
            <h3 className="font-serif font-medium text-lg mb-4">Каталог</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link href="/boxes" className="hover:text-accent transition-colors">Коробки з логотипом</Link></li>
              <li><Link href="/leather" className="hover:text-accent transition-colors">Кліше для шкіри</Link></li>
              <li><Link href="/wood" className="hover:text-accent transition-colors">Гравіювання на дереві</Link></li>
              <li><Link href="/alphabets" className="hover:text-accent transition-colors">Наборні алфавіти</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif font-medium text-lg mb-4">Контакти</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>Instagram: @freza.maket</li>
              <li>TikTok: @freza.maket</li>
              <li className="mt-4"><Link href="/admin/orders" className="opacity-50 hover:opacity-100 transition-opacity">Адмін-панель</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
