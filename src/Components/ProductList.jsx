import data from "../Data.json";
import React from "react";
import { useCart } from "./CartProvider";

function ProductList() {
  const { cart, addToCart, increment, decrement } = useCart();

  const getAmount = (id) => {
    const item = cart.find((c) => c.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <div className="p-6 space-y-8 lg:w-3/4">
      <header>
        {" "}
        <h1 className="text-3xl font-bold">Desserts</h1>
      </header>
      <main className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => {
          const amount = getAmount(item.id);
          return (
            <div
              key={item.id}
              className="w-auto h-auto rounded-2xl overflow-hidden"
            >
              <div>
                {" "}
                <picture>
                  <source
                    media="(min-width: 1024px)"
                    srcSet={item.image.desktop}
                  />
                  <source
                    media="(min-width: 640px)"
                    srcSet={item.image.tablet}
                  />
                  <img
                    src={item.image.mobile}
                    alt={item.name}
                    className={`border rounded-2xl ${
                      amount > 0 ? "border-red-400 border-2" : "border-none"
                    }`}
                  />
                </picture>
                {amount === 0 ? (
                  <button
                    onClick={() => addToCart(item.id)}
                    className="flex gap-2 border-1 border-orange-700 py-2 px-6 rounded-4xl mx-auto relative top-[-20px] bg-white"
                  >
                    <img
                      src="/Images/Icons/icon-add-to-cart.svg"
                      alt="Add to Cart"
                    />{" "}
                    Add To Cart
                  </button>
                ) : (
                  <div className="flex justify-between items-center bg-orange-700 w-[165px] py-2 px-6 rounded-full mx-auto relative top-[-20px]">
                    <button
                      onClick={() => decrement(item.id)}
                      className="text-white border-2 border-white rounded-full w-5 h-5"
                    >
                      <img
                        src="/Images/Icons/icon-decrement-quantity.svg"
                        className="mx-auto"
                      />
                    </button>
                    <span className="text-white font-semibold">{amount}</span>
                    <button
                      onClick={() => increment(item.id)}
                      className="text-white border-2 border-white rounded-full w-5 h-5"
                    >
                      <img
                        src="/Images/Icons/icon-increment-quantity.svg"
                        className="mx-auto"
                      />
                    </button>
                  </div>
                )}
              </div>
              <div className="space-y-0.5 pt-4">
                <p className="text-gray-400">{item.category}</p>
                <p className="font-semibold">{item.name}</p>
                <p className="text-orange-700 font-semibold">${item.price}</p>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}

export default ProductList;
