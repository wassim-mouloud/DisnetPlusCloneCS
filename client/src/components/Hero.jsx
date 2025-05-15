import React, { useEffect, useRef, useState } from 'react';
import '../App.css';

function Hero({ frontMovies }) {
    const [index, setIndex] = useState(0);
    const scrollDots = useRef(null);
    const [slider, setSlider] = useState([

    ]);
    const sliderRef= useRef(null)
    const viewers=[0,1,2,3,4,5]
    const [trailers, setTrailers]= useState([])
    const [dupFirst, setDupFirst]= useState([])
    const [dupLast, setDupLast]= useState([])
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(()=>{
            if(window.innerWidth>=1280){
                setSlider([
                    0,1,2,3,4,5,6,7,8,9,
                    10,11,12,13,14,15,16,17
                ])
            }else if (window.innerWidth>=1024){
                setSlider([
                    0,1,2,3,4,5,6,7,8,9,
                    10,11,12,13,14,15
                ])
            }
    },[])

    useEffect(() => {
        if (frontMovies.length > 0) {
            if(window.innerWidth>=1536){
                setDupFirst([0,1,2,3,4,5,6])
                setDupLast([11,12,13,14,15,16,17])
            }else if(window.innerWidth>=1280){
                setDupFirst([0,1,2,3,4,5,6])
                setDupLast([11,12,13,14,15,16,17])
            }else if (window.innerWidth>=1024){
                setDupFirst([0,1,2,3])
                setDupLast([12,13,14,15])
            }
    
        }
      }, [frontMovies])

    

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex(prevIndex => (prevIndex + 1) % 18);
        }, 6000);

        // Clean up the interval on unmount
        return () => clearInterval(timer);
    }, [frontMovies]);


    
    


    const handlePrevious = async () => {
        try{
            if(sliderRef.current){
                const sliderIndex = parseInt(getComputedStyle(sliderRef.current).getPropertyValue("--slider-index"));
                if(sliderIndex===1){
                    sliderRef.current.style.transition='transform 0.5s linear';
                    sliderRef.current.style.setProperty("--slider-index", sliderIndex-1);
                    await sleep(500);
                    sliderRef.current.style.transition='none';
                    sliderRef.current.style.setProperty("--slider-index", window.innerWidth>=1280?3:4);
                }else{
                    sliderRef.current.style.transition='transform 0.5s linear';
                    sliderRef.current.style.setProperty("--slider-index", sliderIndex-1);
                }
            }
        }catch(e){
            console.log(e)
        }

    }

    const handleNext = async () => {
        try{
            if(sliderRef.current){
                const sliderIndex = parseInt(getComputedStyle(sliderRef.current).getPropertyValue("--slider-index"));
                if(window.innerWidth>=1280){

                    if(sliderIndex===3){
                        sliderRef.current.style.transition='transform 0.5s linear';
                        sliderRef.current.style.setProperty("--slider-index", sliderIndex+1);
                        await sleep(500);
                        sliderRef.current.style.transition='none';
                        sliderRef.current.style.setProperty("--slider-index", 1);
                    }else{
                        sliderRef.current.style.transition='transform 0.5s linear';
                        sliderRef.current.style.setProperty("--slider-index", sliderIndex+1);
                    }
                }else if(window.innerWidth>=1024){

                    if(sliderIndex===4){
                        sliderRef.current.style.transition='transform 0.5s linear';
                        sliderRef.current.style.setProperty("--slider-index", sliderIndex+1);
                        await sleep(500);
                        sliderRef.current.style.transition='none';
                        sliderRef.current.style.setProperty("--slider-index", 1);
                    }else{
                        sliderRef.current.style.transition='transform 0.5s linear';
                        sliderRef.current.style.setProperty("--slider-index", sliderIndex+1);
                    }
                }
            }
        }catch(e){
            console.log(e)
        }

    }
    


    useEffect(() => {
        if(sliderRef.current) { 
    
            if(index % 6 === 5 && index!==0){
                setTimeout(()=>handleNext(),6000)
            }
        }
    }, [index]);
    
    useEffect(()=>{
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWIyOTk3YzgzMDBjZTlhN2Q0NzJjYjBhMzljZjI4ZiIsInN1YiI6IjYzNWFiODU0MmQ4ZWYzMDA4MTM5YmQ4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9uqLs8oCBNUguiDI0vyPoXyrmksjpVbHnZKtHnJObG0'
            }
          };
          
          const fetchMovieTrailers = async () => {
            for (let movie of frontMovies) {
              try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`, options);
                const data = await response.json();
                for (let video of data.results) {
                  if (video.type === "Trailer") {
                    setTrailers(prevTrailers => {
                        if (!prevTrailers.includes(video.key)) {
                          return [...prevTrailers, video.key];
                        } else {
                          return prevTrailers;
                        }
                      });
                                          break;
                  }
                }
              } catch (err) {
                console.error(err);
              }
            }
          };
          
          fetchMovieTrailers();
          
      
    }, [frontMovies])
        
       

    return (
        <div className='w-screen h-[70vh] lg:h-screen relative '>
            <div 
                className="absolute inset-0 w-screen h-[46vh] lg:h-screen" 
                style={{ backgroundImage: 'linear-gradient(to bottom, transparent, #0f1013)', zIndex: 40 }}
            >
            </div>

            {frontMovies[index] && 
                <div className='w-full h-[45vh] lg:h-full '>
                    <div className='flex calc justify-center lg:justify-between absolute top-[20%] lg:top-[20%] lg:left-[140px]'>
                        <div 
                            key={frontMovies[index].original_title} 
                            className=' w-screen lg:w-[30vw] h-[35vh] lg:h-[60vh]  flex flex-col justify-center gap-3 lg:gap-0  lg:justify-between items-center lg:items-start' >
                       
                            <img src="./images/logo.png" alt="" className='w-full z-[90] hidden lg:flex' />

                            <p className='text-white text-[24px] lg:text-[30px] font-bold z-[90] text-center lg:text-left'>
                                {frontMovies[index].original_title}
                            </p>

                            <div className='hidden lg:flex h-6  items-center justify-center gap-2 text-white text-[14px] z-[90]' >
                                <span>{frontMovies[index].release_date.slice(0,4)}</span>
                                <span className=''>•</span>
                                <span>{Math.floor(frontMovies[index].runtime/60)} h {(frontMovies[index].runtime%60)} m</span>
                                <img src="/images/star.png" alt="" className='w-3 h-3' />
                                <span>{(frontMovies[index].vote_average).toString().slice(0,3)}</span>
                            </div>

                            <p className='font-semibold text-white text-[14px] hidden lg:flex z-[90]'>
                                {frontMovies[index].overview}
                            </p>

                            <div className='flex gap-2 text-white text-[14px] z-[90]'>
                                <span className='lg:hidden' >{frontMovies[index].release_date.slice(0,4)}</span>
                                <span className='lg:hidden'>•</span>
                                {frontMovies[index].genres.map((genre, i) => {
                                    return (
                                        <div key={i} className={`${i > 3 ? "hidden" : ''} flex gap-2  z-[90]`}>
                                            <span>{genre.name}</span>
                                            {i !== frontMovies[index].genres.length - 1?<div><span className='lg:hidden' >•</span> <span className='hidden lg:flex' >|</span></div>:null }
                                        </div>
                                    );
                                })}
                            </div>

                            <div className='py-3 flex gap-6 w-full justify-center lg:justify-between  text-white z-[90]'>
                                <a className='p-0 m-0 w-[170px] lg:w-[70%] h-[50px] lg:h-[55px] lg:min-w-[70%]' href={`https://www.youtube.com/watch?v=${trailers[index]}`} target="_blank" rel="noopener noreferrer">
                                    <button
                                        className={`w-full h-full rounded-[10px] text-[14px]  bg-[rgba(255,255,255,0.1)] lg:hover:bg-[rgba(255,255,255,0.4)] lg:hover:scale-105 transition-all duration-300  p-5 flex justify-center items-center gap-2`}
                                    >
                                        <img src="./images/play_button.png" alt="" className='h-[16px] w-[16px]' />
                                        <span>Watch Now</span>
                                    </button>
                                </a>

                                {/* <button 
                                    className='w-[50px] lg:w-[60px] h-[50px] lg:h-[55px] rounded-[10px] text-[18px]  bg-[rgba(255,255,255,0.1)] lg:hover:bg-[rgba(255,255,255,0.4)] lg:hover:scale-105 transition-all duration-300 p-5 flex justify-center items-center'
                                >
                                    +
                                </button> */}
                            </div>
                        </div>

                        <div className='relative lg:w-[420px] xl:w-[640px]  z-[90]  flex-shrink-0  hidden lg:flex  items-end justify-center overflow-x-hidden py-3 px-[30px]' >
                            <div ref={sliderRef}  className={`flex lg:w-[370px] xl:w-[580px] lg:min-w-[370px] xl:min-w-[580px] gap-2 slider  flex-shrink-0 `} >
                                {dupLast.map(n=>{
                                     return (
                                        <div 
                                            key={n}
                                            onClick={()=>setIndex(n)} 
                                            className={`overflow-hidden flex-shrink-0 lg:w-[calc(370px/4-8px)] xl:w-[calc(580px/6-8px)] rounded-[5px] hover:scale-110  transition-all  duration-150 cursor-pointer border-transparent hover:border-white border-[1px] ${index===n?"border-white":''}`} >

                                            <img loading='lazy' src={`https://image.tmdb.org/t/p/w300${frontMovies[n] && frontMovies[n].backdrop_path}`} alt="" className={`h-full w-full `} />
                                        </div>
                                    )
                                })}
                                {slider.map(n=>{
                                    return (
                                        <div 
                                            key={n}
                                            onClick={()=>setIndex(n)} 
                                            className={`overflow-hidden  flex-shrink-0 lg:w-[calc(370px/4-8px)] xl:w-[calc(580px/6-8px)] rounded-[5px] hover:scale-110  transition-all  duration-150 cursor-pointer border-transparent hover:border-white border-[1px] ${index===n?"border-white":''}`} >

                                            <img loading='lazy' src={`https://image.tmdb.org/t/p/w300${frontMovies[n] && frontMovies[n].backdrop_path}`} alt="" className={`h-full w-full `} />
                                        </div>
                                    )
                                })}
                                {dupFirst.map(n=>{
                                     return (
                                        <div 
                                            key={n}
                                            onClick={()=>setIndex(n)} 
                                            className={`overflow-hidden flex-shrink-0 lg:w-[calc(370px/4-8px)] xl:w-[calc(580px/6-8px)] rounded-[5px] hover:scale-110  transition-all  duration-150 cursor-pointer border-transparent hover:border-white border-[1px] ${index===n?"border-white":''}`} >

                                            <img loading='lazy' src={`https://image.tmdb.org/t/p/w300${frontMovies[n] && frontMovies[n].backdrop_path}`} alt="" className={`h-full w-full `} />
                                        </div>
                                    )
                                })}
                               
                            </div>

                            <div 
                                className='absolute left-0 bottom-[12px] h-[50px] w-[25px] flex justify-center items-center  rounded-l-[10px] cursor-pointer hover:scale-125' 
                            >
                                <img onClick={handlePrevious} src="./images/previous.png" alt="" className=' w-8 h-8 z-[91]' />
                            </div>

                            <div 
                                onClick={handleNext} 
                                className='absolute right-0 bottom-[12px] h-[50px] w-[25px] flex justify-center items-center  transition-all rounded-l-[10px] cursor-pointer hover:scale-125' 
                            >
                                <img src="./images/previous.png" alt="" className=' w-8 h-8 z-[91] rotatey' />
                            </div>
                        </div>
                    </div>

                    <img 
                        key={frontMovies[index].backdrop_path} 
                        src={`https://image.tmdb.org/t/p/original${frontMovies[index]?.backdrop_path}`} 
                        alt="" 
                        className='relative object-cover w-full h-[45vh] lg:h-full fade-in'
                        loading='lazy'
                    />
                </div>
            }

 
            <div className='flex justify-center lg:justify-start lg:ml-[100px] w-screen mt-7 lg:absolute bottom-4 z-[90]' >
                <div className='w-[95vw] lg:w-[90vw] flex justify-between gap-1 lg:gap-2 flex-wrap lg:flex-nowrap' >
                        {viewers.map((viewer, index) => {
                            return (
                                <div 
                                    className={`bg-[#1b1d25] flex justify-center items-center group cursor-pointer w-[calc(95vw/3-4px)] lg:w-[calc(90vw/6-8px)] h-[75px] lg:h-[120px] rounded-[5px]  lg:hover:scale-[1.15]  duration-300 transition-transform lg:hover:z-[99] `}
                                    key={index} 
                        
                                >
                                    <img src={`./images/viewer${index}.png`} alt="" className='h-[70px]  absolute  z-[99]' />
                                    <video 
                                
                                    src={`./videos/viewer${index}.mp4`}  
                                    autoPlay={window.innerWidth > 1024 ? true : false}
                                    muted 
                                    loop 
                                    className='hidden lg:block rounded-[5px] object-cover w-full  h-full min-w-full min-h-full transition-opacity duration-300 opacity-0 group-hover:opacity-100'
                                    />

                                </div>
                        )
                        })}
                </div>
            </div>
        </div>
    );
}

export default Hero;
