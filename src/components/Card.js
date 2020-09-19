class Card {
    constructor(data, template, handleCardClick, handleSubmitPopup, handleLikes) {
        this._template = template;
        this._link = data.link;
        this.likes = Array.from(data.likes, user => user._id);
        this._name = data.name;
        this._ownerId = data.owner._id;
        this.cardId = data._id;
        this._handleCardClick = handleCardClick.bind(this, data);
        this.handleLikeButton = this.handleLikeButton.bind(this);
        this._handleDeleteButton = this._handleDeleteButton.bind(this);
        this._handleSubmitPopup = handleSubmitPopup.bind(
            this,
            this.cardId,
            this._handleDeleteButton
        );
        this._handleLikes = handleLikes;
    }

    _getTemplate() {
        this._card = this._template.cloneNode(true);
        return this._card;
    }

    _setEventListeners(image, likeButton, deleteButton) {
        image.addEventListener("click", this._handleCardClick);
        likeButton.addEventListener("click", this._finalLikesHandler);
        deleteButton.addEventListener("click", this._handleSubmitPopup);
    }

    _finalLikesHandler() {
        this._handleLikes(this);
    }

    handleLikeButton() {
        this._likeButton.classList.toggle("card__button_liked");
        this._likeNumber.textContent = this.likes.length;
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
        this._likeNumber = this._cardElement.querySelector('.card__like');
        this._likeNumber.textContent = this.likes.length;
        this._deleteButton = this._cardElement.querySelector(
            ".card__delete-button"
        );
        if (this._ownerId !== "f3a683e2183a2c884dd91298") {
            this._deleteButton.classList.add("card__delete-button_invisible");
        }

        this._image.src = this._link;
        this._image.alt = this._name;
        this._title.textContent = this._name;

        this._handleLikes = this._handleLikes.bind(this);
        this._finalLikesHandler = this._finalLikesHandler.bind(this);

        this._setEventListeners(
            this._image,
            this._likeButton,
            this._deleteButton
        );

        return this._cardElement;
    }
}

export { Card };
