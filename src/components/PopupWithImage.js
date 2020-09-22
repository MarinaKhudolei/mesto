import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupContainer = document.querySelector(".modal__popup-container");
        this._popupImage = this._popupContainer.querySelector(".modal__image");
        this._popupCaption = this._popupContainer.querySelector(
            ".modal__caption"
        );
    }

    open(data) {
        super.open();
        this._popupImage.src = data.link;
        this._popupImage.alt = data.name;
        this._popupCaption.textContent = data.name;
    }
}

export { PopupWithImage };
