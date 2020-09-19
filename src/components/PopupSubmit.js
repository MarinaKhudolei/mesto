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
        this._closeCallback = null;
    }

    setCloseCallback(closeCallback) {
        this._closeCallback = closeCallback;
    }

    _submitButtonHandler(evt) {
        evt.preventDefault();
        this._closeCallback();
        this.close();
    }

    setEventListeners() {
        super.setEventListeners(this._closeButton);
        this._submitButton.addEventListener("click", this._submitButtonHandler);
    }

    open() {
        super.open();
        this.setEventListeners();
    }
}

export { PopupSubmit };