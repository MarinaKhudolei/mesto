//import initial cards
import { initialCards } from './initial-cards.js';

//import classes
import Card from './Card.js';

//import functions
import { closePopup } from './Card.js';

//modals and their buttons
const changeProfileModal = document.querySelector(".modal_type_change-profile");
const changeProfileButton = document.querySelector(".profile__change-button");
const changeProfileCloseButton = changeProfileModal.querySelector(".modal__close-button");

const addPlaceModal = document.querySelector('.modal_type_add-place');
const addPlaceButton = document.querySelector('.content__add-button');
const addPlaceCloseButton = addPlaceModal.querySelector(".modal__close-button");

//open-close modals
function openModal(modal) {
    modal.classList.add('modal_opened');
    document.addEventListener('keydown', modalEscapeListener);
}

function closeModal(modal) {
    modal.classList.remove('modal_opened');
    document.removeEventListener('keydown', modalEscapeListener);
}

//profile fields
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

//form fields
const changeProfileForm = document.querySelector('.form_type_change-profile');
const changeProfileName = changeProfileForm.querySelector('.form__item_type_name');
const changeProfileProfession = changeProfileForm.querySelector('.form__item_type_profession');

const addPlaceForm = document.querySelector('.form_type_add-place');
const addPlaceTitle = addPlaceForm.querySelector('.form__item_type_title');
const addPlaceLink = addPlaceForm.querySelector('.form__item_type_image-link');

//handle submit button state
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

//handle form errors
const clearForm = (form) => {
    const inputs = Array.from(form.querySelectorAll(".form__item"));
    inputs.forEach((inputElement) => {
        const errorElement = form.querySelector(`#${inputElement.name}-error`);
        inputElement.classList.remove("form__item_invalid");
        errorElement.textContent = "";
        errorElement.classList.remove("form__error_visible");
    });
};

//open-close button listeners
changeProfileButton.addEventListener('click', () => {
    openModal(changeProfileModal);
    changeProfileName.value = profileName.textContent;
    changeProfileProfession.value = profileProfession.textContent;

    clearForm(changeProfileForm);
    enableButton(changeProfileForm);
});

changeProfileCloseButton.addEventListener('click', ()=>{
    closeModal(changeProfileModal);
});

addPlaceButton.addEventListener('click', ()=>{
    openModal(addPlaceModal);
    addPlaceTitle.value = '';
    addPlaceLink.value = '';

    clearForm(addPlaceForm);
    disableButton(addPlaceForm);
});

addPlaceCloseButton.addEventListener('click', ()=>{
    closeModal(addPlaceModal);
});

//submit forms
function changeProfileFormSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = changeProfileName.value;
    profileProfession.textContent = changeProfileProfession.value;
    closeModal(changeProfileModal);
}

changeProfileForm.addEventListener('submit', changeProfileFormSubmitHandler);

//create cards
const placesSection = document.querySelector('.places');
const cardTemplate = document.querySelector('#card-template').content;

function renderCard(data) {
    placesSection.prepend((new Card(data, cardTemplate)).getElement());
}

    //create default cards
initialCards.forEach((data)=>{
    renderCard(data);
});

//add place card from form
function addPlace(evt) {
    evt.preventDefault();
    renderCard({name: addPlaceTitle.value, link: addPlaceLink.value});
    closeModal(addPlaceModal);
}

addPlaceForm.addEventListener('submit', addPlace);

//handle overlay listener
document.addEventListener('click', function(evt) {
    if(evt.target.classList.contains('modal')){
        closeModal(evt.target);
    } else if(evt.target.classList.contains('popup-window')){
        closePopup(evt.target);
    }
});

//handle escape listeners
function modalEscapeListener(evt){
    const modal = document.querySelector('.modal_opened');
    if(evt.key === "Escape"){
        closeModal(modal);
    }
}