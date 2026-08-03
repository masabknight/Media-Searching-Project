import React from 'react'

const ResultCard = ({ item }) => {

    const addToCollection = () => {

        const oldData = JSON.parse(localStorage.getItem('collection')) || [];

        console.log(oldData)
        const newData = [...oldData, item];
        
        localStorage.setItem('collection', JSON.stringify(newData));
        
        console.log(newData)
    }

    return (
        <div className='w-[18vw] relative h-80 bg-white rounded-xl overflow-hidden'>

            <a className='h-full' target='_blank' href={item.url}>
                {item.type == 'photo' ? <img className='h-full w-full object-cover object-center' src={item.src} alt="" /> : ''}
                {item.type == 'video' ? <video className='h-full w-full object-cover object-center' autoplay loop muted src={item.src}></video> : ''}
                {item.type == 'gif' ? <img className='h-full w-full object-cover object-center' src={item.src} alt="" /> : ''}
            </a>

            <div id='bottom' className='flex justify-between gap-3 items-center w-full px-4 py-6 absolute bottom-0 text-white'>
                <h2 className='text-lg font-semibold capitalize h-12 overflow-hidden'>{item.title}</h2>
                <button onClick={addToCollection} className='bg-indigo-600 active:scale-95 text-white rounded px-3 py-1 cursor-pointer font-medium'>Save</button>
            </div>

        </div>
    )
}

export default ResultCard
