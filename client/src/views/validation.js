import React from 'react';
// NOTE: Deprecated
import Validation from 'react-validation';
// From v2.10.0
import validator from 'validator';

// Use Object.assign or any similar API to merge a rules
// NOTE: IE10 doesn't have Object.assign API natively. Use polyfill/babel plugin.
var required = (value) => {
    if (!value.toString().trim().length) {
        // We can return string or jsx as the 'error' prop for the validated Component
        return 'require';
    }
};

var email = (value) => {
    if (!validator.isEmail(value)) {
        return `${value} is not a valid email.`
    }
};

var lt = (value, props) => {
    // get the maxLength from component's props
    if (!value.toString().trim().length > props.maxLength) {
      // Return jsx
      return <span className="error">The value exceeded {props.maxLength} symbols.</span>
    }
  };
 
var alphabet = (value, props) => {
    if (!validator.isAlpha(value))
    return <span className="error">String should contain only letters (a-zA-Z)</span>
};
var number = (value, props) => {
    if (!validator.isInt(value))
    return <span className="error">Only proper number is required</span>
};

// This example shows a way to handle common task - compare two fields for equality
var password = (value, props) =>  {
    // rule function can accept argument:
    // components - components registered to Form mapped by name
        const password = props.password.state;
        const passwordConfirm = props.passwordConfirm.state;
        const isBothUsed = password
            && passwordConfirm
            && password.isUsed
            && passwordConfirm.isUsed;
        const isBothChanged = isBothUsed && password.isChanged && passwordConfirm.isChanged;
        if (isBothUsed && isBothChanged || password.value === passwordConfirm.value) {
            return <span className="error">Passwords should be equal.</span>
        }
        return password.value === passwordConfirm.value;
};

var passwordLogin = (value, props) =>  {    // rule function can accept argument:
    // components - components registered to Form mapped by name
        var password = props.passwordLogin.state;
        if (!password.value) {
            return validator.isEmpty(password.value)
        }
        if (validator.isEmpty(password.value)){
            return <span className="form-error is-visible">Password cannot be empty</span>
        }
    };