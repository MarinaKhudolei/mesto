class FormValidator {
    constructor(classSettings, form) {
        this._classSettings = classSettings;
        this._inputSelector = classSettings.inputSelector;
        this._submitButtonSelector = classSettings.submitButtonSelector;
        this._inputErrorClass = classSettings.inputErrorClass;
        this._errorClass = classSettings.errorClass;
        this._inactiveButtonClass = classSettings.inactiveButtonClass;
        this._form = form;

        this._inputs = Array.from(
            this._form.querySelectorAll(this._inputSelector)
        );
        this._buttonSubmit = this._form.querySelector(
            this._submitButtonSelector
        );
        this._enableValidation();
    }

    _resetDefaultSubmit() {
        this._form.addEventListener("submit", (evt) => {
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
        errorElement.textContent = "";
        errorElement.classList.remove(this._errorClass);
    }

    _handleErrorsState(inputElement) {
        this._errorElement = this._form.querySelector(
            `#${inputElement.id}-error`
        );

        if (inputElement.validity.valid) {
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

    hideAllErrors() {
        this._inputs.forEach((input) => {
            const errorElement = this._form.querySelector(
                `#${input.id}-error`
            );
            this._hideInputError(errorElement, input);
        });
    }

    _formValidationCheck() {
        this._isFormValid = this._inputs.every((input) => input.validity.valid);

        if (this._isFormValid) {
            this.enableSubmitButton();
        } else {
            this.disableSubmitButton();
        }
    }

    _clearForm() {
        this._inputs.forEach((inputElement) => {
            this._errorElement = this._form.querySelector(
                `#${inputElement.name}-error`
            );
            inputElement.classList.remove("form__item_invalid");
            this._errorElement.textContent = "";
            this._errorElement.classList.remove("form__error_visible");
        });
    }

    _enableValidation() {
        this._resetDefaultSubmit();
        this._clearForm();
        this._formValidationCheck();

        this._inputs.forEach((input) => {
            input.addEventListener("input", () => {
                this._handleErrorsState(input);
                this._formValidationCheck();
            });
        });
    }
}

export { FormValidator };
