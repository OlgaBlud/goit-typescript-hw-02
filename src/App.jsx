import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import { getPhotos } from "./images-api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Loader from "./components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, imgUrl: "", imgAlt: "" });

  const handleSubmit = (searchValue) => {
    setQuery(searchValue);
    setImages([]);
    setPage(1);
    setNextPage(false);
    setIsEmpty(false);
    setError(null);
  };
  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const { results, total, total_pages } = await getPhotos(query, page);

        if (!total) {
          setIsEmpty(true);

          const notify = () =>
            toast("No photos for such query!", {
              duration: 3000,
              position: "top-center",
              style: { marginTop: 100 },
              icon: "😢",
            });
          notify();
        }
        setImages((prevImages) => [...prevImages, ...results]);
        setNextPage(page < total_pages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const handleLoadMoreClick = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const openModal = (url, alt) => {
    setModal({ ...modal, isOpen: true, imgUrl: url, imgAlt: alt });
  };

  const closeModal = () => {
    setModal({ ...modal, isOpen: false, imgUrl: "", imgAlt: "" && "noAlt" });
  };

  return (
    <div className="container">
      <SearchBar onSubmit={handleSubmit} />

      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {nextPage && <LoadMoreBtn handleLoadMoreClick={handleLoadMoreClick} />}
      {error && <ErrorMessage message={error} />}
      {loading && <Loader />}
      {isEmpty && <Toaster />}
      <ImageModal
        isOpen={modal.isOpen}
        imgUrl={modal.imgUrl}
        imgAlt={modal.imgAlt}
        closeModal={closeModal}
      />
    </div>
  );
}

export default App;
