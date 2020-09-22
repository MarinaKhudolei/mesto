import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback, form) {
        super(popupSelector);

        this._submitCallback = submitCallback;

        this._form = form;
        this._submitButton = this._form.querySelector(".form__submit-button");

        this._handler = this._submitListenerCallback.bind(this);
        this._form.addEventListener("submit", this._handler);
    }

    _getInputValues() {
        this._inputList = this._form.querySelectorAll(".form__item");
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    _submitListenerCallback(evt) {
        evt.preventDefault();
        this._submitCallback(this._getInputValues());
    }

    close() {
        super.close();
        this._form.reset();
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = "Сохранение...";
        } else {
            this._submitButton.textContent = "Сохранить";
        }
    }
}

export { PopupWithForm };
