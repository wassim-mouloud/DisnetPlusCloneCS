import React, { useEffect, useState } from 'react'
import MainSlider from './MainSlider';


function Popular2() {
    const [trending, setTrending]= useState([])

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWIyOTk3YzgzMDBjZTlhN2Q0NzJjYjBhMzljZjI4ZiIsInN1YiI6IjYzNWFiODU0MmQ4ZWYzMDA4MTM5YmQ4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9uqLs8oCBNUguiDI0vyPoXyrmksjpVbHnZKtHnJObG0'
        }
      };

      useEffect(()=>{
        async function getTrending(){
            try{
                const response= await fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', options)
                const json= await response.json()
                setTrending(json.results)
                const response2= await fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=2', options)
                const json2= await response2.json()
                setTrending(prev=>[...prev, json2.results[0]])
                setTrending(prev=>[...prev].slice(0,21))
            }catch(e){
                console.error(e)
            }
        }

        getTrending()
      },[])
  return (
    <div className='flex flex-col gap-1 lg:ml-[100px] mt-10 lg:w-[calc(100vw-100px)] overflow-x-hidden' >
        <p className='ml-3 lg:ml-0 text-white font-semibold text-[20px]' >Popular Shows</p>
        <MainSlider trending={trending} />
    </div>
  )
}

export default Popular2