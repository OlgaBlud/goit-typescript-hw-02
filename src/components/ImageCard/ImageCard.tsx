import css from "./ImageCard.module.css";
type Props = {
  description: string;
  small: string;
  regular: string;
};
const ImageCard = ({ description, small, regular, openModal }: Props) => {
  // console.log(openModal);
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
