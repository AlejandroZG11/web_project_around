export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  //método público para abrir popup
  open() {
    this._popup.classList.add("popup__show");
    document.addEventListener("keydown", this._handleEscClose);
  }

  //método público para cerrar popup
  close() {
    this._popup.classList.remove("popup__show");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  //método privado para cerrar popup con Esc
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  //detector de eventos de click
  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup__overlay") ||
        evt.target.closest(".popup__close-button") ||
        evt.target.closest(".popup__close-card")
      ) {
        this.close();
      }
    });
  }
}
