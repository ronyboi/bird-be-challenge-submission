import React from "react";

export default function Cart({ cart }) {
  let cartItems = cart[0];
  let totalPrice = cart[1];

  return (
    <div className="Cart">
      {cartItems.length === 0 ? (
        <div>
          <h2>Your cart is empty!</h2>
        </div>
      ) : (
        <div>
          <h2>Your cart:</h2>
          <div>
            <div>
              {cartItems.map((cartItem) => (
                <div key={cartItem.id}>
                  <h3>
                    <li>
                      {cartItem.item_name} for {cartItem.name} ... CAD{" "}
                      {cartItem.price}
                    </li>
                  </h3>
                </div>
              ))}
            </div>
          </div>
          <h2>Total Price: CAD {totalPrice}</h2>
        </div>
      )}
    </div>
  );
}
