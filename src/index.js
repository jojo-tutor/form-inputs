import React from "react";
import ReactDOM from "react-dom";
import {
  CreditCardInput,
  PhoneNumberInput,
  IntegerInput,
  DecimalInput,
  DateInput,
  CvvInput
} from "./FormInput";

import "./styles.css";

class App extends React.Component {
  state = {
    fieldValues: {
      creditCard: "",
      phoneNumber: "",
      integer: "",
      decimal: "",
      date: "",
      cvv: ""
    }
  };
  handleChange = (value, e) => {
    const { id } = e.target;
    this.setState(({ fieldValues }) => ({
      fieldValues: { ...fieldValues, [id]: value }
    }));
  };

  render() {
    const {
      creditCard,
      phoneNumber,
      integer,
      decimal,
      date,
      cvv
    } = this.state.fieldValues;
    return (
      <div className="App">
        <div className="formField">
          <h2>Credit Card</h2>
          <CreditCardInput
            required
            id="creditCard"
            value={creditCard}
            leftIcon={<i className="hello" />}
            errorText="Field is required"
            placeholder="XXXX-XXXX-XXXX-XXXX"
            label="Enter your credit card number: "
            className="md-cell md-cell--12"
            onChange={this.handleChange}
          />
        </div>
        <div className="formField">
          <h2>Phone Number</h2>
          <PhoneNumberInput
            id="phoneNumber"
            type="phoneNumber"
            value={phoneNumber}
            placeholder="Enter your phone number"
            onChange={this.handleChange}
          />
        </div>
        <div className="formField">
          <h2>Integer</h2>
          <IntegerInput
            id="integer"
            type="integer"
            min="5"
            value={integer}
            placeholder="Enter integer"
            onChange={this.handleChange}
          />
        </div>
        <div className="formField">
          <h2>Decimal</h2>
          <DecimalInput
            id="decimal"
            type="decimal"
            value={decimal}
            placeholder="Enter decimal"
            onChange={this.handleChange}
          />
        </div>
        <div className="formField">
          <h2>Date</h2>
          <DateInput
            id="date"
            type="date"
            value={date}
            placeholder="Enter date (mm/yy)"
            onChange={this.handleChange}
          />
        </div>
        <div className="formField">
          <h2>Credit Card CVV</h2>
          <CvvInput
            id="cvv"
            type="cvv"
            value={cvv}
            placeholder="Enter CVV"
            onChange={this.handleChange}
          />
        </div>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
