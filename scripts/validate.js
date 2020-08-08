//list of classes
const classes = {
    modalSelector: ".modal",
    formSelector: ".form",
    inputSelector: ".form__item",
    inputErrorClass: "form__item_invalid",
    submitButtonSelector: ".form__submit-button",
    inactiveButtonClass: "form__submit-button_disabled",
    errorClass: "form__error_visible",
};

const resetDefaultSubmit = (formElement) => {
    formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
    });
};

const validateElement = (
    inputElement,
    formElement,
    inputErrorClass,
    errorClass
) => {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    if (!inputElement.validity.valid) {
        //add invalid state of the field
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(errorClass);
    } else {
        //add valid state of the field
        inputElement.classList.remove(inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(errorClass);
    }
};

const validateAllElements = (
    inputs,
    inputElement,
    buttonSubmit,
    inactiveButtonClass
) => {
    const isFormValid = inputs.every(
        (inputElement) => inputElement.validity.valid
    );
    if (isFormValid) {
        //make button active
        buttonSubmit.classList.remove(inactiveButtonClass);
        buttonSubmit.disabled = false;
    } else {
        //make button inactive
        buttonSubmit.classList.add(inactiveButtonClass);
        buttonSubmit.disabled = true;
    }
};

//validate all forms
const enableValidation = ({
    formSelector,
    inputSelector,
    inputErrorClass,
    submitButtonSelector,
    inactiveButtonClass,
    errorClass,
}) => {
    //reset default submit and validation
    const forms = Array.from(document.querySelectorAll(formSelector));
    forms.forEach((formElement) => {
        resetDefaultSubmit(formElement);

        const inputs = Array.from(formElement.querySelectorAll(inputSelector));
        const buttonSubmit = formElement.querySelector(submitButtonSelector);

        inputs.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                //find the error connected to the field
                validateElement(inputElement, formElement, inputErrorClass, errorClass);

                //add button validation
                validateAllElements(
                    inputs,
                    inputElement,
                    buttonSubmit,
                    inactiveButtonClass
                );
            });
        });
    });
};

enableValidation(classes);
