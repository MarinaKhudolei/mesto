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
    }

    _submitButtonHandler(evt) {
        evt.preventDefault();
        this._submitCallback();
        this.close();
    }

    setEventListeners() {
        super.setEventListeners(this._closeButton);
        this._submitButton.addEventListener("click", this._submitButtonHandler);
    }

    open(submitCallback) {
        super.open();
        this._submitCallback = submitCallback;
        this.setEventListeners();
    }
}

export { PopupSubmit };