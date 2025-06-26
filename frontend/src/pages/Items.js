import React, { useEffect } from 'react';
import { useData } from '../state/DataContext';
import { Link } from 'react-router-dom';
import { FixedSizeList as List } from 'react-window';
import './items.styles.css';
import SkeletonList from '../components/SkeletonList';
import Card from '../components/Card';
import Pagination from '../components/Pagination';
import SearchInput from '../components/SearchInput';

function Items() {
  const {
    items,
    loading,
    fetchItems,
    query,
    setQuery,
    totalItems,
    limit,
    setLimit,
    currentPage,
    setCurrentPage,
    skip,
    setSkip,
  } = useData();

  useEffect(() => {
    let active = true;

    // Intentional bug: setState called after component unmount if request is slow
    fetchItems(active).catch(console.error);

    // Clean‑up to avoid memory leak (candidate should implement)
    return () => {
      active = false;
    };
  }, [fetchItems]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSkip((page - 1) * limit);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    const newSkip = (currentPage - 1) * newItemsPerPage;
    setLimit(newItemsPerPage);
    setSkip(newSkip);
  };

  const Row = ({ data, index, style }) => {
    const item = data[index];
    return (
      <li key={item.id} style={style}>
        <Link to={'/items/' + item.id}>{item.name}</Link>
      </li>
    );
  };

  const renderList = () => {
    if (loading) {
      return <SkeletonList count={3} />;
    }
    if (items.length === 0) {
      return <p>No items found.</p>;
    }
    return (
      <>
        <Card styles={{ display: 'flex', justifyContent: 'center' }}>
          <List
            height={300}
            className='item-list'
            outerElementType='ul'
            itemData={items}
            itemCount={items.length}
            itemKey={(index, data) => data[index].id}
            itemRenderer={Row}
            itemSize={50}
            width={500}
          >
            {Row}
          </List>
        </Card>
        <Pagination
          currentPage={currentPage}
          itemsPerPage={limit}
          totalItems={totalItems}
          totalPages={Math.ceil(totalItems / limit)}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </>
    );
  };

  const onChangeQuery = (val) => {
    setQuery(val);
    if (skip) setSkip(0);
    if (currentPage !== 1) setCurrentPage(1);
  };
  return (
    <>
      <div>
        <h1>Items</h1>
        <SearchInput type='text' value={query} onChange={onChangeQuery} />
      </div>

      {renderList()}
    </>
  );
}

export default Items;
