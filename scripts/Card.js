//constructor de card
export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._containerElement = this._element.querySelector(
      ".elements__container"
    );
    this._imageElement = this._element.querySelector(".element__photo-link");
    this._titleElement = this._element.querySelector(".element__photo-name");
    this._likeButton = this._element.querySelector(".element__heart-button");
    this._trashButton = this._element.querySelector(".element__photo-trash");
    //nueva funcion del constructor
    this._handleCardClick = handleCardClick;
    this._isEscapeListenerAdded = false;
  }

  //funcion para llamar al template
  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardTemplate;
  }

  _setEventListeners() {
    //like button
    if (this._likeButton) {
      this._likeButton.addEventListener("click", () => this._toggleLike());
    } else {
      console.error("Botón de me gusta no se encontró en la tarjeta.");
    }

    //trash button
    if (this._trashButton) {
      this._trashButton.addEventListener("click", () => this._deleteCard());
    } else {
      console.error("Botón de basura no se encontró en la tarjeta.");
    }

    //card size up
    if (this._imageElement) {
      //handleCardClick para card size up
      this._imageElement.addEventListener("click", () =>
        this._handleCardSizeup()
      );
    } else {
      console.error("La imagen no se encontró en la tarjeta.");
    }
  }

  //funcion para estado de like button
  _toggleLike() {
    this._likeButton.classList.toggle("element__heart-button_active");
  }

  //funcion para eliminar card
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  //funcion para generar card
  generateCard() {
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  //funcion card sizeup
  _handleCardSizeup() {
    const popupImage = document.querySelector("#popup-image");
    const popupCaption = document.querySelector("#popup-caption");
    const imagePopup = document.querySelector("#popup-size-card");

    if (popupImage && popupCaption && imagePopup) {
      popupImage.src = this._link;
      popupImage.alt = this._name;
      popupCaption.textContent = this._name;

      imagePopup.classList.add("popup__show");

      if (!this._isEscapeListenerAdded) {
        this._handleEscape = (event) => {
          if (event.key === "Escape") {
            imagePopup.classList.remove("popup__show");
          }
        };
        document.addEventListener("keydown", this._handleEscape);
        this._isEscapeListenerAdded = true;
      }
    } else {
      console.error("No se encontró el elemento de card size up.");
    }
  }
}
