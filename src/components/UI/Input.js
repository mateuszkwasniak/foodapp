//komponent wykorzystujacy forwardRef - przekazany ref z komponentu "<Input>" (w <MealItemForm>) umieszczamy w <input ref={ref}>
import React from "react";

import classes from "./Input.module.css";

//przypadek z uzyciem spread operatora do nadania atrybutow elementowi <input>
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input}></input>
    </div>
  );
});

export default Input;
