import React, { useState } from "react";
import PasswordStrengthIndicator from "./components/StrengthChecker";
import { toast } from "react-hot-toast";
import { FaClipboard } from "react-icons/fa";
import { useForm } from "./useForm";
import { getRandomChar, getSpecialChar } from "./utils";

function App() {
  const [values, setValues] = useForm({
    length: 2,
    capital: true,
    small: true,
    number: false,
    symbol: false
  });
  const [result, setResult] = useState("");

  const fieldsArray = [
    {
      field: values.capital,
      getChar: () => getRandomChar(65, 90)
    },
    {
      field: values.small,
      getChar: () => getRandomChar(97, 122)
    },
    {
      field: values.number,
      getChar: () => getRandomChar(48, 57)
    },
    {
      field: values.symbol,
      getChar: () => getSpecialChar()
    }
  ];

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let generatedPassword = "";
    const checkedFields = fieldsArray.filter(({ field }) => field);

    for (let i = 0; i < values.length; i++) {
      const index = Math.floor(Math.random() * checkedFields.length);
      const letter = checkedFields[index]?.getChar();

      if (letter) {
        generatedPassword += letter;
      }
    }
    if (generatedPassword) {
      setResult(generatedPassword);
    } else {
      toast.error(" Please select at least one option");
    }
  };

  const handleClipboard = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      toast.success("Copied to your clipboard");
    } else {
      toast.error("No password to copy");
    }
  };

  return (
    <section>
      <div className="container">
        <form id="pg-form" onSubmit={handleOnSubmit}>
          <div className="result">
            <input type="text" id="result" readOnly value={result} />
            <div className="clipboard" onClick={handleClipboard}>
              <FaClipboard></FaClipboard>
            </div>
          </div>
          <div>
            <div className="charlength">
              <span>
                <label id="lable1">Character Length</label>
                <label id="lable10">{values.length}</label>
              </span>
              <br />
              <input
                type="range"
                min="2"
                max="20"
                step="1"
                name="length"
                value={values.length}
                onChange={setValues}
              />
            </div>
            <div className="field">
              <input
                type="checkbox"
                id="capital"
                name="capital"
                checked={values.capital}
                onChange={setValues}
              />
              <label id="lable2" htmlFor="capital">
                Include Uppercase Letter
              </label>
            </div>
            <div className="field">
              <input
                type="checkbox"
                id="small"
                name="small"
                checked={values.small}
                onChange={setValues}
              />
              <label id="lable2" htmlFor="small">
                Include Lowercase Letter
              </label>
            </div>
            <div className="field">
              <input
                type="checkbox"
                id="number"
                name="number"
                checked={values.number}
                onChange={setValues}
              />
              <label id="lable2" htmlFor="number">
                Include Number
              </label>
            </div>
            <div className="field">
              <input
                type="checkbox"
                id="symbol"
                name="symbol"
                checked={values.symbol}
                onChange={setValues}
              />
              <label id="lable2" htmlFor="symbol">
                Include Symbol
              </label>
            </div>
            {/* Strength */}
            <PasswordStrengthIndicator password={result} />
          </div>
          <button type="submit">GENERATE</button>
        </form>
      </div>
    </section>
  );
}

export default App;
