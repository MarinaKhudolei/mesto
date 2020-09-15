import "../pages/index.css";

/** import initial cards */
import { initialCards } from "../utils/initial-cards.js";

/** import classes */
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { classes } from "../utils/classes.js";
import { FormValidator } from "../components/FormValidator.js";

/** modals and their buttons */
const changeProfileButton = document.querySelector(".profile__change-button");
const addPlaceButton = document.querySelector(".content__add-button");

/** profile fields */
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");

/** form fields */
const changeProfileForm = document.querySelector(".form_type_change-profile");
const changeProfileName = changeProfileForm.querySelector(
    ".form__item_type_name"
);
const changeProfileProfession = changeProfileForm.querySelector(
    ".form__item_type_profession"
);

const addPlaceForm = document.querySelector(".form_type_add-place");

/** create new classes */
const changeProfileModal = new PopupWithForm(
    "modal_type_change-profile",
    changeProfileFormSubmitHandler,
    changeProfileForm
);
const addPlaceModal = new PopupWithForm(
    "modal_type_add-place",
    addPlace,
    addPlaceForm
);
const popupOverlay = new PopupWithImage("popup-window");
const userInfo = new UserInfo(profileName, profileProfession);

/** handle image open */
function handleCardClick(data) {
    popupOverlay.open(data);
}

/** create validators */
function createValidator(form) {
    const newValidator = new FormValidator(classes, form);
    newValidator.enableValidation();
}

/** open-close button listeners */
changeProfileButton.addEventListener("click", () => {
    changeProfileModal.open();
    const userData = userInfo.getUserInfo();
    changeProfileName.value = userData.name;
    changeProfileProfession.value = userData.profession;
    createValidator(changeProfileForm);
});

addPlaceButton.addEventListener("click", () => {
    addPlaceModal.open();
    createValidator(addPlaceForm);
});

/** submit forms */
function changeProfileFormSubmitHandler(data) {
    userInfo.setUserInfo(data.formName, data.formProf);

    changeProfileModal.close();
}

/** create new card */
function newCard(data) {
    const newCard = new Card(data, cardTemplate, handleCardClick);
    const cardElement = newCard.getView();
    return cardElement;
}

/** create default cards */
const placesSection = document.querySelector(".places");
const cardTemplate = document.querySelector("#card-template").content;

const cardList = new Section(
    {
        items: initialCards,
        renderer: (item) => {
            const cardElement = newCard(item);
            cardList.addItem(cardElement, true);
        },
    },
    placesSection
);

cardList.renderItems();

/** add place card from form */
function addPlace(data) {
    const cardElement = newCard({
        name: data.formTitle,
        link: data.formImageLink,
    });
    cardList.addItem(cardElement, false);
    addPlaceModal.close();
}
