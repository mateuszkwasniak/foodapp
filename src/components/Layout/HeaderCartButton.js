import { useContext, useEffect, useState } from "react";

import React from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const cartCtx = useContext(CartContext);

  //uzywamy .reduce zeby obliczyc ilosc produktow w koszyku -> przechowujemy jeden typ np. "sushi" i w property amount ilosc tego produktu, stad:
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const { items } = cartCtx;

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  //przyklad wykorzystania useEffect aby dodac animacje do guzika i po uplywie pewnego czasu usunac klase z ta animacja. Animacja z css wykonywana jest bezposrednio przy dodaniu klasy do elementu, dlatego zeby ja ponownie wywolac musimy zdjac i dodac klase do elementu. Interesuje nas zeby animacja wystepowala gdy zmianie ulegnie tablica z elementami z kontekstu wiec wyciagamy ja z cartCtx przy uzyciu destrukturyzacji i dodajemy jako dependecy w useEffect();
  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Twój koszyk</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
