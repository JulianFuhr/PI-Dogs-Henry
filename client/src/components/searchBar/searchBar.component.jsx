import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsByName } from "../../redux/actions";
import "./searchBar.styles.css";

const SearchBar = () => {
  const dispatch = useDispatch();

  //state local para almac. el valor de la busqueda8
  const [search, setSearch] = useState({
    name: "",
  });

  const searchHandler = (event) => {
    setSearch({ name: event.target.value });
  };

  const submitHandler = () => {
    const name = search.name;
    if (name.length > 0) {
      dispatch(getDogsByName(name));
    }
  };

  return (
    <div className="bodysearch">
      <div className="container-search">
        <input
          className="inputsearch"
          id="search"
          type="search"
          placeholder="Search breed..."
          onChange={searchHandler}
          value={search.name}
        />
        <button type="submit" onClick={submitHandler} value={search.name}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
