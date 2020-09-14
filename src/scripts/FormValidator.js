class FormValidator {
    constructor(classSettings, form) {
        this._classSettings = classSettings;
        this._inputSelector = classSettings.inputSelector;
        this._submitButtonSelector = classSettings.submitButtonSelector;
        this._inputErrorClass = classSettings.inputErrorClass;
        this._errorClass = classSettings.errorClass;
        this._inactiveButtonClass = classSettings.inactiveButtonClass;
        this._form = form;

        this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._buttonSubmit = this._form.querySelector(this._submitButtonSelector);    
    }

    _resetDefaultSubmit(formElement) {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
    }

    _showInputError(errorElement, inputElement) {
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(errorElement, inputElement) {
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass);
    }
    
    _handleErrorsState(inputElement) {
        this._errorElement = this._form.querySelector(`#${inputElement.id}-error`);

        if(inputElement.validity.valid) {
            this._hideInputError(this._errorElement, inputElement);
        } else {
            this._showInputError(this._errorElement, inputElement);
        }
    }

    enableSubmitButton() {
        this._buttonSubmit.classList.remove(this._inactiveButtonClass);
        this._buttonSubmit.disabled = false;
    }

    disableSubmitButton() {
        this._buttonSubmit.classList.add(this._inactiveButtonClass);
        this._buttonSubmit.disabled = true;
    }

    _formValidationCheck() {
        const isFormValid = this._inputs.every((input) => input.validity.valid);

        if(isFormValid) {
            this.enableSubmitButton();
        } else {
            this.disableSubmitButton();
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

export { FormValidator };