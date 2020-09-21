class Card {
    constructor(data, userId, template, handleCardClick, handleSubmitPopup, handleLikes) {
        this._template = template;
        this._userId = userId;
        this._link = data.link;
        this.setLikes(data);
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
        this._cardElement = null;
    }

    _getTemplate() {
        return this._template.cloneNode(true);
    }

    _setEventListeners() {
        this._image.addEventListener("click", this._handleCardClick);
        this._likeButton.addEventListener("click", this._finalLikesHandler);
        this._deleteButton.addEventListener("click", this._handleSubmitPopup);
    }

    _finalLikesHandler() {
        this._handleLikes(this);
    }

    handleLikeButton() {
        this._likeButton.classList.toggle("card__button_liked");
        this._likeNumber.textContent = this._likes.length;
    }

    _handleDeleteButton() {
        this._element.remove();
        this._cardElement = null;
    }

    setLikes(data) {
        this._likes = Array.from(data.likes, user => user._id);
    }

    getLikes() {
        return this._likes;
    }

    getView() {
        this._cardElement = this._getTemplate();
        this._element = this._cardElement.querySelector(".card");

        this._image = this._cardElement.querySelector(".card__image");
        this._title = this._cardElement.querySelector(".card__title");
        this._likeButton = this._cardElement.querySelector(".card__button");
        this._likeNumber = this._cardElement.querySelector('.card__like');
        this._likeNumber.textContent = this._likes.length;
        this._deleteButton = this._cardElement.querySelector(
            ".card__delete-button"
        );
        if (this._ownerId !== this._userId) {
            this._deleteButton.classList.add("card__delete-button_invisible");
        }

        this._image.src = this._link;
        this._image.alt = this._name;
        this._title.textContent = this._name;

        this._handleLikes = this._handleLikes.bind(this);
        this._finalLikesHandler = this._finalLikesHandler.bind(this);

        this._setEventListeners();

        return this._cardElement;
    }
}

export { Card };
