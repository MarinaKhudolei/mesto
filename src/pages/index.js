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
const profileFormValidator = new FormValidator(classes, changeProfileForm);
const changeProfileName = changeProfileForm.querySelector(
    ".form__item_type_name"
);
const changeProfileProfession = changeProfileForm.querySelector(
    ".form__item_type_profession"
);

const changeAvatarForm = document.querySelector(".form_type_change-avatar");
const avatarFormValidator = new FormValidator(classes, changeAvatarForm);

const addPlaceForm = document.querySelector(".form_type_add-place");
const placeFormValidator = new FormValidator(classes, addPlaceForm);

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
const userInfo = new UserInfo(profileName, profileProfession, profileImage);
const popupSubmit = new PopupSubmit("modal_type_delete-card");

/** handle submit popup */
function handleSubmitPopup(cardId, handleDeleteButton) {
    popupSubmit.open(() => {
        api.deleteCard(cardId)
        .then(() => {
            handleDeleteButton();
            popupSubmit.close();
        })
        .catch((err) => console.log(err));
    });
}

/** set profile information and default cards */
const placesSection = document.querySelector(".places");
const cardTemplate = document.querySelector("#card-template").content;
let cardList = null;

Promise.all([api.setProfileInfo(), api.getAllCards()])
.then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData.name, userData.about);
    profileImage.src = userData.avatar;
    userInfo.setId(userData._id);

    cardList = new Section(
        {
            items: cardsData,
            renderer: (item) => {
                const cardElement = newCard(item, userData._id);
                cardList.addItem(cardElement, true);
            },
        },
        placesSection
    );
    cardList.renderItems();
})
.catch((err) => console.log(err));

/** open-close button listeners */
changeProfileButton.addEventListener("click", () => {
    changeProfileModal.open();
    const userData = userInfo.getUserInfo();
    changeProfileName.value = userData.name;
    changeProfileProfession.value = userData.profession;
    profileFormValidator.enableSubmitButton();
    profileFormValidator.hideAllErrors();
});

changeAvatarButton.addEventListener("click", () => {
    changeAvatarModal.open();
    avatarFormValidator.disableSubmitButton();
    avatarFormValidator.hideAllErrors();
})

addPlaceButton.addEventListener("click", () => {
    addPlaceModal.open();
    placeFormValidator.disableSubmitButton();
    placeFormValidator.hideAllErrors();
});

/** change profile information form submit */
function changeProfileFormSubmitHandler(data) {
    changeProfileModal.renderLoading(true);
    api.changeProfileInfo(data)
        .then(() => {
            userInfo.setUserInfo(data.formName, data.formProf);
            changeProfileModal.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            changeProfileModal.renderLoading(false);
        });
}

/** change avatar form submit */
function changeAvatar(data) {
    changeAvatarModal.renderLoading(true);
    api.changeAvatar(data)
        .then(() => {
            userInfo.setUserAvatar(data.formAvatarLink);
            changeAvatarModal.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            changeAvatarModal.renderLoading(false);
        });

}

/** handle likes function */
function handleLikes(card) {
    const userId = userInfo.getId();
    const likes = card.getLikes();
    if (likes.includes(userId)) {
        api.removeLike(card.cardId)
        .then((data) => {
            card.setLikes(data);
            card.handleLikeButton();
        });
    } else {
        api.addLike(card.cardId)
        .then((data) => {
            card.setLikes(data);
            card.handleLikeButton();
        });
    }
}

/** create new card */
function newCard(data, userId) {
    const card = new Card(
        data,
        userId,
        cardTemplate,
        handleCardClick,
        handleSubmitPopup,
        handleLikes.bind(this)
    );
    const cardElement = card.getView();
    const likes = card.getLikes();
    if (likes.includes(userId)) {
        card.handleLikeButton();
    }
    return cardElement;
}

/** add place card from form */
function addPlace(data) {
    addPlaceModal.renderLoading(true);
    api.addCard(data)
        .then((requested) => {
            const cardElement = newCard(requested, userInfo.getId());
            cardList.addItem(cardElement, false);
            addPlaceModal.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            addPlaceModal.renderLoading(false);
        });
}


const popupTemplate = document.querySelector("#popup").content;
const popupElement = popupTemplate.cloneNode(true);

document.querySelector(".modal_type_popup").append(popupElement);

const popupOverlay = new PopupWithImage("modal_type_popup");
/** handle image open */
function handleCardClick(data) {
    popupOverlay.open(data);
}
