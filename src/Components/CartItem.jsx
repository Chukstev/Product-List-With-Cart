import { useCart } from "./CartProvider";
import { useState } from "react";
import data from "../Data.json";
import ConfirmOrderModal from "./ConfirmOrderModal";

function CartItems() {
  const { cart, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  // Calculate the total number of items in the cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const orderTotal = cart.reduce((sum, item) => {
    const product = data.find((p) => p.id === item.id);
    if (!product) return sum; // defensive: skip if product missing
    return sum + product.price * item.quantity;
  }, 0);

  return (
    <div className="py-6 px-2 w-full">
      {/* <h1>Your Cart ({totalItems})</h1> */}
      <ul>
        {cart.map((item) => {
          // Find the product details from data.json using the item's id
          const product = data.find((p) => p.id === item.id);
          if (!product) return null; // Or show a 'product not found' message

          return (
            <li
              key={item.id}
              className="w-full flex flex-col justify-between items-start mb-4 border-b-1 border-gray-200 pb-4"
            >
              <p className="text-xs font-medium">{product.name}</p>
              <div className="flex justify-between items-center gap-2 w-full">
                <div className="flex justify-between items-center gap-2">
                  <p className="text-xs text-orange-700 font-semibold">
                    {item.quantity}x
                  </p>
                  <p className="text-xs text-gray-400">@ ${product.price}</p>
                  <p className="text-xs text-gray-500">
                    ${(product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div>
                  {" "}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="border-1 border-gray-300 rounded-full w-4 h-4 text-gray-300 text-xs flex justify-center items-center"
                  >
                    x
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="flex justify-between items-center">
        {" "}
        <p>Order Total:</p>
        <p className="font-bold"> ${orderTotal.toFixed(2)}</p>
      </div>

      <div className="flex justify-center items-center gap-1 p-4 bg-[#FBF8F5] rounded-2xl mt-4">
        <img
          src="/icon-carbon-neutral.svg"
          alt="Carbon-neutral"
          className="h-4 w-4"
        />{" "}
        <p className="text-xs">
          This is a <span className="font-bold text-xs">carbon-neutral</span>{" "}
          delivery.
        </p>
      </div>

      <button
        onClick={() => setIsOpen(true)}
        className="mt-4 w-full text-center bg-orange-700 text-white p-3 rounded-4xl"
      >
        Confirm Order
      </button>

      <ConfirmOrderModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default CartItems;
