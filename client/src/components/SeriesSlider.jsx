import React, { useEffect, useRef, useState } from 'react'
import { movie_genres, tv_genres } from '../utils/genres'
import { Link } from 'react-router-dom'
import SeriesCard from "./SeriesCard"
import '../App.css'

function SeriesSlider({ trending }) {
    
  const sliderRef = useRef(null)
  const [index, setIndex] = useState(1)
  const [first, setFirst] = useState([])
  const [last, setLast] = useState([])  
  const [hoveredMovieId, setHoveredMovieId] = useState(null)
  const [isHovered, setIsHovered]= useState(false)
  const [trailers, setTrailers]= useState([])


 
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


  

  useEffect(() => {
    if (trending.length > 0) {
        if(window.innerWidth>=1536){
            setFirst(trending.slice(0, 8))
            setLast(trending.slice(15, 23))
        }else if(window.innerWidth>=1280){
            setFirst(trending.slice(0, 7))
            setLast(trending.slice(14, 21))
        }else if (window.innerWidth>=1024){
            setFirst(trending.slice(0, 6))
            setLast(trending.slice(12, 18))
        }

    }
  }, [trending])

  const handleNext = () => {  
      if(index >= 4) return
      let size = sliderRef.current.offsetWidth;
      let newIndex = index + 1;
      sliderRef.current.style.transition = 'transform 0.6s linear';
      setIndex(newIndex);
      sliderRef.current.style.transform = 'translateX(' + (-size * newIndex) + 'px)';
  }

  const handlePrev = () => {
      if(index <= 0) return
      let size = sliderRef.current.offsetWidth;
      let newIndex = index - 1;
      sliderRef.current.style.transition = 'transform 0.6s linear';
      setIndex(newIndex);
      sliderRef.current.style.transform = 'translateX(' + (-size * newIndex) + 'px)';
  }

  const handleTransitionEnd = () => {
      if(index === 0){
          let size = sliderRef.current.offsetWidth;
          let newIndex = 3;
          sliderRef.current.style.transition = 'none';
          setIndex(newIndex);
          sliderRef.current.style.transform = 'translateX(' + (-size * newIndex) + 'px)';
      } else if(index === 4){
          let size = sliderRef.current.offsetWidth;
          let newIndex = 1;
          sliderRef.current.style.transition = 'none';
          setIndex(newIndex);
          sliderRef.current.style.transform = 'translateX(' + (-size * newIndex) + 'px)';
      }
  }
  
  const handleMouseEnter = async (id) => {
      setIsHovered(false)
      setHoveredMovieId(id);
      await sleep(500)
      setIsHovered(true)
  };
  

const handleMouseLeave = () => {
    setHoveredMovieId(null)
    setIsHovered(false)
}


useEffect(()=>{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWIyOTk3YzgzMDBjZTlhN2Q0NzJjYjBhMzljZjI4ZiIsInN1YiI6IjYzNWFiODU0MmQ4ZWYzMDA4MTM5YmQ4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9uqLs8oCBNUguiDI0vyPoXyrmksjpVbHnZKtHnJObG0'
        }
      };
      
      const fetchMovieTrailers = async () => {
        for (let movie of trending) {
          try {
            const response = await fetch(`https://api.themoviedb.org/3/tv/${movie?.id}/videos?language=en-US`, options);
            const data = await response.json();
            if(data.results[0]){
                setTrailers(prevTrailers => {
                    if (!prevTrailers.includes(data.results[0].key)) {
                      return [...prevTrailers, data.results[0].key];
                    } else {
                      return prevTrailers;
                    }
                  });
            }
          } catch (err) {
            console.error(err);
          }
        }
      };
      
      fetchMovieTrailers();
      
  
}, [trending])



  return (
    <div className='z-[90] py-2 relative w-screen  mt-3  lg:w-[calc(100vw-100px)] overflow-x-clip'>
        <div onClick={handlePrev} className=' cursor-pointer h-full w-[50px] hidden lg:flex opacity-0 hover:opacity-100 transition-opacity duration-500 justify-center items-center absolute left-0 top-0 z-[99]' style={{ backgroundImage: 'linear-gradient(to left, transparent, #0f1013)' }} >
            <img src="/images/previousMain.png" alt="" className='w-4 h-4 z-[99]'  />
        </div>
        <div onTransitionEnd={handleTransitionEnd}  ref={sliderRef} className='flex w-full gap-2 lg:w-[95%] translate-x-0 lg:translate-x-[-100%] overflow-x-scroll lg:overflow-visible' >
            {last.map((movie, index) => {
                return (
                    <div key={index} className=' h-[170px] cursor-pointer lg:h-[250px] lg:min-h-[250px] lg:w-[calc(100%/6-8px)] xl:w-[calc(100%/7-8px)] 2xl:w-[calc(100%/8-8px)] flex-shrink-0 rounded-[5px] hidden lg:flex' >
                        <img loading='lazy' src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} alt="" className={`group-hover:h-[45%]   rounded-[5px] h-full w-full`}/>
                    </div>
                )
            })}
            {trending.map((movie, index) => {
                return (
                    <SeriesCard movie={movie} index = {index} trailers ={trailers} tv_genres ={tv_genres} handleMouseEnter ={handleMouseEnter} handleMouseLeave = {handleMouseLeave} isHovered={isHovered} hoveredMovieId = {hoveredMovieId} key={index} />
                )
            })}
            {first.map((movie, index) => {
                return (
                    <div key={index} className=' h-[170px] lg:h-[250px] cursor-pointer lg:min-h-[250px]  lg:w-[calc(100%/6-8px)] xl:w-[calc(100%/7-8px)] 2xl:w-[calc(100%/8-8px)] flex-shrink-0 rounded-[5px] hidden lg:flex' >
                        <img loading='lazy' src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} alt="" className={`group-hover:h-[45%]  rounded-[5px] h-full w-full`}/>
                    </div>
                )
            })}
        </div>
        <div onClick={handleNext} className='cursor-pointer h-full w-[50px] hidden lg:flex opacity-0 hover:opacity-100 transition-opacity duration-500 justify-center items-center absolute right-0 top-0' style={{ backgroundImage: 'linear-gradient(to right, transparent, #0f1013)' }}>
            <img src="/images/nextMain.png" alt="" className='w-4 h-4 z-[99]'  />
        </div>
    </div>
  )
}

export default SeriesSlider