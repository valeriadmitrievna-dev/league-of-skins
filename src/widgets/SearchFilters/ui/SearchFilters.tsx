import type { FC } from 'react';
import s from './SearchFilters.module.scss'

const SearchFilters: FC = () => {
  return (
    <div className={s.searchFilters}>
        <p>Filters</p>
    </div>
  );
};

export default SearchFilters;
