import { useEffect, useState } from "react";

import Card from "../UI/Cards";
import MealItem from "./MealItem/MealItem";

import classes from "./AvailableMeals.module.css";

//nie powinnismy uzywac funkcji asynchronicznej jako argumentu useEffect (zwracamy cleanup function, ktora musi byc synchroniczna a nie jak to robia funkcje async zwracac Promise), zamiast tego tworzymy asynchroniczna funkcje wewnatrz tej funckji.
const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  //poczatkowo nie mamy zadnych danych, po sciagnieciu ich przy uzyciu useEffect musimy przeladowac nasz komponent - zatem potrzebujemy statu, aby przekazac sciagniete dane i przeladowac komponent...
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_FIREBASE}/meals.json`
      );

      if (!response.ok) {
        throw new Error("Coś poszło nie tak...");
      }

      const responseData = await response.json();
      // Firebase zwraca nam obiekt  -> a my chcemy tablice:
      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: +responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    //pamietajmy ze funkcja async zwraca Promise. Aby zlapac rzucony w niej blad nie owijamy jej w try catch a uzywamy .catch()
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p className={classes.MealsLoading}>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.MealsError}>
        <p>{error}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
