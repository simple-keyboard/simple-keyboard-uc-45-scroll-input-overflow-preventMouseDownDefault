import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import "./index.css";

let keyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button),
  preventMouseDownDefault: true
});

/**
 * Update simple-keyboard when input is changed directly
 */
document.querySelector(".input").addEventListener("input", event => {
  keyboard.setInput(event.target.value);
});

console.log(keyboard);

function onChange(input) {
  let inputElement = document.querySelector(".input");

  /**
   * Updating input's value
   */
  inputElement.value = input;
  console.log("Input changed", input);

  /**
   *
   * Synchronizing input caret position
   */
  let caretPosition = keyboard.caretPosition;
  if (caretPosition === null) caretPosition = input.length;

  setInputCaretPosition(inputElement, caretPosition);

  console.log("caretPosition", caretPosition);
}

function setInputCaretPosition(elem, pos) {
  if (elem.setSelectionRange) {
    elem.focus();
    elem.setSelectionRange(pos, pos);

    /**
     * Scrolling when caret is at the end of input
     */
    if (pos === elem.value.length) elem.scrollLeft = elem.scrollWidth;
  }
}

function onKeyPress(button) {
  console.log("Button pressed", button);

  /**
   * If you want to handle the shift and caps lock buttons
   */
  if (button === "{shift}" || button === "{lock}") handleShift();
}

function handleShift() {
  let currentLayout = keyboard.options.layoutName;
  let shiftToggle = currentLayout === "default" ? "shift" : "default";

  keyboard.setOptions({
    layoutName: shiftToggle
  });
}
