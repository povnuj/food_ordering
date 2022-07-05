import styles from "./Checkout.module.css";

import useInput from "../hooks/use-input";
const Checkout = (props) => {

  const {
    value: enteredName,
    hasError: nameHasError,
    isValid: nameIsValid,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredStreet,
    hasError: streetHasError,
    isValid: streetIsValid,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: streetReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPostal,
    hasError: postalHasError,
    isValid: postalIsValid,
    valueChangeHandler: postalChangeHandler,
    inputBlurHandler: postalBlurHandler,
    reset: postalReset,
  } = useInput((value) => value.length > 5);

  const {
    value: enteredCity,
    hasError: cityHasError,
    isValid: cityIsValid,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: cityReset,
  } = useInput((value) => value.trim() !== "");

  let enteredIsValid = false;
  if (nameIsValid && streetIsValid && postalIsValid && cityIsValid) {
    enteredIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!enteredIsValid) {
      return;
    }
   
    props
      .onConfirm({
        name: enteredName,
        street: enteredStreet,
        postal: enteredPostal,
        city: enteredCity,
      });
    nameReset();
    streetReset();
    postalReset();
    cityReset();
  };

  const nameInputClasses = nameHasError
    ? `${styles.control} ${styles.invalid}`
    : styles.control;
  const streetInputClasses = streetHasError
    ? `${styles.control} ${styles.invalid}`
    : styles.control;

  const postalInputClasses = postalHasError
    ? `${styles.control} ${styles.invalid}`
    : styles.control;
  const cityInputClasses = cityHasError
    ? `${styles.control} ${styles.invalid}`
    : styles.control;

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your name</label>
        <input
          type="text"
          name="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        ></input>
        {nameHasError && (
          <p className={styles["txt-error"]}>Enter valid Name</p>
        )}
      </div>
      <div className={streetInputClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          name="street"
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
          value={enteredStreet}
        ></input>
        {streetHasError && (
          <p className={styles["txt-error"]}>Enter valid Street</p>
        )}
      </div>
      <div className={postalInputClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="number"
          name="postalCode"
          onChange={postalChangeHandler}
          onBlur={postalBlurHandler}
          value={enteredPostal}
        ></input>
        {postalHasError && (
          <p className={styles["txt-error"]}>Enter valid Postal Code</p>
        )}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
          value={enteredCity}
        ></input>
        {cityHasError && (
          <p className={styles["txt-error"]}>Enter valid City</p>
        )}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit} type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
};
export default Checkout;
