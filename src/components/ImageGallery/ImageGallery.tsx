import { Image } from "../../types";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

interface ImageGalleryProps {
  images: Image[];
  openModal: (url: string, alt: string) => void;
}
const ImageGallery: React.FC<ImageGalleryProps> = ({ images, openModal }) => {
  console.log(images);
  return (
    <ul className={css.imageList}>
      {images.map(({ id, description, urls }) => {
        return (
          <li key={id} className={css.imageItem}>
            <ImageCard
              urls={urls}
              description={description}
              openModal={openModal}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
