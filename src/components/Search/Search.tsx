import type { FC } from "react";

import s from "./Search.module.scss";

const Search: FC = () => {
  return (
    <div className={s.search}>
      <input type='text' placeholder='Search' className={s.searchInput} />
    </div>
  );
};

export default Search;
