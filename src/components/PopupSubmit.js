import { Popup } from "./Popup.js";

class PopupSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._openCloseSelector = "modal_opened";
        this._closeButton = this._popupSection.querySelector(
            ".modal__close-button"
        );
        this._submitButton = this._popupSection.querySelector(
            ".form__submit-button"
        );
        this._submitButtonHandler = this._submitButtonHandler.bind(this);
        this._submitCallback = null;

        this._submitButton.addEventListener("click", this._submitButtonHandler);
    }

    _submitButtonHandler(evt) {
        evt.preventDefault();
        this._submitCallback();
    }

    open(submitCallback) {
        this._submitCallback = submitCallback;
        super.open();
    }
}

export { PopupSubmit };