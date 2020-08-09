//change profile modal
const changeButton = document.querySelector(".profile__change-button");
const changeProfileModal = document.querySelector(".modal_type_change-profile");
const changeProfileCloseButton = changeProfileModal.querySelector(
  ".modal__close-button"
);

//change profile form
const formName = document.querySelector(".form__item_type_name");
const formProf = document.querySelector(".form__item_type_profession");
const profileName = document.querySelector(".profile__name");
const profileProf = document.querySelector(".profile__profession");
const changeProfileForm = document.querySelector(".form_type_change-profile");

function changeContent(evt) {
  profileName.textContent = formName.value;
  profileProf.textContent = formProf.value;
  closeModal(changeProfileModal);
  evt.preventDefault();
}

//handle submit button
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

//change profile buttons
changeButton.addEventListener("click", () => {
  formName.value = profileName.textContent;
  formProf.value = profileProf.textContent;
  openModal(changeProfileModal);

  clearForm(changeProfileForm);
  enableButton(changeProfileForm);
});

changeProfileCloseButton.addEventListener("click", () => {
  closeModal(changeProfileModal);
});

changeProfileForm.addEventListener("submit", changeContent);

//create and render cards

const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardTemplate = document.querySelector("#card").content;
const cardsSection = document.querySelector(".places");

initialCards.forEach((data) => {
  renderCard(data);
});

//handle card creation

function createCard(data) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", () => {
    openPopup(data);
  });

  const deleteCardButton = cardElement.querySelector(".card__delete-button");
  deleteCardButton.addEventListener("click", function () {
    const myCard = deleteCardButton.closest(".places__card");
    myCard.remove();
  });

  const likeCardButton = cardElement.querySelector(".card__button");
  likeCardButton.addEventListener("click", function () {
    likeCardButton.classList.toggle("card__button_liked");
  });

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  return cardElement;
}

function renderCard(data) {
  cardsSection.prepend(createCard(data));
}

//add place modal
const addButton = document.querySelector(".content__add-button");
const addPlaceModal = document.querySelector(".modal_type_add-place");
const addPlaceCloseButton = addPlaceModal.querySelector(".modal__close-button");

//add place form
const formTitle = document.querySelector(".form__item_type_title");
const formImageLink = document.querySelector(".form__item_type_image-link");
const addPlaceForm = document.querySelector(".form_type_add-place");

function addPlace(evt) {
  evt.preventDefault();
  renderCard({ name: formTitle.value, link: formImageLink.value });
  closeModal(addPlaceModal);
}

addButton.addEventListener("click", () => {
  openModal(addPlaceModal);
  formTitle.value = "";
  formImageLink.value = "";

  clearForm(addPlaceForm);
  disableButton(addPlaceForm);
});

addPlaceCloseButton.addEventListener("click", () => {
  closeModal(addPlaceModal);
});

addPlaceForm.addEventListener("submit", addPlace);

//open and close popup
const popupTemplate = document.querySelector("#popup").content;
const popup = document.querySelector(".popup-window");
const openPopupImage = popupTemplate.cloneNode(true);
const popupContainer = openPopupImage.querySelector(".popup");
const popupImage = openPopupImage.querySelector(".popup__image");
const popupCaption = openPopupImage.querySelector(".popup__caption");
const popupCloseButton = openPopupImage.querySelector(".popup__close-button");

function openPopup(data) {
  popup.classList.add("popup-window_opened");
  document.addEventListener("keydown", popupListener);
  popup.append(popupContainer);
  popupCaption.textContent = data.name;
  popupImage.src = data.link;
  popupImage.alt = data.name;
}

function closePopup() {
  document.removeEventListener("keydown", popupListener);
  popup.classList.remove("popup-window_opened");
}

popupCloseButton.addEventListener("click", () => {
  closePopup();
});

//modal escape listener
function modalListener(evt) {
  modal = document.querySelector(".modal_opened");
  if (evt.key === "Escape") {
    closeModal(modal);
  }
}

//popup escape listener
function popupListener(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
}

//open and close modals
function openModal(modalWindow) {
  modalWindow.classList.add("modal_opened");
  document.addEventListener("keydown", modalListener);
}

function closeModal(modalWindow) {
  modalWindow.classList.remove("modal_opened");
  document.removeEventListener("keydown", modalListener);
}

modal = Array.from(document.querySelectorAll(".modal"));
const handleModalListeners = () => {
  modal.forEach((modalWindow) => {
    closeModal(modalWindow);
  });
  closePopup();
};

//if overlay is clicked
document.addEventListener("click", function (evt) {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("popup-window")
  ) {
    handleModalListeners();
  }
});
