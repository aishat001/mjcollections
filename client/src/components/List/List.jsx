import React from 'react';
import useFetch from '../../hooks/useFetch';
import Item from '../Item/Item';

const List = ({ selectedCategory, maxPrice, sort, displayedProducts }) => {
  const { data, loading, error } = useFetch(`/items`);

  const filteredItems = () => {
    if (
      selectedCategory.toLowerCase() === 'all categories' ||
      selectedCategory === 'Filter by'
    ) {
      return data;
    } else {
      return data?.filter(item => selectedCategory.includes(item.category));
    }
  };

  const sortedItems = filteredItems().sort((a, b) => {
    if (sort === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  const displayedItems = sortedItems.slice(0, displayedProducts);


  return (
    <div className='flex flex-row gap-5 flex-wrap z-[1]'>
    {loading ? (
      <p>Loading</p>
    ) : error ? (
      <p>Error: {error}</p>
    ) : (
      displayedItems.map(item => <Item key={item.id} item={item} />)
    )}
  </div>
  );
};

export default List;