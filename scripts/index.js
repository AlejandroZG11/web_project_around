//IMPORTACIONES
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup, closePopupWithOverlayClick } from "./utils.js";

//variables editar perfil
const profileButton = document.querySelector(".profile__info-edit-btn");
const closeButton = document.querySelector(".popup__close-button");
const popupProfile = document.querySelector("#popup-profile");
const profileName = document.querySelector(".profile__info-header");
const profileAbout = document.querySelector(".profile__info-title");
const inputName = document.querySelector("#input-name");
const inputAbout = document.querySelector("#input-about");

const addButton = document.querySelector("#profile-add-button");

//variables cards
const cardCloseButton = document.querySelector("#close-cards-popup");
const popupCards = document.querySelector("#popup-cards");

//variables forms
const formAddCard = document.querySelector("#cards-form");
const profileForm = document.querySelector("#profile-form");

const inputCardTitle = document.querySelector("#input-title");
const inputCardLink = document.querySelector("#input-link");

const elementsContainer = document.querySelector(".elements__container");

//variables validation
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: ".popup__input_type_error",
  errorClass: ".form__error_show",
};

//cards iniciales
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

elementsContainer.innerHTML = "";

//funcion con class card para agregar initial cards
initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#template-card");
  const cardElement = card.generateCard();
  elementsContainer.append(cardElement);
});

//instancias FormValidator
const profileFormValidator = new FormValidator(validationConfig, popupProfile);
const addCardsFormValidator = new FormValidator(validationConfig, formAddCard);
profileFormValidator.enableValidation();
addCardsFormValidator.enableValidation();

//abrir editar perfil popup
profileButton.addEventListener("click", function () {
  inputName.textContent = profileName.value;
  inputAbout.textContent = profileAbout.value;
  openPopup(popupProfile);
});

//cerrar editar perfil popup
closeButton.addEventListener("click", function () {
  closePopup(popupProfile);
});

//submit editar perfil
profileForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(popupProfile);
});

//TARJETAS
//funcion abrir agregar cards form
addButton.addEventListener("click", function () {
  openPopup(popupCards);
});

//funcion cerrar agregar cards form
cardCloseButton.addEventListener("click", function () {
  closePopup(popupCards);
});

//crear nueva card y agregar al container
formAddCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (addCardsFormValidator._submitButton.disabled) {
    return;
  }

  //nueva card
  const cardData = {
    name: inputCardTitle.value.trim(),
    link: inputCardLink.value.trim(),
  };

  //funcion con class card para crear tarjeta
  const card = new Card(cardData, "#template-card");
  const cardElement = card.generateCard();
  elementsContainer.prepend(cardElement);

  //eliminar input de campo de entrada y cerrar popup
  inputCardTitle.value = "";
  inputCardLink.value = "";
  closePopup(popupCards);
});

//cerrar popup con overlay
const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("click", closePopupWithOverlayClick);
});
