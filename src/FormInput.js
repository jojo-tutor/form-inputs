import React, { useState } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import Cleave from "cleave.js/react";

const numberOptions = {
  numeral: true,
  numeralPositiveOnly: true,
  numeralThousandsGroupStyle: "thousand",
  delimiter: ", "
};

const typeOptions = {
  creditCard: {
    creditCard: true,
    creditCardStrictMode: true,
    delimiter: "-"
  },
  phoneNumber: {
    blocks: [0, 3, 3, 4],
    delimiters: ["(", ") ", "-"],
    numericOnly: true
  },
  integer: {
    ...numberOptions,
    numeralDecimalScale: 0
  },
  decimal: numberOptions,
  date: {
    date: true,
    delimiter: "/",
    datePattern: ["m", "y"]
  },
  cvv: {
    numericOnly: true,
    blocks: [3]
  }
};

export const CreditCardInput = props => (
  <FormInput {...props} type="creditCard" />
);

export const DecimalInput = props => <FormInput {...props} type="decimal" />;

export const IntegerInput = props => <FormInput {...props} type="integer" />;

export const PhoneNumberInput = props => (
  <FormInput {...props} type="phoneNumber" />
);

export const DateInput = props => <FormInput {...props} type="date" />;

export const CvvInput = props => <FormInput {...props} type="cvv" />;

const focusBlurHandler = (e, focusBlurFn, setActiveFn, isActive) => {
  if (focusBlurFn) {
    focusBlurFn(e);
  }
  setActiveFn(isActive);
};

const inputChangeHandler = (e, changeFn) => {
  changeFn(e.target.rawValue, e);
};

const FormInput = props => {
  const [labelActive, setLabelActive] = useState(false);
  const { type, options, ...restProps } = props;
  const {
    label,
    required,
    leftIcon,
    className,
    errorText,
    onFocus,
    onBlur,
    onChange,
    ...inputProps
  } = restProps;

  const inputType = typeOptions[type] ? "text" : type;
  const inputOptions = { ...typeOptions[type], ...options };
  const shapeLabel = required ? `${label} *` : label;
  const errorClassName = { error: !!errorText };

  const inputHandlerProps = {
    onFocus: e => focusBlurHandler(e, onFocus, setLabelActive, true),
    onBlur: e => focusBlurHandler(e, onBlur, setLabelActive, false),
    onChange: e => inputChangeHandler(e, onChange)
  };

  return (
    <div
      className={cn("formInput-container", {
        [inputType]: inputType,
        [className]: className
      })}
    >
      {leftIcon && (
        <div className={cn("leftIcon", errorClassName)}>{leftIcon}</div>
      )}
      <div className={cn("label", { active: labelActive }, errorClassName)}>
        {shapeLabel}
      </div>
      <Cleave
        type={inputType}
        options={inputOptions}
        {...inputProps}
        {...inputHandlerProps}
      />
      <hr className={cn("divider", errorClassName)} />
      {errorText && (
        <div className="error-container">
          <div className="error-message">{errorText}</div>
        </div>
      )}
    </div>
  );
};

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  errorText: PropTypes.string,
  className: PropTypes.string,
  leftIcon: PropTypes.node,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};

export default FormInput;
