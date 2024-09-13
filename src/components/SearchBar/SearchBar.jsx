import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const query = form.elements.query.value.trim();
    if (!query) {
      const notify = () =>
        toast("Enter search query!", {
          duration: 3000,
          position: "top-center",
          style: { marginTop: 100 },
          icon: "👀",
        });
      notify();

      return;
    }
    onSubmit(query);
    form.reset();
  };
  return (
    <header>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
      <Toaster />
    </header>
  );
};

export default SearchBar;
