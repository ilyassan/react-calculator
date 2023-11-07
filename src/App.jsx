import { useMemo, useReducer, useEffect, useCallback } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import "./style.css";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite && payload.digit !== ".") {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if (payload.digit !== "." && state.currentOperand === "0")
        return { ...state, currentOperand: payload.digit };
      if (payload.digit === "." && !state.currentOperand) return state;
      if (payload.digit === "." && state.currentOperand.includes("."))
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (!state.currentOperand && !state.prevOperand) return state;
      if (isNaN(state.currentOperand)) return state;

      if (!state.currentOperand) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (!state.prevOperand) {
        return {
          prevOperand: state.currentOperand,
          operation: payload.operation,
          currentOperand: null,
        };
      }

      let evaluateResult = evaluate(state);
      if (isNaN(evaluateResult)) return state;
      return {
        prevOperand: evaluateResult,
        operation: payload.operation,
        currentOperand: null,
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (!state.currentOperand) return state;
      if (state.currentOperand.length === 1)
        return { ...state, currentOperand: null };

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case ACTIONS.EVALUATE:
      if (!state.prevOperand || !state.currentOperand || !state.operation)
        return state;

      return {
        overwrite: true,
        prevOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
    default:
      return;
  }
};

const evaluate = ({ currentOperand, prevOperand, operation }) => {
  const prev = parseFloat(prevOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";

  let calcResult = "";
  switch (operation) {
    case "+":
      calcResult = prev + current;
      break;
    case "-":
      calcResult = prev - current;
      break;
    case "*":
      calcResult = prev * current;
      break;
    case "÷":
      calcResult = prev / current;
      break;
    default:
      return;
  }

  return calcResult.toString();
};

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

const formatOperand = (operand) => {
  if (!operand) return;
  if (isNaN(operand)) return "Math Error";

  const [integer, decimal] = operand.split(".");
  if (!decimal) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal.slice(0,3)}`;
};

function App() {
  const [{ currentOperand, prevOperand, operation }, dispatch] = useReducer(reducer, {});

  const prevOperandMemo = useMemo(() => formatOperand(prevOperand), [prevOperand]);
  const currentOperandMemo = useMemo(() => formatOperand(currentOperand), [currentOperand]);

  const { keyMap } = require("./keyActions");
  const handleKeyPress = useCallback((e) => {
      const key = e.key;
      if (keyMap[key]) {
        const action = keyMap[key];
        dispatch(action);
      }
    },
    [keyMap, dispatch]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="calculator">
      <div className="output">
        <div className="prev-operand">
          {prevOperandMemo} {operation}
        </div>
        <div className="current-operand">{currentOperandMemo}</div>
      </div>

      <button
        className="two-col"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>

      <OperationButton operation={"÷"} dispatch={dispatch} />

      <DigitButton digit={"1"} dispatch={dispatch} />
      <DigitButton digit={"2"} dispatch={dispatch} />
      <DigitButton digit={"3"} dispatch={dispatch} />

      <OperationButton operation={"*"} dispatch={dispatch} />

      <DigitButton digit={"4"} dispatch={dispatch} />
      <DigitButton digit={"5"} dispatch={dispatch} />
      <DigitButton digit={"6"} dispatch={dispatch} />

      <OperationButton operation={"+"} dispatch={dispatch} />

      <DigitButton digit={"7"} dispatch={dispatch} />
      <DigitButton digit={"8"} dispatch={dispatch} />
      <DigitButton digit={"9"} dispatch={dispatch} />

      <OperationButton operation={"-"} dispatch={dispatch} />

      <DigitButton digit={"."} dispatch={dispatch} />
      <DigitButton digit={"0"} dispatch={dispatch} />

      <button
        className="two-col"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

export default App;