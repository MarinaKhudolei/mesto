class Popup {
    constructor(popupSelector) {
        this._popupSection = document.querySelector(`.${popupSelector}`);
        this._escListener = this._handleEscClose.bind(this);
        this._overlayListener = this._handleOverlayListener.bind(this);
    }

    open() {
        this._popupSection.classList.add(this._openCloseSelector);
        document.addEventListener("keydown", this._escListener);
        document.addEventListener("click", this._overlayListener);
    }

    close() {
        this._popupSection.classList.remove(this._openCloseSelector);
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
            evt.target.classList.contains("modal") ||
            evt.target.classList.contains("popup-window")
        ) {
            this.close();
        }
    }

    setEventListeners(closeButton) {
        closeButton.addEventListener("click", () => {
            this.close();
        });
    }
}

export { Popup };
