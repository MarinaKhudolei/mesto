class Card {
    constructor(data, template, handleCardClick) {
        this._template = template;
        this._data = data;
        this._handleCardClick = handleCardClick.bind(this, data);
        this._handleLikeButton = this._handleLikeButton.bind(this);
        this._handleDeleteButton = this._handleDeleteButton.bind(this);
    }

    _getTemplate() {
        this._card = this._template.cloneNode(true);
        return this._card;
    }

    _setEventListeners(image, likeButton, deleteButton) {
        image.addEventListener("click", this._handleCardClick);
        likeButton.addEventListener("click", this._handleLikeButton);
        deleteButton.addEventListener("click", this._handleDeleteButton);
    }

    _handleLikeButton() {
        this._likeButton.classList.toggle("card__button_liked");
    }

    _handleDeleteButton() {
        this._element.remove();
        this._card = null;
    }

    getView() {
        this._cardElement = this._getTemplate();
        this._element = this._cardElement.querySelector(".card");

        this._image = this._cardElement.querySelector(".card__image");
        this._title = this._cardElement.querySelector(".card__title");
        this._likeButton = this._cardElement.querySelector(".card__button");
        this._deleteButton = this._cardElement.querySelector(
            ".card__delete-button"
        );

        this._image.src = this._data.link;
        this._image.alt = this._data.name;
        this._title.textContent = this._data.name;

        this._setEventListeners(
            this._image,
            this._likeButton,
            this._deleteButton
        );

        return this._cardElement;
    }
}

export { Card };
