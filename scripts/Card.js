//open-close popups
const popupTemplate = document.querySelector('#popup').content;

const popupElement = popupTemplate.cloneNode(true);
const popupSection = document.querySelector('.popup-window');
const popupContainer = popupElement.querySelector('.popup');
const popupImage = popupContainer.querySelector('.popup__image');
const popupCaption = popupContainer.querySelector('.popup__caption');
const popupCloseButton = popupContainer.querySelector('.popup__close-button');

function openPopup(data){
    popupSection.classList.add('popup-window_opened');
    popupImage.src = data.link;
    popupImage.alt = data.name;
    popupCaption.textContent = data.name;

    document.addEventListener('keydown', popupEscapeListener);

    popupSection.append(popupElement);
}

function popupEscapeListener(evt){
    if(evt.key === "Escape"){
        closePopup(popupSection);
    }
}

export function closePopup(){
    popupSection.classList.remove('popup-window_opened');
    document.removeEventListener('keydown', popupEscapeListener);
}

popupCloseButton.addEventListener('click', closePopup);

class Card {
    constructor(data, template) {
        this._card = template.cloneNode(true);

        this._image = this._card.querySelector('.card__image');
        this._title = this._card.querySelector('.card__title');

        this._image.src = data.link;
        this._image.alt = data.name;
        this._title.textContent = data.name;

        this._image.addEventListener('click', () => {
            openPopup(data);
        });

        this._likeButton = this._card.querySelector('.card__button');
        this._likeButton.addEventListener('click', () => {
            this._handleLikeButton();
        });

        this._deleteButton = this._card.querySelector('.card__delete-button');
        this._deleteButton.addEventListener('click', () => {
            this._handleDeleteButton();
        });
    }

    _handleLikeButton() {
        this._likeButton.classList.toggle('card__button_liked');
    }

    _handleDeleteButton() {
        const listItem = this._deleteButton.closest('.card');
        listItem.remove();
    }

    getElement() {
        return this._card;
    }
}

export default Card;