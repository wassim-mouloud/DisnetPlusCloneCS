import React, { useEffect, useState } from 'react'
import SeriesSlider from './SeriesSlider'
import {motion} from 'framer-motion'


function SeriesGenreSlider({title, url1, url2, mb}) {
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
                const response= await fetch(url1, options)
                const json= await response.json()
                setTrending(json.results)
                const response2= await fetch(url2, options)
                const json2= await response2.json()
                setTrending(prev=>[...prev, ...json2.results])
                if(window.innerWidth>=1536){
                    setTrending(prev=>[...prev].slice(0,23))
                }else if(window.innerWidth>=1280){
                    setTrending(prev=>[...prev].slice(0,21))
                }else if(window.innerWidth>=1024){
                    setTrending(prev=>[...prev].slice(0,18))
                }
  
            }catch(e){
                console.error(e)
            }
        }

        getTrending()
      },[url1])
  return (
    <motion.div     
    initial={{opacity:0}}
    whileInView={{opacity:1,
      transition:{
        duration:2
      }
    }}  
    className={`flex flex-col gap-1 ml-3 lg:ml-[100px] mt-10  lg:w-[calc(100vw-100px)] mb-[${mb}] lg:mb-0`} >
        <p className=' text-white font-semibold text-[20px]' >{title}</p>
        <SeriesSlider trending={trending} />
    </motion.div>
  )
}

export default SeriesGenreSlider