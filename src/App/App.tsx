import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "../components/SearchBar/SearchBar";
import { getPhotos } from "../images-api";
import ImageGallery from "../components/ImageGallery/ImageGallery";
import LoadMoreBtn from "../components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Loader from "../components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import ImageModal from "../components/ImageModal/ImageModal";

function App() {
  interface Modal {
    isOpen: boolean;
    imgUrl: string;
    imgAlt: string;
  }
  interface Image {
    id: string;
    description: string | null;
    urls: {
      small: string;
      regular: string;
    };
  }
  interface Response {
    results: Image[];
    total: number;
    total_pages: number;
  }
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [images, setImages] = useState<Image[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<boolean>(false);
  const [modal, setModal] = useState<Modal>({
    isOpen: false,
    imgUrl: "",
    imgAlt: "",
  });

  const handleSubmit = (searchValue: string): void => {
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
        const { results, total, total_pages }: Response = await getPhotos(
          query,
          page
        );

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
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const handleLoadMoreClick = (): void => {
    setPage((prevPage) => prevPage + 1);
  };
  const openModal = (url: string, alt: string): void => {
    setModal({ ...modal, isOpen: true, imgUrl: url, imgAlt: alt });
  };

  const closeModal = (): void => {
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