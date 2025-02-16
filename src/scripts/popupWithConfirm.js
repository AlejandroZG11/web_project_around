import { Popup } from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._form = this._popup.querySelector("form");
  }

  open(handleConfirm) {
    this._handleConfirm = handleConfirm;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      // Validación para evitar errores
      if (typeof this._handleConfirm === "function") {
        this._handleConfirm();
        this.close();
      } else {
        console.error("No se ha definido _handleConfirm");
      }
    });
  }
}
