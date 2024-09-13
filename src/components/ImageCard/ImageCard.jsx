import css from "./ImageCard.module.css";
const ImageCard = ({ description, small, regular, openModal }) => {
  return (
    <img
      className={css.image}
      src={small}
      alt={description}
      onClick={() => openModal(regular, description)}
    />
  );
};

export default ImageCard;
