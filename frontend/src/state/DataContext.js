import React, { createContext, useCallback, useContext, useState } from 'react';
import useDebounce from '../hooks/useDebounce';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const debouncedSearch = useDebounce(query, 500);

  const fetchItems = useCallback(
    async (active) => {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3001/api/items?limit=${limit}&q=${debouncedSearch}&skip=${skip}`
      );
      const json = await res.json();
      if (!active) return; // Check if component is still mounted
      setItems(json.data);
      setTotalItems(json.meta.total);
      setLoading(false);
    },
    [debouncedSearch, limit, skip]
  );

  return (
    <DataContext.Provider
      value={{
        items,
        loading,
        fetchItems,
        query,
        setQuery,
        limit,
        totalItems,
        setLimit,
        currentPage,
        setCurrentPage,
        skip,
        setSkip,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
