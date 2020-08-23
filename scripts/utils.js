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

function closePopup(){
    popupSection.classList.remove('popup-window_opened');
    document.removeEventListener('keydown', popupEscapeListener);
}

popupCloseButton.addEventListener('click', closePopup);

export { closePopup, openPopup };