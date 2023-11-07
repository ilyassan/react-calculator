import { ACTIONS } from "./App";

export const keyMap = {
  0: { type: ACTIONS.ADD_DIGIT, payload: { digit: "0" } },
  1: { type: ACTIONS.ADD_DIGIT, payload: { digit: "1" } },
  2: { type: ACTIONS.ADD_DIGIT, payload: { digit: "2" } },
  3: { type: ACTIONS.ADD_DIGIT, payload: { digit: "3" } },
  4: { type: ACTIONS.ADD_DIGIT, payload: { digit: "4" } },
  5: { type: ACTIONS.ADD_DIGIT, payload: { digit: "5" } },
  6: { type: ACTIONS.ADD_DIGIT, payload: { digit: "6" } },
  7: { type: ACTIONS.ADD_DIGIT, payload: { digit: "7" } },
  8: { type: ACTIONS.ADD_DIGIT, payload: { digit: "8" } },
  9: { type: ACTIONS.ADD_DIGIT, payload: { digit: "9" } },
  "+": { type: ACTIONS.CHOOSE_OPERATION, payload: { operation: "+" } },
  "-": { type: ACTIONS.CHOOSE_OPERATION, payload: { operation: "-" } },
  "*": { type: ACTIONS.CHOOSE_OPERATION, payload: { operation: "*" } },
  "/": { type: ACTIONS.CHOOSE_OPERATION, payload: { operation: "÷" } },
  ".": { type: ACTIONS.ADD_DIGIT, payload: { digit: "." } },
  Enter: { type: ACTIONS.EVALUATE },
  Backspace: { type: ACTIONS.DELETE_DIGIT },
};
