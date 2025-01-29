//FUNCIONES GENERALES
//abrir cualquier popup
export function openPopup(popup) {
  popup.classList.add("popup__show");
  document.addEventListener("keydown", closePopupWithEscape);
}

//cerrar cualquier popup
export function closePopup(popup) {
  popup.classList.remove("popup__show");
  document.removeEventListener("keydown", closePopupWithEscape);
}

//submit formulario con enter key
export function submitWithEnter(evt, form) {
  if (evt.key === "Enter") {
    evt.preventDefault();
    form.requestSubmit();
  }
}

//cerrar popup con esc key
export function closePopupWithEscape(event) {
  if (event.key === "Escape") {
    const openPopup = document.querySelector(".popup__show");
    if (openPopup) {
      closePopup(openPopup);
    }
  }
}

//cerrar popup con overlay click
export function closePopupWithOverlayClick(event) {
  if (event.target.classList.contains("popup__overlay")) {
    const openPopup = document.querySelector(".popup__show");
    if (openPopup) {
      closePopup(openPopup);
    }
  }
}
