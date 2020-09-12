class Card {
    constructor(data, template, handleCardClick) {
        this._card = template.cloneNode(true);
        this._element = this._card.querySelector('.card');

        this._image = this._card.querySelector('.card__image');
        this._title = this._card.querySelector('.card__title');

        this._image.src = data.link;
        this._image.alt = data.name;
        this._title.textContent = data.name;

        this._image.addEventListener('click', handleCardClick.bind(this, data));

        this._likeButton = this._card.querySelector('.card__button');
        this._likeButton.addEventListener('click', this._handleLikeButton.bind(this));

        this._deleteButton = this._card.querySelector('.card__delete-button');
        this._deleteButton.addEventListener('click', this._handleDeleteButton.bind(this));
    }

    _handleLikeButton() {
        this._likeButton.classList.toggle('card__button_liked');
    }

    _handleDeleteButton() {
        this._element.remove();
        this._card = null;
    }

    getElement() {
        return this._card;
    }
}

export { Card };