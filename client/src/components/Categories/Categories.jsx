import React from 'react'
import "./Categories.scss"

const Categories = () => {
    return (
        <div className='flex flex-wrap h-[80vh] gap-4'>
            <div className='flex-[1] flex-col gap-4 border border-[1px]'>
                <div><img src="https://images.unsplash.com/photo-1548863227-3af567fc3b27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHRvdGUlMjBiYWd8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"/></div>
                <div><img src="https://images.unsplash.com/photo-1621466550398-ac8062907657?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dG90ZSUyMGJhZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"/></div>
            </div>

            <div className='flex-[1] border border-[1px] h-[800px]'>
                <img className='!h-[800px]' src="https://images.unsplash.com/photo-1610282081854-9c311350beb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHRvdGUlMjBiYWd8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"/>
            </div>

            <div className='flex-[2] flex-col gap4 border border-[1px]'>
                <div className='flex-[1] flex gap-4'>
                    <div className='flex-[1] '>
                        <img src="https://images.unsplash.com/photo-1572196284554-4e321b0e7e0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHRvdGUlMjBiYWd8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"/></div>
                    <div className='flex-[1'><img src="https://images.unsplash.com/photo-1578237493287-8d4d2b03591a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dG90ZSUyMGJhZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"/></div>

                </div>
                <div className='flex-[1]'><img src="https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHRvdGUlMjBiYWd8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"/></div>

            </div>
        </div>
    )
}

export default Categories