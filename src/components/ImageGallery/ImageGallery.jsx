import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.imageList}>
      {images.map(({ id, description, urls: { small, regular } }) => {
        return (
          <li key={id} className={css.imageItem}>
            <ImageCard
              small={small}
              regular={regular}
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
