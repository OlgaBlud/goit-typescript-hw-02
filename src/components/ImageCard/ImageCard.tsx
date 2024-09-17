import { Image } from "../../types";
import css from "./ImageCard.module.css";
interface ImageCardProps extends Pick<Image, "description" | "urls"> {
  openModal: (regular: string, description: string) => void;
}
const ImageCard: React.FC<ImageCardProps> = ({
  description,
  urls,
  openModal,
}) => {
  return (
    <img
      className={css.image}
      src={urls.small}
      alt={description}
      onClick={() => openModal(urls.regular, description)}
    />
  );
};

export default ImageCard;
