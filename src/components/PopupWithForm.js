import { useEffect } from "react"

function PopupWithForm({ name, title, buttonText="Сохранить", children, isOpen, onClose, onSubmit }) {
  useEffect(() => {
    const handleOverlayClose = e => {
      if (e.target.classList.contains("popup")) {
        onClose()
      }
    }

    const handleEscClose = e => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener("mousedown", handleOverlayClose)
      window.addEventListener("keydown", handleEscClose)
    }
    return () => {
      window.removeEventListener("keydown", handleEscClose)
      window.removeEventListener("mousedown", handleOverlayClose)
    }

  }, [ isOpen, onClose ])

  return (
    <>
      <article className={`popup popup_type_${ name } ${isOpen ? "popup_active" : "" }` }>
        <form onSubmit={ onSubmit } className="popup__container" name={` ${ name }-form`}>
          <button type="button" aria-label="закрыть" className="popup__close-button" onClick={ onClose }></button>
          <h2 className="popup__title">{ title }</h2>
          { children }
          <button className="popup__save-button popup__save-button_disabled" type="submit"> { buttonText }</button>
        </form>
      </article>
    </>
  );
}

export default PopupWithForm;


