class Popup {
    constructor(popupSelector) {
        this._popupSection = document.querySelector(`.${popupSelector}`);
        this._listener = null;
    }

    open() {
        this._popupSection.classList.add(this._openCloseSelector);
        this._listener = this._handleEscClose.bind(this);
        document.addEventListener('keydown', this._listener);
    }

    close() {
        this._popupSection.classList.remove(this._openCloseSelector);
        document.removeEventListener('keydown', this._listener);
        this._listener = null;
    }

    _handleEscClose(evt) {
        if(evt.key === "Escape"){
            this.close();
        }
    }

    setEventListeners(closeButton) {
        closeButton.addEventListener('click', () => {
            this.close();
        });
    }
}

export { Popup };