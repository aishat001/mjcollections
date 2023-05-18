import React, { useState } from 'react'
import { useParams } from 'react-router';
import List from '../../components/List/List';
import useFetch from '../../hooks/useFetch';

const Products = () => {
    const catId = parseInt(useParams().id)
    const [sort, setSort] = useState();
    const [selectedCategory, setSelectedCategory] = useState("Filter by");
    const [selectedSort, setSelectedSort] = useState("Sort By");
    const [filterDropdown, setfilterDropdown] = useState(false)
    const [filterDropdown2, setfilterDropdown2] = useState(false)

    const lists = [
        {
            id: "1",
            title: "all categories"
        },
        {
            id: "2",
            title: "Backpack design"
        },
        {
            id: "3",
            title: "Animate tote"
        },

        {
            id: "4",
            title: "Letters tote"
        },
        {
            id: "5",
            title: "xx rope design"
        }


    ]


    return (

        <div className=' w-[90vw] m-auto'>
            <div className='flex flex-col py-10 gap-2'>
                <div className='pt-16 sticky left flex-[1] flex flex-row gap-5'>

                    <div>
                        <span onClick={() => setfilterDropdown(!filterDropdown)} className='inline-flex items-center'>
                            <p>{selectedCategory}</p>
                            <svg transform={filterDropdown ? "rotate(180)" : undefined} width="14" height="7" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.99999 8.47077C6.84443 8.47077 6.69393 8.4416 6.54849 8.38327C6.40226 8.32493 6.28054 8.24716 6.18332 8.14993L0.816652 2.78327C0.602763 2.56938 0.495819 2.29716 0.495819 1.9666C0.495819 1.63605 0.602763 1.36382 0.816652 1.14993C1.03054 0.936046 1.30276 0.829102 1.63332 0.829102C1.96387 0.829102 2.2361 0.936046 2.44999 1.14993L6.99999 5.69993L11.55 1.14993C11.7639 0.936046 12.0361 0.829102 12.3667 0.829102C12.6972 0.829102 12.9694 0.936046 13.1833 1.14993C13.3972 1.36382 13.5042 1.63605 13.5042 1.9666C13.5042 2.29716 13.3972 2.56938 13.1833 2.78327L7.81665 8.14993C7.69999 8.2666 7.5736 8.34905 7.43749 8.39727C7.30137 8.44627 7.15554 8.47077 6.99999 8.47077Z" fill="#000" />
                            </svg>
                        </span>

                        {
                            filterDropdown && <div>
                                {lists.map(item =>
                                    <p onClick={(e) => setSelectedCategory(e.target.textContent)}>
                                        {item.title}
                                    </p>
                                )}

                            </div>

                        }

                    </div>

                    <div>
                        <span onClick={() => setfilterDropdown2(!filterDropdown2)} className='inline-flex items-center'>
                            <p>{selectedSort}</p>
                            <svg transform={filterDropdown2 ? "rotate(180)" : undefined} width="14" height="7" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.99999 8.47077C6.84443 8.47077 6.69393 8.4416 6.54849 8.38327C6.40226 8.32493 6.28054 8.24716 6.18332 8.14993L0.816652 2.78327C0.602763 2.56938 0.495819 2.29716 0.495819 1.9666C0.495819 1.63605 0.602763 1.36382 0.816652 1.14993C1.03054 0.936046 1.30276 0.829102 1.63332 0.829102C1.96387 0.829102 2.2361 0.936046 2.44999 1.14993L6.99999 5.69993L11.55 1.14993C11.7639 0.936046 12.0361 0.829102 12.3667 0.829102C12.6972 0.829102 12.9694 0.936046 13.1833 1.14993C13.3972 1.36382 13.5042 1.63605 13.5042 1.9666C13.5042 2.29716 13.3972 2.56938 13.1833 2.78327L7.81665 8.14993C7.69999 8.2666 7.5736 8.34905 7.43749 8.39727C7.30137 8.44627 7.15554 8.47077 6.99999 8.47077Z" fill="#000" />
                            </svg>
                        </span>

                        {
                            filterDropdown2 &&
                            <div>
                                <div>
                                    <input type="radio" id="asc" name='price' value="asc" onChange={(e) => setSort("asc")} />
                                    <label htmlFor='asc'>Price (Lowest first)</label>
                                </div>
                                <div>
                                    <input type="radio" id="desc" name='price' value="desc" onChange={(e) => setSort("desc")} />
                                    <label htmlFor='desc'>Price (Highest first)</label>
                                </div>


                            </div>

                        }

                    </div>

                </div>

                <div className='right flex-[4]'>
                    <h2 className='font-[600] text-2xl pb-10'>ALL BAGS</h2>
                    <div className=' flex flex-wrap gap-4 justify-start '>

                        <List sort={sort} selectedCategory={selectedCategory} />
                    </div>
                </div>

            </div>



        </div>

    )
}

export default Products