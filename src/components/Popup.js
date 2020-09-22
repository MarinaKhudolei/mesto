class Popup {
    constructor(popupSelector) {
        this._popupSection = document.querySelector(`.${popupSelector}`);
        this._escListener = this._handleEscClose.bind(this);
        this._overlayListener = this._handleOverlayListener.bind(this);
        this.close = this.close.bind(this);
        this._closeButton = this._popupSection.querySelector('.modal__close-button');
        this._closeButton.addEventListener("click", this.close);
    }

    open() {
        this._popupSection.classList.add("modal_opened");
        document.addEventListener("keydown", this._escListener);
        document.addEventListener("click", this._overlayListener);
    }

    close() {
        this._popupSection.classList.remove("modal_opened");
        document.removeEventListener("keydown", this._escListener);
        document.removeEventListener("click", this._overlayListener);
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    _handleOverlayListener(evt) {
        if (
            evt.target.classList.contains("modal")
        ) {
            this.close();
        }
    }
}

export { Popup };
