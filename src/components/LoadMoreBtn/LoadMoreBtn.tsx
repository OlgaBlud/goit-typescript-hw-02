import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  handleLoadMoreClick: () => void;
}
const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ handleLoadMoreClick }) => {
  return (
    <button className={css.loadBtn} type="button" onClick={handleLoadMoreClick}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
