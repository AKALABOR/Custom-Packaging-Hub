import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { CATALOG, Product, ProductVariant } from "@/data/catalog";
import { useDocumentTitle } from "@/components/layout";
import { useCart } from "@/components/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, Upload, Image as ImageIcon, X, Minus, Plus, RotateCw } from "lucide-react";
import { getImageUrl } from "@/lib/utils";

export default function ProductPage({ params }: { params: { categoryId: string, subcategoryId: string, productId: string } }) {
  const { categoryId, subcategoryId, productId } = params;
  const category = CATALOG.find(c => c.slug === categoryId);
  const subcategory = category?.subcategories.find(s => s.id === subcategoryId);
  const product = subcategory?.products.find(p => p.id === productId);
  
  const [location, setLocation] = useLocation();
  const { addItem } = useCart();
  const { toast } = useToast();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(product?.variants[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  
  // File upload state
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag and resize state
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const posStart = useRef({ x: 0, y: 0 });

  if (!category || !subcategory || !product || !selectedVariant) {
    setLocation("/");
    return null;
  }

  useDocumentTitle(`${product.title}`);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    // Check size (max 5MB for UX, though we only base64 encode if < 1MB)
    if (selected.size > 5 * 1024 * 1024) {
      toast({
        title: "Файл завеликий",
        description: "Будь ласка, оберіть файл до 5МБ.",
        variant: "destructive"
      });
      return;
    }

    setFile(selected);

    // Create preview if image
    if (selected.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
        setPos({ x: 0, y: 0 });
        setScale(1);
      };
      reader.readAsDataURL(selected);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleAddToCart = async () => {
    let dataUrl = undefined;
    
    // Read file as data URL if small enough (e.g., < 1MB)
    if (file && file.size < 1024 * 1024) {
      dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });
    }

    addItem({
      categoryId: category.id,
      subcategoryId: subcategory.id,
      productId: product.id,
      productTitle: product.title,
      sizeLabel: selectedVariant.sizeLabel,
      quantity,
      unitPrice: selectedVariant.priceUah,
      notes,
      attachmentName: file?.name,
      attachmentDataUrl: dataUrl
    });

    toast({
      title: "Додано до кошика",
      description: `${product.title} (${selectedVariant.sizeLabel}) - ${quantity} шт.`
    });

    setLocation("/cart");
  };

  const isMockupTool = category.id === "boxes";
  const isVectorTool = product.hasVectors || category.id === "leather-cliche" || category.id === "wood-engraving";

  // Drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return; // Only left click
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    posStart.current = { x: pos.x, y: pos.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPos({ x: posStart.current.x + dx, y: posStart.current.y + dy });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    setScale(Math.min(Math.max(0.2, scale + delta), 3));
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center text-sm text-muted-foreground mb-8 flex-wrap gap-y-2">
        <Link href="/" className="hover:text-foreground whitespace-nowrap">Головна</Link>
        <ChevronRight className="w-4 h-4 mx-1 shrink-0" />
        <Link href={`/${category.slug}`} className="hover:text-foreground whitespace-nowrap">{category.title}</Link>
        <ChevronRight className="w-4 h-4 mx-1 shrink-0" />
        <Link href={`/${category.slug}/${subcategory.id}`} className="hover:text-foreground whitespace-nowrap">{subcategory.title}</Link>
        <ChevronRight className="w-4 h-4 mx-1 shrink-0" />
        <span className="text-foreground font-medium whitespace-nowrap">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Image / Mockup Tool */}
        <div className="space-y-6">
          <div className="aspect-[4/3] lg:aspect-square bg-secondary rounded-lg overflow-hidden relative border border-border">
            <img 
              src={getImageUrl(product.photoUrl)} 
              alt={product.title} 
              className="w-full h-full object-cover select-none pointer-events-none"
            />
            
            {/* Mockup Preview Overlay */}
            {isMockupTool && previewUrl && (
              <div 
                className="absolute inset-0 flex items-center justify-center overflow-hidden touch-none"
                onWheel={handleWheel}
              >
                <div 
                  className="absolute border border-dashed border-accent/50 p-2 bg-white/20 backdrop-blur-sm cursor-move group touch-none select-none"
                  style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})` }}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                >
                  <img src={previewUrl} alt="Logo preview" className="w-[150px] h-[150px] object-contain opacity-80 mix-blend-multiply pointer-events-none select-none" draggable={false} />
                  <div className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono text-background bg-foreground/50 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    (Тягніть або скрольте для зміни розміру)
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tools Area */}
          <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
            {isMockupTool && (
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif font-bold text-lg">Приміряти свій логотип</h3>
                  {previewUrl && (
                    <Button variant="ghost" size="sm" onClick={() => { setPos({x:0, y:0}); setScale(1); }} className="h-8 text-xs px-2">
                      <RotateCw className="w-3 h-3 mr-1" />
                      Скинути
                    </Button>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-4">Завантажте зображення (PNG/JPG), щоб побачити як воно виглядатиме на коробці. Можна тягати та змінювати масштаб коліщатком миші.</p>
              </div>
            )}
            
            {isVectorTool && (
              <div>
                <h3 className="font-serif font-bold text-lg mb-2">Завантажити макет</h3>
                <p className="text-sm text-muted-foreground mb-4">Приймаємо формати: .svg, .pdf, .ai, .eps, .cdr, .png, .jpg. Якщо немає вектора — ми підготуємо самі.</p>
                {category.id === "wood-engraving" && (
                  <div className="inline-flex items-center gap-2 px-2 py-1 bg-muted text-muted-foreground text-xs rounded mb-4">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    Онлайн-трасування — скоро. Поки робиться майстром вручну.
                  </div>
                )}
              </div>
            )}

            {!file ? (
              <div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept={isVectorTool ? ".svg,.pdf,.ai,.eps,.cdr,.png,.jpg" : ".png,.jpg,.jpeg"}
                />
                <Button 
                  variant="outline" 
                  className="w-full h-12 border-dashed border-2 hover:bg-secondary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Обрати файл
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-muted p-3 rounded border border-border">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 bg-background rounded flex items-center justify-center shrink-0 border border-border">
                    {previewUrl ? (
                      <img src={previewUrl} alt="Preview" className="w-8 h-8 object-contain" />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => { setFile(null); setPreviewUrl(null); }}>
                  <X className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Info & Form */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">{product.title}</h1>
          <div className="text-2xl font-medium text-accent mb-6">
            {selectedVariant.priceUah} <span className="text-lg text-muted-foreground">грн / шт</span>
          </div>

          <div className="space-y-8 flex-1">
            {/* Variants */}
            <div>
              <Label className="text-base font-serif font-bold mb-3 block">Розмір</Label>
              <RadioGroup 
                value={selectedVariant.id} 
                onValueChange={(val) => {
                  const v = product.variants.find(v => v.id === val);
                  if (v) setSelectedVariant(v);
                }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {product.variants.map((v) => (
                  <div key={v.id}>
                    <RadioGroupItem value={v.id} id={v.id} className="peer sr-only" />
                    <Label
                      htmlFor={v.id}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-accent peer-data-[state=checked]:bg-accent/5 [&:has([data-state=checked])]:border-accent cursor-pointer transition-all"
                    >
                      <span className="font-medium text-base mb-1">{v.sizeLabel}</span>
                      <span className="text-sm text-muted-foreground">{v.priceUah} грн</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Quantity */}
            <div>
              <Label className="text-base font-serif font-bold mb-3 block">Кількість</Label>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>
                  <Minus className="w-4 h-4" />
                </Button>
                <div className="w-16 text-center font-mono text-lg">{quantity}</div>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="w-4 h-4" />
                </Button>
                {category.id === "boxes" && quantity >= 50 && (
                  <span className="text-sm text-green-600 ml-4 font-medium animate-in fade-in">Оптова знижка застосовується менеджером!</span>
                )}
              </div>
            </div>

            {/* Notes */}
            <div>
              <Label className="text-base font-serif font-bold mb-3 block">Коментар до виробу (необов'язково)</Label>
              <Input 
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Особливі побажання, деталі кріплення..."
                className="bg-card"
              />
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-border">
            <div className="flex justify-between items-center mb-6">
              <span className="font-medium text-muted-foreground">Всього:</span>
              <span className="text-3xl font-serif font-bold text-primary">{selectedVariant.priceUah * quantity} грн</span>
            </div>
            <Button size="lg" className="w-full h-14 text-lg bg-primary hover:bg-primary/90" onClick={handleAddToCart}>
              Додати до замовлення
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
