import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupSelector, element) {
        super(popupSelector);
        this._popupContainer = element.querySelector(".modal__popup-container");
        this._popupImage = this._popupContainer.querySelector(".modal__image");
        this._popupCaption = this._popupContainer.querySelector(
            ".modal__caption"
        );
        this._popupSection.append(element);
    }

    open(data) {
        super.open();
        this._popupImage.src = data.link;
        this._popupImage.alt = data.name;
        this._popupCaption.textContent = data.name;
        this._setCloseButtonListener();
    }

    close(){
        this._closeButton.removeEventListener("click", this.close);
        super.close();
    }
}

export { PopupWithImage };
