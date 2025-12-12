// import { useState } from "react";
import data from "../Data.json";
import { useCart } from "./CartProvider";

function ConfirmOrderModal({ isOpen, onClose }) {
  const { cart, clearCart } = useCart();
  //   const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) return null;
  const orderTotal = cart.reduce((sum, item) => {
    const product = data.find((p) => p.id === item.id);
    if (!product) return sum;
    return sum + product.price * item.quantity;
  }, 0);

  const handleOverlayClick = (e) => {
    // close when clicking the backdrop
    if (e.target === e.currentTarget) onClose();
  };
  return (
    <div
      className="fixed z-[9999] w-full bottom-0 inset-0 bg-black/60 lg:flex lg:justify-center lg:items-center"
      onClick={handleOverlayClick}
    >
      <div
        className=" bg-white p-4 rounded-2xl shadow-lg w-full h-3/4 fixed bottom-0 lg:static lg:mx-auto lg:h-3/4 lg:bottom-auto lg:max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="flex justify-between items-start">
            <div>
              <img src="/icon-order-confirmed.svg" alt="Order-Confirmed" />
              <p className="font-bold text-4xl">Order Confirmed</p>
              <p className="text-sm text-amber-900">
                We hope you enjoy your food!
              </p>
            </div>
          </div>
        </div>
        <div className="overflow-y-scroll h-3/5 sm:h-3/5 lg:h-3/5 mt-4 mb-4 bg-[#FBF8F5] rounded-lg p-2 border-b-1 border-gray-200">
          <div className="py-6 px-2 w-full ">
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
                    <div className="flex justify-between items-center gap-2 w-full">
                      <div className="flex justify-between items-center gap-4">
                        <div>
                          <img
                            src={product.image.thumbnail}
                            alt="thumbnail"
                            className="w-10 h-10"
                          />
                        </div>
                        <div>
                          {" "}
                          <div>
                            {" "}
                            <p className="text-xs font-medium">
                              {product.name}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {" "}
                            <p className="text-xs text-red-400 font-semibold">
                              {item.quantity}x
                            </p>
                            <p className="text-xs text-gray-400">
                              @ ${product.price}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        {" "}
                        <p className="text-xs text-gray-500">
                          ${(product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p>Order Total:</p>
          <p className="font-bold"> ${orderTotal.toFixed(2)}</p>
        </div>

        <button
          onClick={() => {
            console.log("Clear cart clicked");
            clearCart();
            onClose();
          }}
          className="mt-4 w-full text-center bg-orange-700 text-white p-3 rounded-4xl"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
}

export default ConfirmOrderModal;
