import Styles from "./Overlay.module.css";

export const Overlay = (props) => {
  // from props we get a function that closes the authorisation window by changing styles
  return (
    <div onClick={props.closePopup} className={`${Styles["overlay"]} ${props.isOpened && Styles["overlay_is-opened"]}`}
    ></div>
  );
};
