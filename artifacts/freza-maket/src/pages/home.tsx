import { getImageUrl } from "@/lib/utils";
import React from "react";
import { Link } from "wouter";
import { CATALOG } from "@/data/catalog";
import { useGetStats, getGetStatsQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDocumentTitle } from "@/components/layout";
import { ArrowRight, CheckCircle2, Star, Package, PenTool, Scissors, Type } from "lucide-react";

export default function Home() {
  useDocumentTitle("Головна");
  const { data: stats } = useGetStats({ query: { queryKey: getGetStatsQueryKey() } });

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
<img 
  src={getImageUrl("/images/hero.png")} 
  alt="Майстерня Freza Maket" 
  className="w-full h-full object-cover object-center"
/>
          <div className="absolute inset-0 bg-background/80 md:bg-background/60 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>
        
        <div className="container max-w-6xl mx-auto px-4 relative z-10 flex flex-col items-center text-center mt-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent-foreground border border-accent/30 text-sm font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            Прямо з виробництва
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary max-w-4xl leading-[1.1] mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Макети та фрезерування <br className="hidden md:block"/>
            <span className="text-accent italic">з любов'ю до деталей</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
            Брендоване пакування, латунні кліше для шкіри та дерева, наборні алфавіти. 
            Робимо самі, відповідаємо за кожен міліметр.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <Link href="/boxes">
              <Button size="lg" className="h-14 px-8 text-base bg-primary hover:bg-primary/90">
                Замовити коробки
              </Button>
            </Link>
            <Link href="/leather">
              <Button size="lg" variant="outline" className="h-14 px-8 text-base border-accent text-foreground hover:bg-accent/10">
                Кліше для шкіри
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold mb-4">Наші напрямки</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Оберіть категорію, щоб переглянути доступні розміри та ціни. Всі вироби виготовляються на нашому власному обладнанні.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CATALOG.map((category) => (
            <Link key={category.id} href={`/${category.slug}`} className="group block h-full">
              <Card className="h-full overflow-hidden border-border/50 hover:border-accent transition-colors duration-500 bg-card">
                <div className="aspect-[16/9] overflow-hidden relative">
 <img 
  src={getImageUrl(category.photoUrl)} 
  alt={category.title}
  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
/>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-primary-foreground">
                    <h3 className="text-2xl font-serif font-bold mb-2">{category.title}</h3>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
                      Перейти до каталогу <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Process / How it works */}
      <section className="bg-secondary/50 py-20 border-y border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4">Як ми працюємо</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Прозорий процес від вашої ідеї до готового виробу.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Package, title: "1. Вибір виробу", desc: "Обираєте потрібний розмір коробки або кліше в каталозі." },
              { icon: PenTool, title: "2. Ваш макет", desc: "Завантажуєте свій логотип. Якщо немає вектора — ми допоможемо." },
              { icon: Scissors, title: "3. Виробництво", desc: "Виготовляємо кліше або друкуємо коробки на нашому обладнанні." },
              { icon: CheckCircle2, title: "4. Відправка", desc: "Надійно пакуємо та відправляємо Новою Поштою." },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-background border border-border shadow-sm flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-serif font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      {stats && (
        <section className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center justify-center p-8 bg-card border border-border rounded-lg text-center">
              <span className="text-4xl font-serif font-bold text-primary mb-2">{stats.totalOrders}+</span>
              <span className="text-sm text-muted-foreground">Виконаних замовлень</span>
            </div>
            {stats.byCategory.map(cat => (
              <div key={cat.categoryId} className="flex flex-col items-center justify-center p-8 bg-card border border-border rounded-lg text-center">
                <span className="text-4xl font-serif font-bold text-accent mb-2">{cat.ordersCount}+</span>
                <span className="text-sm text-muted-foreground">{cat.label}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Testimonials snippet */}
      <section className="container max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-serif font-bold mb-10">Що кажуть клієнти</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card p-6 rounded-lg border border-border text-left relative">
            <div className="flex gap-1 text-accent mb-4">
              <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
            </div>
            <p className="text-foreground font-medium mb-4">"Кліше просто супер! Дуже чіткий відбиток на шкірі, працювати одне задоволення. Дякую за швидку відправку."</p>
            <p className="text-sm text-muted-foreground">— Олексій, майстерня шкіряних виробів</p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border text-left relative">
            <div className="flex gap-1 text-accent mb-4">
              <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
            </div>
            <p className="text-foreground font-medium mb-4">"Замовляли коробки під взуття зі своїм логотипом. Якість картону відмінна, логотип виглядає преміально."</p>
            <p className="text-sm text-muted-foreground">— Олена, бренд взуття</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container max-w-4xl mx-auto px-4">
        <div className="bg-primary text-primary-foreground rounded-2xl p-10 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Готові зробити замовлення?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
            Оберіть потрібний виріб в каталозі, завантажте макет та оформіть замовлення. Ми зв'яжемося з вами для підтвердження.
          </p>
          <Link href="/boxes">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8">
              Перейти до каталогу
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
