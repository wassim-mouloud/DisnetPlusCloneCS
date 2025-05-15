import {React, useEffect, useState} from 'react'
import { front } from '../utils/frontMovies'
import {frontSeries} from '../utils/frontSeries'
import Hero from '../components/Hero'
import SeriesHero from '../components/SeriesHero'
import Navbar from '../components/Navbar'
import SeriesGenreSlider from '../components/SeriesGenreSlider'
import Footer from '../components/Footer'

function Series() {



  return (
    <div className='relative'>
        <Navbar/>
        <SeriesHero frontSeries={frontSeries} />
        <SeriesGenreSlider title='Popular Series' url1='https://api.themoviedb.org/3/trending/tv/day?language=en-US' url2='https://api.themoviedb.org/3/trending/tv/day?language=en-US'/>
        <SeriesGenreSlider title='Top Rated Series' url1='https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1' url2='https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=2' />
        <SeriesGenreSlider title='Action Series' url1='https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10759' url2='https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=2&sort_by=popularity.desc&with_genres=10759' />
        <SeriesGenreSlider title='Drama Series' url1='https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=18' url2='https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=18' />
        <SeriesGenreSlider title='Crime Series' url1='https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=80' url2='https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=80' />
        <SeriesGenreSlider title='Comedy Series' url1='https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35' url2='https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35' />
        <SeriesGenreSlider title='Sci-Fi Series' url1='https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10765' url2='https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10765' />
        <SeriesGenreSlider title='War Series' url1='https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10768' url2='https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10768' />
        <Footer/>
    </div>
  )
}

export default Series
