import React from "react";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

import mealsImage from "../../assets/food3.jpg";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>Reactowe Żarcie</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="An image of food" />
      </div>
    </>
  );
};

export default Header;
