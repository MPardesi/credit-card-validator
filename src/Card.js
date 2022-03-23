import { React, useState } from "react";
import Styles from "../src/Styles/Card.css";

export default function Card() {
  const invalidLength = "Input must be of 4 length";
  const invalidInput = "Please provide only numeric value";
  const invalidCardNumber = "Please provide valid credit card number";

  const [first, setfirst] = useState();
  const [second, setsecond] = useState();
  const [third, setthird] = useState();
  const [fourth, setfourth] = useState();

  const [resultToDisplay, setresultToDisplay] = useState([]);

  // validation
  function lengthShouldBe4(e) {
    /// length for each box must be 4
    if (e.target.value.length > 0 && e.target.value.length !== 4) {
      e.target.focus();
      alert(invalidLength);
    }
  }

  function lengthShouldBe16(temp) {
    /// length for each box must be 4
    // if input is empty or whitespace or final
    // length is other than 16 this function will give false otherwise true
    return !temp || !temp.trim() || temp.length === 16;
  }

  function isOnlyNumbers(val) {
    // this function will retrun true if input have only numbers else it will return false
    const re = /^[0-9\b]+$/;
    return val === "" || re.test(val);
  }

  function reset() {
    setfirst("");
    setsecond("");
    setthird("");
    setfourth("");
  }

  // Event han]dlers

  function handleOnChange(e) {
    if (!isOnlyNumbers(e.target.value)) {
      alert(invalidInput);
      return;
    }

    if (e.target.id === "first") setfirst(e.target.value);

    if (e.target.id === "second") setsecond(e.target.value);

    if (e.target.id === "third") setthird(e.target.value);

    if (e.target.id === "fourth") setfourth(e.target.value);
  }

  function onSubmit(e) {
    if (!(first && second && third && fourth)) {
      alert(invalidCardNumber);
      return;
    }

    let temp =
      first.toString() +
      second.toString() +
      third.toString() +
      fourth.toString();
    // first check temp is not undefined or null then
    //remove spaces from right and left and check its not undefined or null
    // finally check input should have total 16 digits
    if (!lengthShouldBe16(temp)) {
      alert(invalidCardNumber);
      return;
    }

    resultToDisplay.push(temp);
    setresultToDisplay([...resultToDisplay]);
    reset();
  }

  function deleteCard(e) {
    const index = e.target.id;
    if (index > -1) {
      resultToDisplay.splice(index, 1); // 2nd parameter means remove one item only
    }
    setresultToDisplay([...resultToDisplay]);
  }

  function handlePaste(e) {
    let copiedText = e.clipboardData.getData("text").trim();

    // validate
    // length=16
    // numbers only

    if (lengthShouldBe16(copiedText) && isOnlyNumbers(copiedText)) {
      // length is 16 at this place

      // split input into equal part
      let splittedResult = [];
      const chunkSize = 4;
      for (let i = 0; i < copiedText.length; i += chunkSize) {
        splittedResult.push(copiedText.slice(i, i + chunkSize));
      }

      // finally assign data to textbox respectively
      setfirst(splittedResult[0]);
      setsecond(splittedResult[1]);
      setthird(splittedResult[2]);
      setfourth(splittedResult[3]);
    } else {
      alert(invalidInput);
      return;
    }
  }

  // html code
  return (
    <div>
      <div className="container">
        <div>
          <label>Card Number*</label> &nbsp;
          <input
            type="text"
            id="first"
            maxLength={4}
            value={first}
            onBlur={lengthShouldBe4}
            onChange={handleOnChange}
            onPaste={handlePaste}
          />{" "}
          &nbsp;
          <input
            type="text"
            id="second"
            maxLength={4}
            value={second}
            onBlur={lengthShouldBe4}
            onChange={handleOnChange}
          />
          &nbsp;
          <input
            type="text"
            id="third"
            maxLength={4}
            value={third}
            onBlur={lengthShouldBe4}
            onChange={handleOnChange}
          />
          &nbsp;
          <input
            type="text"
            id="fourth"
            maxLength={4}
            value={fourth}
            onBlur={lengthShouldBe4}
            onChange={handleOnChange}
          />
          &nbsp;
          <button id="btnsubmit" type="submit" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
      <br />

      {resultToDisplay.map((ele, index) => {
        return (
          <div id="resultContainer">
            <div key={ele}>
              <div class="resultItem">
                {ele}&nbsp;{" "}
                <button id={index} className="btnDelete" onClick={deleteCard}>
                  Delete
                </button>{" "}
              </div>
            </div>{" "}
          </div>
        );
      })}
    </div>
  );
}
