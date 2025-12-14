import ProductList from "./Components/ProductList";
import Cart from "./Components/Cart";
import CartProvider from "./Components/CartProvider";

function App() {
  return (
    <CartProvider>
      <div className="bg-[#fBF8F5] flex flex-col lg:flex-row  lg:items-baseline">
        <ProductList />
        <Cart />
      </div>
    </CartProvider>
  );
}

export default App;
