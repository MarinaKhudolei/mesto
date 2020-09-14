import { Popup } from "./Popup.js";

import { FormValidator } from "./FormValidator.js";
import { classes } from "../utils/classes.js";

class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback, form) {
        super(popupSelector);

        this._submitCallback = submitCallback;
        this._openCloseSelector = "modal_opened";

        this._closeButton = this._popupSection.querySelector(
            ".modal__close-button"
        );
        this._form = form;

        this._handler = this._submitListenerCallback.bind(this);
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
        this.close();
    }

    setEventListeners(closeButton) {
        super.setEventListeners(closeButton);
        this._form.addEventListener("submit", this._handler);
    }

    open() {
        super.open();
        this.setEventListeners(this._closeButton);

        this._validator = new FormValidator(classes, this._form);
        this._validator.enableValidation();
    }

    close() {
        super.close();
        this._form.removeEventListener("submit", this._handler);
        this._form.reset();
    }
}

export { PopupWithForm };
