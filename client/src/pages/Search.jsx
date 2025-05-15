import React, { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar';
import SearchCard from '../components/SearchCard'
import '../App.css'
import { Toaster } from 'sonner';


function Search({ hovered, setHovered, hoveredMovieId, setHoveredMovieId, handleMouseEnter, handleMouseLeave }) {
    
    const [popular, setPopular]= useState([]);
    const [content, setContent]= useState([]);
    const [title, setTitle]= useState('Popular Searches')
    const inputRef= useRef(null)
    
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWIyOTk3YzgzMDBjZTlhN2Q0NzJjYjBhMzljZjI4ZiIsInN1YiI6IjYzNWFiODU0MmQ4ZWYzMDA4MTM5YmQ4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9uqLs8oCBNUguiDI0vyPoXyrmksjpVbHnZKtHnJObG0'
        }
    };


    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
            .then(response => response.json())
            .then(response => setPopular(response.results))
            .catch(err => console.error(err));
    }, []);
    
    useEffect(() => setContent(popular), [popular]);

    const handleChange = async (e) => {
        const word = e.target.value;
    
        if(word===""){
            setContent(popular);
            setTitle("Popular Searches")
        }else{
            const movies = await getMovies(word);
            const series = await getSeries(word);
            setTitle("Top Results")
            setContent([...movies, ...series]);
        }
    }
    
    const getMovies = async (word) => {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${word}&include_adult=false&language=en-US&page=1`, options);
        const json = await response.json();
        return json.results.slice(0,5);
    }
    
    const getSeries = async (word) => {
        const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=${word}&include_adult=false&language=en-US&page=1`, options);
        const json = await response.json();
        return json.results.slice(0,5);
    }
    

    return (
        <div className='relative'>
            <Toaster richColors />
            <Navbar/>
            <div className='flex flex-col items-center w-screen' >
                <div className='w-[90%] lg:w-[calc(100%-100px)] xl:w-[calc(100%-200px)] h-[55px] lg:h-[65px] overflow-y-hidden flex items-center gap-2 bg-[#262833] mt-5  rounded-[7px]  p-4 my-4 ' >
                    <input ref={inputRef} onChange={handleChange} type="text" placeholder='Movies, shows and more' className='w-[100%] h-[40px] rounded-[7px] bg-[#262833] outline-none text-white text-[16px] lg:text-[18px]'/>
                </div>
                <p className='text-white  text-[20px] lg:text-[24px] font-semibold  my-6 ' >{title}</p>
                <div  className='w-[90%] lg:w-[calc(100%-100px)] xl:w-[calc(100%-200px)] grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2  mb-[120px] lg:mb-0  ' >
                    {content.map((content, index) => 
                        content.poster_path ? (
                            <SearchCard movie={content} index={index}  hovered={hovered} setHovered={setHovered} hoveredMovieId={hoveredMovieId} setHoveredMovieId={setHoveredMovieId} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
                        ) : null
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Search;
