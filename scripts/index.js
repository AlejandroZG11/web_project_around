import { enableValidation, validateFormOnOpen } from "./validate.js";

// Ejecutar validación global al inicio
enableValidation();

const popupForm = document.querySelector("#popupForm");
const editButton = document.querySelector(".profile__info-edit-btn");
const nameInput = document.querySelector("#name-input");
const jobInput = document.querySelector("#job-input");
const profileName = document.querySelector(".profile__info-header");
const profileJob = document.querySelector(".profile__info-title");

function openPopup(popup) {
  if (!popup) {
    console.error("Popup no encontrado");
    return;
  }
  popup.classList.add("popup_show");

  if (popup.id === "popupForm") {
    const formElement = popup.querySelector(".popup__form");
    validateFormOnOpen(formElement);
  }
}

function closePopup(popup) {
  popup.classList.remove("popup_show");
}

// Listener para el botón de edición de perfil
editButton.addEventListener("click", () => {
  openPopup(popupForm);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

const popupFormElement = popupForm.querySelector(".popup__form");

// Manejador para el envío del formulario
popupFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault(); // Evita el comportamiento predeterminado de enviar el formulario

  // Actualizar los datos del perfil
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  // Cerrar el popup
  closePopup(popupForm);
});

// Listeners para cerrar popups
document.querySelectorAll(".popup__close-btn").forEach((button) => {
  button.addEventListener("click", (evt) => {
    const popup = evt.target.closest(".popup");
    closePopup(popup);
  });
});

// Cerrar popups al hacer clic en el overlay
document.addEventListener("mousedown", (evt) => {
  if (evt.target.classList.contains("popup_show")) {
    closePopup(evt.target);
  }
});

// Cerrar popups al presionar la tecla Escape
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_show");
    if (activePopup) closePopup(activePopup);
  }
});
