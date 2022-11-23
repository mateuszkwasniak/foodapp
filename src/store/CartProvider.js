import { useReducer, useEffect } from "react";

import CartContext from "./cart-context";
//Przyklad uzycia Reducera

let defaultCartState;

const storedCart = localStorage.getItem("cart");
if (storedCart) {
  const storedCartParsed = JSON.parse(storedCart);
  defaultCartState = storedCartParsed;
} else {
  defaultCartState = { items: [], totalAmount: 0 };
}

let init = true;

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    //funkcja findIndex sprawdza dla kazdego elementu tablicy czy id elementu w tablicy jest takie samo jak id z akcji. jezeli napotka taki item to zwraca indeks
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItem;
    let updatedItems;

    if (existingCartItem) {
      updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItem = { ...action.item };
      updatedItems = state.items.concat(updatedItem);
    }

    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItem;
    let updatedItems;

    if (existingCartItem.amount > 1) {
      updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = [...state.items];
      updatedItems.splice(existingCartItemIndex, 1);
    }

    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  useEffect(() => {
    if (init) {
      init = false;
      return;
    }

    localStorage.setItem("cart", JSON.stringify(cartState));
    console.log("Local storage updated!");
  }, [cartState]);

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
