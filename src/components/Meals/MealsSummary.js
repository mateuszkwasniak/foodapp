import classes from "./MealsSummary.module.css";

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Przepyszny posiłek dla Ciebie</h2>
      <p>
        Wybierz ulubione danie z naszego szerokiego menu dostępnych posiłków i
        ciesz się wspaniałym lunchem lub obiadem w swoim domu.
      </p>
      <p>
        Wszystkie posiłki zostały ugotowane na bazie składników najwyższej
        jakości przez naszych doświadczonych kucharzy.
      </p>
    </section>
  );
};

export default MealsSummary;
