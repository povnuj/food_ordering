import { useReducer } from "react";
const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, actions) => {
  if (actions.type === "INPUT") {
    return { value: actions.value, isTouched: state.isTouched };
  }
  if (actions.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }
  if (actions.type === "RESET") {
    return { isTouched: false, value: "" };
  }
  return inputStateReducer;
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );
  //const [isTouched, setIsTouched] = useState(false);
  const valueIsvalid = validateValue(inputState.value);
  const hasError = !valueIsvalid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
  };
  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    hasError,
    isValid: valueIsvalid,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};
export default useInput;
