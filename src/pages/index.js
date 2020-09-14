import '../pages/index.css';

/** import initial cards */
import { initialCards } from '../scripts/initial-cards.js';

/** import classes */
import { Card } from '../scripts/Card.js';
import { Section } from '../scripts/Section.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { UserInfo } from '../scripts/UserInfo.js';
import { FormValidator } from '../scripts/FormValidator.js';
import { classes } from '../scripts/classes.js';

/** modals and their buttons */
const changeProfileButton = document.querySelector(".profile__change-button");
const addPlaceButton = document.querySelector('.content__add-button');

/** profile fields */
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

/** form fields */
const changeProfileForm = document.querySelector('.form_type_change-profile');
const changeProfileName = changeProfileForm.querySelector('.form__item_type_name');
const changeProfileProfession = changeProfileForm.querySelector('.form__item_type_profession');

const addPlaceForm = document.querySelector('.form_type_add-place');
const addPlaceTitle = addPlaceForm.querySelector('.form__item_type_title');
const addPlaceLink = addPlaceForm.querySelector('.form__item_type_image-link');

/** create new classes */
const changeProfileModal = new PopupWithForm('modal_type_change-profile', changeProfileFormSubmitHandler, changeProfileForm);
const addPlaceModal = new PopupWithForm('modal_type_add-place', addPlace, addPlaceForm);
const popupOverlay = new PopupWithImage('popup-window');
const userInfo = new UserInfo(profileName, profileProfession);

/** handle image open */
function handleCardClick(data){
    popupOverlay.open(data);
}

/** handle submit button state */
const disableButton = (form) => {
    const buttonSubmit = form.querySelector(".form__submit-button");
    buttonSubmit.classList.add("form__submit-button_disabled");
    buttonSubmit.disabled = true;
};

const enableButton = (form) => {
    const buttonSubmit = form.querySelector(".form__submit-button");
    buttonSubmit.classList.remove("form__submit-button_disabled");
    buttonSubmit.disabled = false;
};

/** handle form errors */
const clearForm = (form) => {
    const inputs = Array.from(form.querySelectorAll(".form__item"));
    inputs.forEach((inputElement) => {
        const errorElement = form.querySelector(`#${inputElement.name}-error`);
        inputElement.classList.remove("form__item_invalid");
        errorElement.textContent = "";
        errorElement.classList.remove("form__error_visible");
    });
};

/** open-close button listeners */
changeProfileButton.addEventListener('click', () => {
    changeProfileModal.open();
    const userData = userInfo.getUserInfo();
    changeProfileName.value = userData.name;
    changeProfileProfession.value = userData.profession;

    clearForm(changeProfileForm);
    enableButton(changeProfileForm);
});

addPlaceButton.addEventListener('click', ()=>{
    addPlaceModal.open();

    clearForm(addPlaceForm);
    disableButton(addPlaceForm);
});

/** submit forms */
function changeProfileFormSubmitHandler(data) {
    userInfo.setUserInfo(data.formName, data.formProf);

    changeProfileModal.close();
}

/** create default cards */
const placesSection = document.querySelector('.places');
const cardTemplate = document.querySelector('#card-template').content;

const cardList = new Section({items: initialCards, renderer: (item) => {
    const card = new Card(item, cardTemplate, handleCardClick);
    const cardElement = card.getView();
    cardList.addItem(cardElement);
}}, placesSection);

cardList.renderItems();

/** add place card from form */
function addPlace(data) {
    const newCard = new Card({name: data.formTitle, link: data.formImageLink}, cardTemplate, handleCardClick);
    const cardElement = newCard.getView();
    cardList.addItem(cardElement);
    addPlaceModal.close();
}

/** handle overlay listener */
document.addEventListener('click', function(evt) {
    if(evt.target.classList.contains('modal')){
        changeProfileModal.close();
        addPlaceModal.close();
    } else if(evt.target.classList.contains('popup-window')){
        popupOverlay.close();
    }
});

/** enable validation */
const enableValidation = (classes) => {
    const forms = Array.from(document.querySelectorAll(classes.formSelector));

    forms.forEach((formElement) => {
        const validator = new FormValidator(classes, formElement);
        validator.enableValidation();
    });
}

enableValidation(classes); 