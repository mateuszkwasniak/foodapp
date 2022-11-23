import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

//Komponent z przykladem uzycia useRef();
const MealItemForm = (props) => {
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    //uzywamy refow zeby dostac sie do <input>. .value jest zawsze stringiem
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      return;
    }
    //jako ze jestesmy w formie nie mamy pelnego dostepu do rodzaju zamawianego produktu a jedynie do jego ilosci. wywolujemy zatem metode ktora przekazuje tylko ilosc, a nie metode dodawania do koszyka calego produktu za pomoca metody z kontekstu
    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Ilość"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Dodaj</button>
    </form>
  );
};

export default MealItemForm;
