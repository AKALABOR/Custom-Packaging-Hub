import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { CATALOG } from "@/data/catalog";
import { useDocumentTitle } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ChevronRight } from "lucide-react";
import { getImageUrl } from "@/lib/utils";

export default function CategoryPage({ params }: { params: { categoryId: string } }) {
  const categoryId = params.categoryId; // "boxes", "leather", "wood", "alphabets"
  const category = CATALOG.find(c => c.slug === categoryId);
  const [location, setLocation] = useLocation();
  
  if (!category) {
    setLocation("/");
    return null;
  }
  
  useDocumentTitle(category.title);

  return (
    <div className="container max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground">Головна</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-foreground font-medium">{category.title}</span>
      </div>

      <div className="mb-12">
        <h1 className="text-4xl font-serif font-bold mb-4">{category.title}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">{category.description}</p>
      </div>

      <div className="space-y-16">
        {category.subcategories.map(sub => (
          <section key={sub.id}>
            <div className="flex items-center justify-between mb-6 border-b border-border pb-2">
              <h2 className="text-2xl font-serif font-bold">{sub.title}</h2>
              <Link href={`/${category.slug}/${sub.id}`} className="text-sm font-medium text-accent hover:text-accent/80 flex items-center gap-1">
                Переглянути всі <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sub.products.map(product => (
                <Link key={product.id} href={`/${category.slug}/${sub.id}/${product.id}`} className="group block">
                  <Card className="h-full overflow-hidden border-border/50 hover:border-accent transition-colors duration-300">
                    <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                      <img 
                        src={getImageUrl(product.photoUrl)} 
                        alt={product.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-serif font-bold text-lg mb-2 line-clamp-2">{product.title}</h3>
                      <div className="flex flex-col gap-1 text-sm text-muted-foreground mb-4">
                        {product.variants.slice(0, 2).map(v => (
                          <div key={v.id} className="flex justify-between">
                            <span>{v.sizeLabel}</span>
                            <span className="font-medium text-foreground">{v.priceUah} грн</span>
                          </div>
                        ))}
                        {product.variants.length > 2 && (
                          <div className="text-xs italic mt-1">та інші розміри...</div>
                        )}
                      </div>
                      <div className="text-accent font-medium flex items-center gap-1 text-sm">
                        Обрати розмір <ArrowRight className="w-3 h-3" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
