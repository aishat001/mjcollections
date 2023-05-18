import React from 'react'
import useFetch from '../../hooks/useFetch'
import Item from '../Item/Item'

const List = ({ selectedCategory, maxPrice, sort }) => {


  const { data, loading, error } = useFetch(`/items`)


  const itemCategory = data.filter(item => {
    if(selectedCategory.toLowerCase() === 'all categories' || selectedCategory === 'Filter by'){
      return item
    }
    else {
      const filtered = selectedCategory.includes(item.category)
      return filtered
    }
  }).sort((a, b) => {
    if (sort === "asc") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  }); 

  // const filter = () => {
  //   if(selectedCategory.toLowerCase() === 'all categories' || selectedCategory === 'Filter by'){
  //     return data
  //   } else {
  //     const filtered = data?.filter(item => selectedCategory.includes(item.category))
  //     return filtered
  //   }
  // }

  // console.log(filter());

  return (
    <div>

      {
        loading ? (<p>Loading</p> 
              ) : 
              itemCategory?.map(item =>   {
                return (
                  <Item key={item.id} item={item} />
              )
              })
        }
    </div>



  )
}

export default List