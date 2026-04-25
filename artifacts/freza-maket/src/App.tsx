import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/components/cart-context";
import { Layout } from "@/components/layout";

import Home from "@/pages/home";
import CategoryPage from "@/pages/category";
import SubcategoryPage from "@/pages/subcategory";
import ProductPage from "@/pages/product";
import CartPage from "@/pages/cart";
import CheckoutPage from "@/pages/checkout";
import SuccessPage from "@/pages/success";
import AdminOrdersPage from "@/pages/admin";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        
        <Route path="/cart" component={CartPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/order/success" component={SuccessPage} />
        <Route path="/admin/orders" component={AdminOrdersPage} />
        
        {/* Dynamic Routes */}
        <Route path="/:categoryId" component={CategoryPage} />
        <Route path="/:categoryId/:subcategoryId" component={SubcategoryPage} />
        <Route path="/:categoryId/:subcategoryId/:productId" component={ProductPage} />
        
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
