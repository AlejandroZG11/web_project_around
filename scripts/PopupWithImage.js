import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupImage = this._popup.querySelector(".popup__photo-link");
    this._popUpCaption = this._popup.querySelector(".popup__photo-name");
  }

  open({ link, name }) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popUpCaption.textContent = name;
    super.open();
  }
}
