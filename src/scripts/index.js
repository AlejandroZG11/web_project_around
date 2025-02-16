//IMPORTACIONES
import api from "./Api.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { Section } from "./Section.js";
import { UserInfo } from "./UserInfo.js";
import PopupWithConfirm from "./popupWithConfirm.js";
import { closePopupWithOverlayClick } from "./utils.js";

// VARIABLES DE PERFIL Y FORMULARIOS
const profileButton = document.querySelector(".profile__edit-button");
const inputName = document.querySelector("#name");
const inputAbout = document.querySelector("#about-me");
const addButton = document.querySelector(".profile__add-button");
const avatarEditButton = document.querySelector(".profile__avatar-edit");
const formAddCard = document.querySelector("#cards-form");
const profileForm = document.querySelector("#profile-form");
const avatarForm = document.querySelector("#avatar-form");

// CONFIGURACIÓN DE VALIDACIÓN
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: ".popup__input_type_error",
  errorClass: ".form__error_show",
};

// INSTANCIA DE UserInfo
const userInfo = new UserInfo({
  nameSelector: "#profile-name",
  aboutSelector: "#profile-description",
  avatarSelector: ".profile__avatar"
});

// POPUP DE IMÁGENES
const popupWithImage = new PopupWithImage("#popup-size-card");

// SECCIÓN PARA TARJETAS
const cardSection = new Section({
  items: [],
  renderer: (cardData) => {
    const card = new Card(
      cardData,
      "#template-card",
      handleCardClick,
      handleDeleteClick,
      handleLikeClick,
      userInfo.getUserInfo().userId
    );
    cardSection.addItem(card.generateCard());
  }
}, ".elements__container");

// FUNCIÓN PARA CARGAR DATOS AL INICIAR
// Cargar datos de usuario y tarjetas al iniciar
api.getAppData()
  .then(({ userData, initialCards }) => {
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar
    });

    // Crear y renderizar cada tarjeta correctamente
    initialCards.forEach((cardData) => {
      const card = new Card(
        cardData,
        "#template-card",
        handleCardClick,
        handleDeleteClick,
        handleLikeClick,
        userData._id  // Se pasa el ID del usuario para verificar permisos
      );
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    });
  })
  .catch((err) => console.error("Error al cargar datos iniciales:", err));

// MANEJADORES DE EVENTOS
function handleCardClick(name, link) {
  popupWithImage.open({ link, name });
}

/// Inicializar el popup de confirmación una sola vez
const confirmPopup = new PopupWithConfirm({
  popupSelector: "#confirm-delete-popup"
});
confirmPopup.setEventListeners();

// Función para confirmar y eliminar tarjeta
function handleDeleteClick(cardId, cardElement) {
  // Se pasa la función correctamente al abrir el popup
  confirmPopup.open(() => {
    api.deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        confirmPopup.close();
      })
      .catch(err => console.log(`Error al eliminar tarjeta: ${err}`));
  });
}



function handleLikeClick(cardId, isLiked) {
  return api.changeLikeCardStatus(cardId, !isLiked);  // Invertir el estado actual del like
}

// VALIDACIÓN DE FORMULARIOS
const profileFormValidator = new FormValidator(validationConfig, profileForm);
profileFormValidator.enableValidation();
const addCardsFormValidator = new FormValidator(validationConfig, formAddCard);
addCardsFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(validationConfig, avatarForm);
avatarFormValidator.enableValidation();

// POPUP PARA EDITAR PERFIL
const popupProfileForm = new PopupWithForm("#popup-profile", (formData) => {
  popupProfileForm.renderLoading(true);
  api.setUserInfo({
    name: formData.name,
    about: formData["about-me"],
  })
    .then((data) => {
      userInfo.setUserInfo({
        name: data.name,
        about: data.about,
      });
      popupProfileForm.close();
    })
    .catch((err) => console.error("Error al actualizar perfil:", err))
    .finally(() => popupProfileForm.renderLoading(false));
});

// ABRIR POPUP EDITAR PERFIL CON DATOS EXISTENTES
profileButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputAbout.value = userData.about;
  profileFormValidator.clearErrors();
  popupProfileForm.open();
});

// POPUP PARA AGREGAR NUEVA TARJETA
const popupAddCardForm = new PopupWithForm("#popup-cards", (formData) => {
  popupAddCardForm.renderLoading(true, 'Crear');
  api.addCard({
    name: formData.title,
    link: formData.link,
  })
    .then((cardData) => {
      const card = new Card(
        cardData,
        "#template-card",
        handleCardClick,
        handleDeleteClick,
        handleLikeClick,
        userInfo.getUserInfo().userId
      );
      cardSection.addItem(card.generateCard());
      popupAddCardForm.close();
    })
    .catch((err) => console.error("Error al agregar tarjeta:", err))
    .finally(() => popupAddCardForm.renderLoading(false, 'Crear'));
});

// ABRIR POPUP PARA AGREGAR TARJETA
addButton.addEventListener("click", () => {
  addCardsFormValidator.clearErrors();
  popupAddCardForm.open();
});

// POPUP PARA EDITAR AVATAR
const popupAvatarForm = new PopupWithForm("#profilepic-popup", (formData) => {
  popupAvatarForm.renderLoading(true, 'Guardando...');
  api.setUserAvatar(formData.avatar)
    .then((data) => {
      userInfo.setUserInfo({ avatar: data.avatar });
      popupAvatarForm.close();
    })
    .catch((err) => console.error("Error al actualizar avatar:", err))
    .finally(() => popupAvatarForm.renderLoading(false, 'Guardar'));
});

// Evento para abrir el popup de avatar
avatarEditButton.addEventListener("click", () => {
  if (popupAvatarForm) {
    avatarFormValidator.clearErrors();  // Solo se ejecuta si el popup está abierto
    popupAvatarForm.open();
  }
});


// CERRAR POPUPS CON CLICK EN OVERLAY
const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("click", closePopupWithOverlayClick);
});

// SET EVENT LISTENERS
popupWithImage.setEventListeners();
popupProfileForm.setEventListeners();
popupAddCardForm.setEventListeners();
popupAvatarForm.setEventListeners();
