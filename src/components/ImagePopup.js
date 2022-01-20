import { useEffect } from "react";

function ImagePopup(props) {
  const { card, onClose } = props
  const { link, name } = card

  useEffect(() => {
    const handleOverlayClose = e => {
      if (e.target.classList.contains("popup")) {
        onClose();
      }
    }

    const handleEscClose = e => {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (card) {
      window.addEventListener("mousedown", handleOverlayClose)
      window.addEventListener("keydown", handleEscClose)
    }

    return () => {
      window.removeEventListener("keydown", handleEscClose)
      window.removeEventListener("mousedown", handleOverlayClose)
    }

  }, [ card, onClose ])

  return (
    <article className={ `popup popup_type_image ${ card ? "popup_active" : "" }` }>
      <figure className="popup__figure">
        <button type="button" aria-label="закрыть" className="popup__close-button" onClick={ onClose }></button>
        <img src={ link } alt="картинка пользователя" className="popup__figure-image" />
        <figcaption className="popup__figure-title">{ name } </figcaption>
      </figure>
    </article>
  );
}

export default ImagePopup;