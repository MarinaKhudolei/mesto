//list of classes
const classes = {
    formSelector: ".form",
    inputSelector: ".form__item",
    inputErrorClass: "form__item_invalid",
    submitButtonSelector: ".form__submit-button",
    inactiveButtonClass: "form__submit-button_disabled",
    errorClass: "form__error_visible",
};

class FormValidator {
    constructor(classSettings, form) {
        this._classSettings = classSettings;
        this._form = form;

        this._inputs = Array.from(this._form.querySelectorAll(this._classSettings.inputSelector));
        this._buttonSubmit = this._form.querySelector(this._classSettings.submitButtonSelector);    
    }

    _resetDefaultSubmit(formElement) {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
    }

    _showInputError(errorElement, inputElement) {
        inputElement.classList.add(this._classSettings.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._classSettings.errorClass);
    }

    _hideInputError(errorElement, inputElement) {
        inputElement.classList.remove(this._classSettings.inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._classSettings.errorClass);
    }
    
    _handleErrorsState(inputElement) {
        this._errorElement = this._form.querySelector(`#${inputElement.id}-error`);

        if(inputElement.validity.valid) {
            this._hideInputError(this._errorElement, inputElement);
        } else {
            this._showInputError(this._errorElement, inputElement);
        }
    }

    _enableSubmitButton() {
        this._buttonSubmit.classList.remove(this._classSettings.inactiveButtonClass);
        this._buttonSubmit.disabled = false;
    }

    _disableSubmitButton() {
        this._buttonSubmit.classList.add(this._classSettings.inactiveButtonClass);
        this._buttonSubmit.disabled = true;
    }

    _formValidationCheck() {
        const isFormValid = this._inputs.every((input) => input.validity.valid);

        if(isFormValid) {
            this._enableSubmitButton();
        } else {
            this._disableSubmitButton();
        }
    }

    enableValidation() {
        this._resetDefaultSubmit(this._form);

        this._inputs.forEach((input) => {
            input.addEventListener('input', () => {
                this._handleErrorsState(input);

                this._formValidationCheck();
            });
        });
    }
}

export { classes, FormValidator };