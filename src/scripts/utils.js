export function openPopup(popup) {
  popup.classList.add("popup__show");
  document.addEventListener("keydown", closePopupWithEscape);
}

export function closePopup(popup) {
  popup.classList.remove("popup__show");
  document.removeEventListener("keydown", closePopupWithEscape);
}

export function closePopupWithEscape(event) {
  if (event.key === "Escape") {
    const openPopup = document.querySelector(".popup__show");
    if (openPopup) {
      closePopup(openPopup);
    }
  }
}

export function closePopupWithOverlayClick(event) {
  if (event.target.classList.contains("popup__overlay")) {
    const openPopup = document.querySelector(".popup__show");
    if (openPopup) {
      closePopup(openPopup);
    }
  }
}
