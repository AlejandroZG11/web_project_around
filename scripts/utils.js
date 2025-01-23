// utils.js: Actualización de funciones de popup

// Abrir cualquier popup
export function openPopup(popup) {
  popup.classList.add("popup__show");
  document.addEventListener("keydown", closePopupWithEscape);
}

// Cerrar cualquier popup
export function closePopup(popup) {
  popup.classList.remove("popup__show");
  document.removeEventListener("keydown", closePopupWithEscape);
}

// Cerrar popup con clic en overlay
export function closePopupWithOverlayClick(event) {
  if (event.target.classList.contains("popup__overlay")) {
    const openPopup = document.querySelector(".popup__show");
    if (openPopup) {
      closePopup(openPopup);
    }
  }
}

// Cerrar popup con la tecla Escape
export function closePopupWithEscape(event) {
  if (event.key === "Escape") {
    const openPopup = document.querySelector(".popup__show");
    if (openPopup) {
      closePopup(openPopup);
    }
  }
}
