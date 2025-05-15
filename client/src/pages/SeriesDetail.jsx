import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import SeriesGenreSlider from '../components/SeriesGenreSlider';
import {useParams} from 'react-router-dom'

function SeriesDetail() {

    const {id}= useParams();
    const [show, setShow]= useState({})
    useEffect(()=>{
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWIyOTk3YzgzMDBjZTlhN2Q0NzJjYjBhMzljZjI4ZiIsInN1YiI6IjYzNWFiODU0MmQ4ZWYzMDA4MTM5YmQ4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9uqLs8oCBNUguiDI0vyPoXyrmksjpVbHnZKtHnJObG0'
            }
          };
          
          fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, options)
            .then(response => response.json())
            .then(response => setShow(response))
            .catch(err => console.error(err));
    },[id])


  return (
    <div>
        <Navbar/>
        <div className='w-screen h-[130vh] lg:h-[120vh] relative text-[#d9d9da]' >
            <img src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`} alt="" className='h-[30vh] lg:h-[600px] object-cover lg:object-top w-full rounded-lg' />
            <div 
                    className="absolute inset-0 w-screen lg:h-[600px] hidden lg:block" 
                    style={{ backgroundImage: 'linear-gradient(to bottom, transparent, #0f1013)' }}
            >
            </div>
            <div className='lg:absolute lg:top-[12%] lg:ml-[100px] lg:max-w-[450px]' >
                {show.production_companies && (
                    <img src={`https://image.tmdb.org/t/p/w500${show?.networks[0]?.logo_path}`} alt="" className='hidden lg:block  h-[70px] px-3' />

                )}
                <p className='px-3 py-4 font-bold text-[22px] lg:text-[30px] text-[#d9d9da] lg:text-white' >{show.name}</p>
                <div className='flex items-center gap-2 lg:gap-4 px-3 py-1 text-[14px] font-medium text-[#e5e5e5]' >
                    <span className='' >{typeof(show.first_air_date)==='string' && show.first_air_date.slice(0,4)}</span>
                    <span>•</span>
                    <span>{show?.seasons?.length} {show?.seasons?.length>1?'seasons':'season'}</span>
                    <span>•</span>
                    <img src="/images/star.png" alt="" className='w-3 h-3' />
                    <span>{show.vote_average && (show.vote_average).toString().slice(0,3)}</span>
                    <div className='bg-[#5b5b5d] lg:bg-[rgba(0,0,0,0.2)] text-[#e5e5e5]  rounded-md p-1 text-[14px]' >13+</div>
                </div>
                <p className='text-[#7c849b] lg:text-white px-3 text-[14px] font-semibold py-3' >{show.overview}</p>
                <div className='flex gap-1 py-2 ml-3 ' >
                    {show.genres && show.genres.map((genre, index)=>{
                        return(
                            <div key={index} className='flex flex-shrink-0 gap-1 overflow-x-scroll lg:overflow-x-auto text-[14px] font-medium' >
                                <span className=' text-[#e5e5e5] '>{genre.name}</span>
                                <span className={`text-[#7c849b] ${index===show.genres.length-1?'hidden':'flex'}`} >|</span>
                            </div>
                        )
                    })}
                </div>
        </div>
        <SeriesGenreSlider title='More like this' url1={`https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`} url2={`https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=2`} />

    </div>
    </div>

  )
}

export default SeriesDetail