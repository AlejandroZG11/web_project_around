import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__photo-link");
    this._popUpCaption = this._popup.querySelector(".popup__photo-name");
  }

  open({ link, name }) {
    this._popupImage.src = link;
    this._popupImage.alt = `Imagen de ${name}`;
    this._popUpCaption.textContent = name;
    this._popupImage.onerror = () => {
      this._popupImage.src = './images/default.jpg';
      this._popupImage.alt = 'Imagen no disponible';
    };
    super.open();
  }
}
