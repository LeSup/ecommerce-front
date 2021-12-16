/**
 * 将商品添加到购物车
 */

import { Product } from "../store/models/product";

export interface CartItem extends Product {
  count: number;
}

export const addItem = (item: Product, next: () => void) => {
  let cart: CartItem[] = getCart();

  cart.push({
    ...item,
    count: 1,
  });

  // 过滤重复项
  cart = Array.from(new Set(cart.map((item) => item._id))).map((item) => {
    return cart.find((product) => product._id === item)!;
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  next();
};

/**
 * 获取本地购物车数据
 */
export const getCart = () => {
  if (typeof window !== "undefined") {
    const cartJSON = localStorage.getItem("cart");
    if (cartJSON) {
      return JSON.parse(cartJSON) as CartItem[];
    }
  }
  return [];
};

/**
 * 更改购物车中商品的数量
 */

export const updateItem = (productId: string, count: number) => {
  let cart: CartItem[] = getCart();

  cart.forEach((item, index) => {
    if (item._id === productId) {
      item.count = count;
    }
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  return cart;
};

/**
 * 删除购物车中的商品
 */
export const deleteItem = (productId: string) => {
  let cart: CartItem[] = getCart();

  cart.forEach((item, index) => {
    if (item._id === productId) {
      cart.splice(index, 1);
    }
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  return cart;
};

/**
 * 获取商品数量
 */

export const itemCount = () => {
  return getCart().length;
};
