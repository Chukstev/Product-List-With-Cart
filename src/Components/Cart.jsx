import { useCart } from "./CartProvider";
import CartItems from "./CartItem";

function Cart() {
  const { cart } = useCart();

  const isEmpty = !cart || cart.length === 0;

  return (
    <div className="p-6 bg-white m-6 w-auto lg:w-96 rounded-2xl h-auto lg:sticky lg:top-6 lg:self-start shadow-gray-50 shadow-2xl">
      <h1 className="text-orange-700 font-bold text-lg">
        Your Cart ({cart.length})
      </h1>
      <div className="flex">
        {isEmpty ? (
          <div className="flex flex-col w-full justify-center items-center">
            {" "}
            <img
              src="/Images/illustration-empty-cart.svg"
              alt="Empty Cart"
              //   className="w-32 h-32"
            />
            <p className="text-sm text-amber-900">
              Your added items will appear here.
            </p>
          </div>
        ) : (
          <CartItems />
        )}
      </div>
    </div>
  );
}

export default Cart;
