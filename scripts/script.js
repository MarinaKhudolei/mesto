let changeButton = document.querySelector('.profile__change-button');
let myModal = document.querySelector('.modal');
let closeButton = document.querySelector('.modal__close-button');
let formName = document.querySelector('.form__item_type_name');
let formProf = document.querySelector('.form__item_type_profession');
let profileName = document.querySelector('.profile__name');
let profileProf = document.querySelector('.profile__profession');
let form = document.querySelector('.form');

function openModal () {
    myModal.classList.add('modal_opened');
    formName.value = profileName.textContent;
    formProf.value = profileProf.textContent;
}


function closeModal () {
    myModal.classList.remove('modal_opened');
}

function changeContent (evt) {
    profileName.textContent = formName.value;
    profileProf.textContent = formProf.value;
    closeModal();
    evt.preventDefault();
}

changeButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);
form.addEventListener('submit', changeContent);
