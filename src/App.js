import { useState } from "react";

export default function App() {
  const [inputNumber, setInputNumber] = useState([]);
  const [saveAtFifteen, setSaveAtFifteen] = useState([]);
  const [dot, setDot] = useState(true);
  const [operator, setOperator] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false);
  const [keepResult, setKeepResult] = useState(0);
  var isAtFifteen = false;
  //var disableButtons = false;
  var resultDisplay;
  if (inputNumber.length > 14) isAtFifteen = true;

  function calculateResult(array) {
        // First, join consecutive numbers and handle decimals
        let processedArray = [];
        let currentNumber = '';
        
        for(let i = 0; i < array.length; i++) {
            // Check for numbers and decimal point
            if(!isNaN(array[i]) || array[i] === '.') {
                // If it's a decimal point, only add it if we haven't added one yet
                if(array[i] === '.' && !currentNumber.includes('.')) {
                    currentNumber += array[i];
                }
                // If it's a number, just add it
                else if(!isNaN(array[i])) {
                    currentNumber += array[i];
                }
            } else {
                // If it's an operator
                if(currentNumber !== '') {
                    processedArray.push(currentNumber); // Add the combined number
                    currentNumber = ''; // Reset currentNumber
                }
                processedArray.push(array[i]); // Add the operator
            }
        }
        // Don't forget to push the last number if exists
        if(currentNumber !== '') {
            processedArray.push(currentNumber);
        }
    
        // Handle multiplication and division first
        for(let i = 1; i < processedArray.length; i += 2) {
            if(processedArray[i] === '*' || processedArray[i] === '/') {
                const num1 = parseFloat(processedArray[i - 1]);
                const num2 = parseFloat(processedArray[i + 1]);
                let result;
                
                if(processedArray[i] === '*') {
                    result = num1 * num2;
                } else {
                    if(num2 === 0) {
                        return "Error: Division by zero";
                    }
                    result = num1 / num2;
                }
                
                // Round to avoid floating point precision issues
                result = Math.round(result * 1000000) / 1000000;
                
                processedArray.splice(i - 1, 3, result.toString());
                i -= 2;
            }
        }
        
        // Then handle addition and subtraction
        let result = parseFloat(processedArray[0]);
        for(let i = 1; i < processedArray.length; i += 2) {
            const nextNumber = parseFloat(processedArray[i + 1]);
            if(processedArray[i] === '+') {
                result += nextNumber;
            } else if(processedArray[i] === '-') {
                result -= nextNumber;
            }
            // Round to avoid floating point precision issues
            result = Math.round(result * 1000000) / 1000000;
        }
        
        return result;
}

  return (
    <div className="main-div">
      <header>
        <h1 className="calculator-header">Calculate like pro.</h1>
      </header>
      <div>
        <div className="calculator-foundation">
          <div className="calculator-display">
            <h1 className="input-number">{inputNumber}</h1>
          </div>

          <button className="clear-button" onClick={() => setInputNumber([])}>Clear</button>
          <div className="calculator-buttons">
            <button
              onClick={ !disableButtons || !isAtFifteen ? () =>
                setInputNumber((prev) => [...prev, 7]) : null
              }
            >
              7
            </button>
            <button
              onClick={() => {
                if (disableButtons) {
                 setInputNumber(() => [8]);
                 setDisableButtons(false);
                } else if (isAtFifteen) return;
                else setInputNumber((prev) => [...prev, 8])}
             }
            >
              8
            </button>
            <button
              onClick={() => {
                if (disableButtons) {
                 setInputNumber(() => [9]);
                 setDisableButtons(false);
                } else if (isAtFifteen) return;
                else setInputNumber((prev) => [...prev, 9])}
             }
            >
              9
            </button>
            <button onClick={() => {
              if (disableButtons) {
                setInputNumber([keepResult, "/"]);
                setDisableButtons(false);
              } else if (inputNumber[inputNumber.length - 1] !== '+' && 
                inputNumber[inputNumber.length - 1] !== '-' && 
                inputNumber[inputNumber.length - 1] !== '/' && 
                inputNumber[inputNumber.length - 1] !== '*') {
                setInputNumber((prev) => [...prev, "/"]);
                setOperator(!operator);
                setDot(true);
              }
            }}>/</button>

            <button
              onClick={() => {
                 if (disableButtons)  {
                  setInputNumber(() => [4]);
                  setDisableButtons(false);
                 } else if (isAtFifteen) return;
                 else setInputNumber((prev) => [...prev, 4])}
              }
            >
              4
            </button>
            <button
              onClick={() => {
                if (disableButtons)  {
                 setInputNumber(() => [5]);
                 setDisableButtons(false);
                } else if (isAtFifteen) return;
                else setInputNumber((prev) => [...prev, 5])}
             }
            >
              5
            </button>
            <button
             onClick={() => {
              if (disableButtons)  {
               setInputNumber(() => [6]);
               setDisableButtons(false);
              } else if (isAtFifteen) return;
              else setInputNumber((prev) => [...prev, 6])}
           }
            >
              6
            </button>
            <button onClick={() => {
              if (disableButtons) {
                setInputNumber([keepResult, "*"]);
                setDisableButtons(false);
              } else if (inputNumber[inputNumber.length - 1] !== '+' && 
                inputNumber[inputNumber.length - 1] !== '-' && 
                inputNumber[inputNumber.length - 1] !== '/' && 
                inputNumber[inputNumber.length - 1] !== '*') {
                setInputNumber((prev) => [...prev, "*"]);
                setOperator(!operator);
                setDot(true);
              }
          }}>*</button>

            <button
              onClick={() => {
                if (disableButtons)  {
                 setInputNumber(() => [1]);
                 setDisableButtons(false);
                } else if (isAtFifteen) return;
                else setInputNumber((prev) => [...prev, 1])}
             }
            >
              1
            </button>
            <button
              onClick={() => {
                if (disableButtons)  {
                 setInputNumber(() => [2]);
                 setDisableButtons(false);
                } else if (isAtFifteen) return;
                else setInputNumber((prev) => [...prev, 2])}
             }
            >
              2
            </button>
            <button
              onClick={() => {
                if (disableButtons)  {
                 setInputNumber(() => [3]);
                 setDisableButtons(false);
                } else if (isAtFifteen) return;
                else setInputNumber((prev) => [...prev, 3])}
             }
            >
              3
            </button>
            <button onClick={() => {
              if (disableButtons) {
                setInputNumber([keepResult, "-"]);
                setDisableButtons(false);
              } else if (inputNumber[inputNumber.length - 1] !== '+' && 
                inputNumber[inputNumber.length - 1] !== '-' && 
                inputNumber[inputNumber.length - 1] !== '/' && 
                inputNumber[inputNumber.length - 1] !== '*') {
                setInputNumber((prev) => [...prev, "-"]);
                setOperator(!operator);
                setDot(true);
              }
              }}>
              -
            </button>

            <button onClick={() => {
                 if (disableButtons)  {
                  setInputNumber(() => [0]);
                  setDisableButtons(false);
                 } else if (isAtFifteen) return;
                 else setInputNumber((prev) => [...prev, 0])}
              }>
              0
            </button>
            <button onClick={() => {
              if (dot) {
                setInputNumber((prev) => [...prev, "."]);
                setDot(false);
              }}}>.</button>
            <button onClick={() => {
              resultDisplay = calculateResult(inputNumber);
              setKeepResult(resultDisplay);
              setInputNumber(resultDisplay);
              setDisableButtons(true);
              }}>=</button>
            <button onClick={() => {
               if (disableButtons) {
                setInputNumber([keepResult, "+"]);
                setDisableButtons(false);
              } else if (inputNumber[inputNumber.length - 1] !== '+' && 
                inputNumber[inputNumber.length - 1] !== '-' && 
                inputNumber[inputNumber.length - 1] !== '/' && 
                inputNumber[inputNumber.length - 1] !== '*') {
                setInputNumber((prev) => [...prev, "+"]);
                setOperator(!operator);
                setDot(true);
              }
            }}>+</button>
          </div>
        </div>
      </div>
      <footer className="calculator-footer"></footer>
    </div>
  );
}
