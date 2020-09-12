import { Popup } from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback, form) {
        super(popupSelector);

        this._submitCallback = submitCallback;
        this._openCloseSelector = 'modal_opened';

        this._closeButton = this._popupSection.querySelector(".modal__close-button");
        this._form = form;
    }

    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.form__item');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners(closeButton, form) {
        super.setEventListeners(closeButton);
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallback(this._getInputValues());
        });
    }

    open() {
        super.open();
        this.setEventListeners(this._closeButton, this._form);
    }

    close() {
        super.close();
        this._form.reset();
    }
}

export { PopupWithForm };