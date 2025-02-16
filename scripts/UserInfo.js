export class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent.trim(),
      about: this._aboutElement.textContent.trim(),
      avatar: this._avatarElement.style.backgroundImage.slice(5, -2)
    };
  }

  setUserInfo({ name, about, avatar }) {
    if (name) {
      this._nameElement.textContent = name;
    }
    if (about) {
      this._aboutElement.textContent = about;
    }
    if (avatar) {
      // Crear un nuevo <img> para el avatar y forzar la recarga
      const newAvatar = document.createElement('img');
      newAvatar.src = `${avatar}?${new Date().getTime()}`;  // Agregar timestamp para evitar caché
      newAvatar.alt = "Foto de perfil";
      newAvatar.classList.add("profile__avatar");

      // Reemplazar el avatar antiguo con el nuevo <img>
      this._avatarElement.replaceWith(newAvatar);
      this._avatarElement = newAvatar;
    }
  }

}
