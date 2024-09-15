import css from "./LoadMoreBtn.module.css";
const LoadMoreBtn = ({ handleLoadMoreClick }) => {
  return (
    <button className={css.loadBtn} type="button" onClick={handleLoadMoreClick}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
