import React, { useEffect } from 'react';
import { useData } from '../state/DataContext';
import { Link } from 'react-router-dom';

function Items() {
  const { items, fetchItems, query, setQuery } = useData();

  useEffect(() => {
    let active = true;

    // Intentional bug: setState called after component unmount if request is slow
    fetchItems(active).catch(console.error);

    // Clean‑up to avoid memory leak (candidate should implement)
    return () => {
      active = false;
    };
  }, [fetchItems]);

  if (!items.length) return <p>Loading...</p>;

  return (
    <>
      <div>
        <h1>Items</h1>
        <input
          type='text'
          placeholder='Search...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <p>Found {items.length} items</p>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link to={'/items/' + item.id}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Items;
