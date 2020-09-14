import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._openCloseSelector = "popup-window_opened";
        this._popupTemplate = document.querySelector("#popup").content;
        this._popupElement = this._popupTemplate.cloneNode(true);
        this._popupContainer = this._popupElement.querySelector(".popup");
        this._popupImage = this._popupContainer.querySelector(".popup__image");
        this._popupCaption = this._popupContainer.querySelector(
            ".popup__caption"
        );
        this._popupCloseButton = this._popupContainer.querySelector(
            ".popup__close-button"
        );
    }

    open(data) {
        super.open();
        super.setEventListeners(this._popupCloseButton);

        this._popupImage.src = data.link;
        this._popupImage.alt = data.name;
        this._popupCaption.textContent = data.name;

        this._popupSection.append(this._popupElement);
    }
}

export { PopupWithImage };
