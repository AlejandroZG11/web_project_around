// index.js: Actualización de selectores y eventos
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup, closePopupWithOverlayClick } from "./utils.js";

// Variables editar perfil
const profileButton = document.querySelector(".profile__edit-button");
const closeProfileButton = document.querySelector("#close-profile-popup");
const popupProfile = document.querySelector("#popup-profile");
const profileName = document.querySelector("#profile-name");
const profileAbout = document.querySelector("#profile-description");
const inputName = document.querySelector("#name");
const inputAbout = document.querySelector("#about-me");

// Variables añadir tarjetas
const addButton = document.querySelector("#profile__add-button");
const cardCloseButton = document.querySelector("#close-cards-popup");
const popupCards = document.querySelector("#popup-cards");
const inputCardTitle = document.querySelector("#title");
const inputCardLink = document.querySelector("#image-url");

// Contenedor de tarjetas
const elementsContainer = document.querySelector("#elements-container");

// Configuración de validación
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: ".popup__input_type_error",
  errorClass: ".form__error_show",
};

// Tarjetas iniciales
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

// Crear tarjetas iniciales
initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#template-card");
  const cardElement = card.generateCard();
  elementsContainer.append(cardElement);
});

// Validación de formularios
const profileFormValidator = new FormValidator(validationConfig, popupProfile);
const addCardsFormValidator = new FormValidator(validationConfig, popupCards);
profileFormValidator.enableValidation();
addCardsFormValidator.enableValidation();

// Eventos para abrir y cerrar popups
profileButton.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  openPopup(popupProfile);
});

closeProfileButton.addEventListener("click", () => {
  closePopup(popupProfile);
});

popupProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(popupProfile);
});

addButton.addEventListener("click", () => {
  openPopup(popupCards);
});

cardCloseButton.addEventListener("click", () => {
  closePopup(popupCards);
});

popupCards.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const cardData = {
    name: inputCardTitle.value.trim(),
    link: inputCardLink.value.trim(),
  };

  const card = new Card(cardData, "#template-card");
  const cardElement = card.generateCard();
  elementsContainer.prepend(cardElement);

  inputCardTitle.value = "";
  inputCardLink.value = "";
  closePopup(popupCards);
});

// Cierre de popups con overlay
const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("click", closePopupWithOverlayClick);
});
