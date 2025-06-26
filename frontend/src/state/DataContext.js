import React, { createContext, useCallback, useContext, useState } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(3);

  const fetchItems = useCallback(
    async (active) => {
      const res = await fetch(
        `http://localhost:3001/api/items?limit=${limit}&q=${query}&skip=5`
      ); // Intentional bug: backend ignores limit
      const json = await res.json();
      if (!active) return; // Check if component is still mounted
      setItems(json);
    },
    [query, limit]
  );

  return (
    <DataContext.Provider value={{ items, fetchItems, query, setQuery }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
