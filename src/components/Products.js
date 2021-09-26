import React from "react";
import { useEffect, useState } from "react";
import Cart from "./Cart";
import Product from "./Product";

export default function Products() {
  const [data, setData] = useState();
  const [cart, setCart] = useState([[], 0]);

  useEffect(() => {
    fetch("https://web-ge8buw2ff-bird-and-be.vercel.app/api/interview")
      .then((res) => res.json())
      .then((data) => setData(data.products));
  }, []);

  return data != null ? (
    <div className="Products">
      {data.map((item, index) => (
        <Product key={index} item={item} cart={cart} setCart={setCart} />
      ))}
      <Cart cart={cart} />
    </div>
  ) : (
    <div></div>
  );
}
