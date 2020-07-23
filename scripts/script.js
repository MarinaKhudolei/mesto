//change profile modal
const changeButton = document.querySelector('.profile__change-button');
const changeProfileModal = document.querySelector('.modal_type_change-profile');
const changeProfileCloseButton = changeProfileModal.querySelector('.modal__close-button');

//change profile form
const formName = document.querySelector('.form__item_type_name');
const formProf = document.querySelector('.form__item_type_profession');
const profileName = document.querySelector('.profile__name');
const profileProf = document.querySelector('.profile__profession');
const changeProfileForm = document.querySelector('.form_type_change-profile');

function changeContent (evt) {
    profileName.textContent = formName.value;
    profileProf.textContent = formProf.value;
    toggleModal(changeProfileModal);
    evt.preventDefault();
}

changeButton.addEventListener('click', () => {
    toggleModal(changeProfileModal);
})

changeProfileCloseButton.addEventListener('click', () => {
    toggleModal(changeProfileModal);
})

//create and render cards

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const cardTemplate = document.querySelector('#card').content;
const cardsSection = document.querySelector('.places');

initialCards.forEach((data) => {
    renderCard(data);
});
// create popup
const popupTemplate = document.querySelector('#popup').content;
const popup =  document.querySelector('.popup');

function createPopup(data) {
    const openPopupImage = popupTemplate.cloneNode(true);
    const popupContainer = openPopupImage.querySelector('.popup__container');
    const popupImage = openPopupImage.querySelector('.popup__image');
    const popupCaption = openPopupImage.querySelector('.popup__caption');
    const popupCloseButton = openPopupImage.querySelector('.popup__close-button');

    popup.classList.add('popup_opened');
    popup.append(popupContainer);
    popupCaption.textContent = data.name;
    popupImage.src = data.link;
    popupImage.alt = data.name;

    popupCloseButton.addEventListener('click', () => {
        popup.classList.remove('popup_opened');
        const myPopup = popupCloseButton.closest('.popup__container');
        myPopup.remove();
    })

    return openPopupImage;
}

function createCard(data) {
    const cardElement = cardTemplate.cloneNode(true);

    const cardTitle = cardElement.querySelector('.places__title');
    const cardImage = cardElement.querySelector('.places__image');
    cardImage.addEventListener('click', () => {
        createPopup(data);
    })

    const deleteCardButton = cardElement.querySelector('.places__delete-button');
    deleteCardButton.addEventListener('click', function () {
        const myCard = deleteCardButton.closest('.places__card');
        myCard.remove();
    })

    const likeCardButton = cardElement.querySelector('.places__button');
    likeCardButton.addEventListener('click', function() {
        likeCardButton.style.backgroundImage = "url('images/black-like-button.svg')";
    })

    cardTitle.textContent = data.name;
    cardImage.src = data.link;
    cardImage.alt = data.name;

    return cardElement;
}

function renderCard(data) {
    cardsSection.prepend(createCard(data));
}

//add place modal
const addButton = document.querySelector('.content__add-button');
const addPlaceModal = document.querySelector('.modal_type_add-place');
const addPlaceCloseButton = addPlaceModal.querySelector('.modal__close-button');

//add place form
const formTitle = document.querySelector('.form__item_type_title');
const formImageLink = document.querySelector('.form__item_type_image-link');
const addPlaceForm = document.querySelector('.form_type_add-place');

function addPlace(evt) {
    evt.preventDefault();
    renderCard({name: formTitle.value, link: formImageLink.value});
    toggleModal(addPlaceModal);
}

addButton.addEventListener('click', () => {
    toggleModal(addPlaceModal);
})

addPlaceCloseButton.addEventListener('click', () => {
    toggleModal(addPlaceModal);
})

changeProfileForm.addEventListener('submit', changeContent);
addPlaceForm.addEventListener('submit', addPlace);

//open and close modals

function toggleModal(modalWindow) {
    if (!modalWindow.classList.contains('modal_opened')) {
        formName.value = profileName.textContent;
        formProf.value = profileProf.textContent;
        formTitle.value = "Название";
        formImageLink.value = "Ссылка на картинку";
    }

    modalWindow.classList.toggle('modal_opened');
}
