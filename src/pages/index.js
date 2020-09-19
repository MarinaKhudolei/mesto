import "../pages/index.css";

/** import classes */
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupSubmit } from "../components/PopupSubmit.js";
import { UserInfo } from "../components/UserInfo.js";
import { classes } from "../utils/classes.js";
import { FormValidator } from "../components/FormValidator.js";

import { Api } from "../components/Api.js";

/** handle api */
const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-15/",
    headers: {
        authorization: "30a3bd81-193f-43b5-9132-49b9701e93a2",
        "content-type": "application/json",
    },
});

/** modals and their buttons */
const changeProfileButton = document.querySelector(".profile__change-button");
const addPlaceButton = document.querySelector(".content__add-button");
const changeAvatarButton = document.querySelector(".profile__image-container");

/** profile fields */
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const profileImage = document.querySelector(".profile__image");

/** forms, their fields and components */
const changeProfileForm = document.querySelector(".form_type_change-profile");
const saveChangeProfileButton = changeProfileForm.querySelector(".form__submit-button");
const changeProfileName = changeProfileForm.querySelector(
    ".form__item_type_name"
);
const changeProfileProfession = changeProfileForm.querySelector(
    ".form__item_type_profession"
);

const changeAvatarForm = document.querySelector(".form_type_change-avatar");
const saveChangeAvatarButton = changeAvatarForm.querySelector(".form__submit-button");

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
const changeAvatarModal = new PopupWithForm(
    "modal_type_change-avatar",
    changeAvatar,
    changeAvatarForm
);
const popupOverlay = new PopupWithImage("popup-window");
const userInfo = new UserInfo(profileName, profileProfession, profileImage);
const popupSubmit = new PopupSubmit("modal_type_delete-card");

/** handle image open */
function handleCardClick(data) {
    popupOverlay.open(data);
}

/** handle submit popup */
function handleSubmitPopup(cardId, handleDeleteButton) {
    popupSubmit.setCloseCallback(() => {
        handleDeleteButton();
        deleteFromServerCallback(cardId);
    });
    popupSubmit.open();
}

/** create validators */
function createValidator(form) {
    const newValidator = new FormValidator(classes, form);
    newValidator.enableValidation();
}

/** set profile information */
api.setProfileInfo()
    .then((data) => {
        profileName.textContent = data.name;
        profileProfession.textContent = data.about;
        profileImage.src = data.avatar;
        userInfo.setId(data._id);
    })
    .catch((err) => console.log(err));

/** open-close button listeners */
changeProfileButton.addEventListener("click", () => {
    changeProfileModal.open();
    const userData = userInfo.getUserInfo();
    changeProfileName.value = userData.name;
    changeProfileProfession.value = userData.profession;
    createValidator(changeProfileForm);
});

changeAvatarButton.addEventListener("click", () => {
    changeAvatarModal.open();
    createValidator(changeAvatarForm);
})

addPlaceButton.addEventListener("click", () => {
    addPlaceModal.open();
    createValidator(addPlaceForm);
});

/** loading handler */
function renderLoading(isLoading, button) {
    if (isLoading) {
        button.textContent = "Сохранение...";
    } else {
        button.textContent = "Сохранить";
    }
}

/** change profile information form submit */
function changeProfileFormSubmitHandler(data) {
    renderLoading(true, saveChangeProfileButton);
    api.changeProfileInfo(data)
        .then(() => {
            userInfo.setUserInfo(data.formName, data.formProf);
        })
        .catch((err) => console.log(err))
        .finally(() => {
            renderLoading(false, saveChangeProfileButton);
        });

    changeProfileModal.close();
}

/** change avatar form submit */
function changeAvatar(data) {
    renderLoading(true, saveChangeAvatarButton);
    api.changeAvatar(data)
        .then(() => {
            userInfo.setUserAvatar(data.formAvatarLink);
        })
        .catch((err) => console.log(err))
        .finally(() => {
            renderLoading(false, saveChangeAvatarButton);
        });

    changeAvatarModal.close();
}

/** handle likes function */
function handleLikes(card) {
    const userId = userInfo.getId();
    if (card.likes.includes(userId)) {
        api.removeLike(card.cardId)
        .then((data) => {
            card.likes = Array.from(data.likes, user => user._id);
        })
        .then(() => card.handleLikeButton());
    } else {
        api.addLike(card.cardId)
        .then((data) => {
            card.likes = Array.from(data.likes, user => user._id);
        }).then(() => card.handleLikeButton());
    }
}

/** create new card */
function newCard(data) {
    const newCard = new Card(
        data,
        cardTemplate,
        handleCardClick,
        handleSubmitPopup,
        handleLikes.bind(this)
    );
    const cardElement = newCard.getView();
    const likes = Array.from(data.likes, user => user._id);
    if (likes.includes(userInfo.getId())) {
        newCard.handleLikeButton();
    }
    return cardElement;
}

/** delete card */
function deleteFromServerCallback(cardId) {
    api.deleteCard(cardId).catch((err) => console.log(err));
}

/** create default cards */
const placesSection = document.querySelector(".places");
const cardTemplate = document.querySelector("#card-template").content;
let cardList = null;

api.getAllCards()
    .then((data) => {
        cardList = new Section(
            {
                items: data,
                renderer: (item) => {
                    const cardElement = newCard(item);
                    cardList.addItem(cardElement, true);
                },
            },
            placesSection
        );
        cardList.renderItems();
    })
    .catch((err) => console.log(err));

/** add place card from form */
function addPlace(data) {
    api.addCard(data)
        .then((requested) => {
            const cardElement = newCard(requested);
            cardList.addItem(cardElement, false);
        })
        .catch((err) => console.log(err));
    addPlaceModal.close();
}
