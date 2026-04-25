import React from "react";
import { Link, useLocation } from "wouter";
import { CATALOG } from "@/data/catalog";
import { useDocumentTitle } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function SubcategoryPage({ params }: { params: { categoryId: string, subcategoryId: string } }) {
  const { categoryId, subcategoryId } = params;
  const category = CATALOG.find(c => c.slug === categoryId);
  const subcategory = category?.subcategories.find(s => s.id === subcategoryId);
  const [location, setLocation] = useLocation();

  if (!category || !subcategory) {
    setLocation("/");
    return null;
  }

  useDocumentTitle(`${subcategory.title} | ${category.title}`);

  return (
    <div className="container max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center text-sm text-muted-foreground mb-8 flex-wrap gap-y-2">
        <Link href="/" className="hover:text-foreground whitespace-nowrap">Головна</Link>
        <ChevronRight className="w-4 h-4 mx-1 shrink-0" />
        <Link href={`/${category.slug}`} className="hover:text-foreground whitespace-nowrap">{category.title}</Link>
        <ChevronRight className="w-4 h-4 mx-1 shrink-0" />
        <span className="text-foreground font-medium whitespace-nowrap">{subcategory.title}</span>
      </div>

      <div className="mb-10">
        <h1 className="text-4xl font-serif font-bold mb-4">{subcategory.title}</h1>
        {categoryId === "leather" && (
          <div className="flex gap-4 mb-6">
            <span className="text-sm px-3 py-1 bg-muted rounded-full text-muted-foreground border border-border">Фільтри: З отворами / без</span>
            <span className="text-sm px-3 py-1 bg-muted rounded-full text-muted-foreground border border-border">Тип кріплення</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {subcategory.products.map(product => (
          <Link key={product.id} href={`/${category.slug}/${subcategory.id}/${product.id}`} className="group block">
            <Card className="h-full overflow-hidden border-border/50 hover:border-accent transition-colors duration-300 flex flex-col">
              <div className="aspect-square bg-muted relative overflow-hidden">
                <img 
                  src={product.photoUrl} 
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-5 flex flex-col flex-1">
                <h3 className="font-serif font-bold text-lg mb-4 flex-1">{product.title}</h3>
                <div className="flex flex-col gap-1 text-sm text-muted-foreground mb-4">
                  {product.variants.slice(0, 3).map(v => (
                    <div key={v.id} className="flex justify-between items-center py-1 border-b border-border/30 last:border-0">
                      <span>{v.sizeLabel}</span>
                      <span className="font-medium text-foreground">{v.priceUah} грн</span>
                    </div>
                  ))}
                  {product.variants.length > 3 && (
                    <div className="text-xs italic mt-1 text-center py-1">та інші розміри...</div>
                  )}
                </div>
                <div className="w-full text-center py-2 bg-secondary text-secondary-foreground text-sm font-medium rounded group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  Замовити
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
