let changeButton = document.querySelector('.profile__change-button');
let myModal = document.querySelector('.modal');
let closeButton = document.querySelector('.modal__close-button');
let formName = document.querySelector('.form__item_type_name');
let formProf = document.querySelector('.form__item_type_profession');
let profileName = document.querySelector('.profile__name');
let profileProf = document.querySelector('.profile__profession');
let form = document.querySelector('.form');

function openModal () {
    myModal.classList.add('modal__opened');
}


function closeModal () {
    myModal.classList.remove('modal__opened');
    formName.value = profileName.textContent;
    formProf.value = profileProf.textContent;
}

function changeContent (evt) {
    profileName.textContent = formName.value;
    profileProf.textContent = formProf.value;
    myModal.classList.remove('modal__opened');
    evt.preventDefault();
}

changeButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);
form.addEventListener('submit', changeContent);
