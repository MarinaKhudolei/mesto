import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popupSection.querySelector(".modal__image");
        this._popupCaption = this._popupSection.querySelector(
            ".modal__caption"
        );
    }

    open(data) {
        this._popupImage.src = data.link;
        this._popupImage.alt = data.name;
        this._popupCaption.textContent = data.name;
        super.open();
    }
}

export { PopupWithImage };
