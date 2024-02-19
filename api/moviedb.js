import axios from 'axios';
import {apiKey} from '../constants'

const baseUrl = 'https://api.themoviedb.org/3';

export const image500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null

const trendingMovies = `${baseUrl}/trending/movie/day?api_key=${apiKey}`
const upcomingMovies = `${baseUrl}/movie/upcoming?api_key=${apiKey}`
const topRatedMovies = `${baseUrl}/movie/top_rated?api_key=${apiKey}`

const movieDetails = id => `${baseUrl}/movie/${id}?api_key=${apiKey}`
const movieCredits = id => `${baseUrl}/movie/${id}/credits?api_key=${apiKey}`
const similarMovies = id => `${baseUrl}/movie/${id}/similar?api_key=${apiKey}`
const searchMovies = `${baseUrl}/search/movie?api_key=${apiKey}`

const personDetails = id => `${baseUrl}/person/${id}?api_key=${apiKey}`
const personMovies = id => `${baseUrl}/person/${id}/movie_credits?api_key=${apiKey}`

const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    }

    try {
        const response = await axios.request(options)
        return response.data;
    } catch (error) {
        console.log('Error: ', error)
        return {}
    }
}

export const getTrendingMovies = () => {
    return apiCall(trendingMovies)
}

export const getUpcomingMovies = () => {
    return apiCall(upcomingMovies)
}

export const getTopRatedMovies = () => {
    return apiCall(topRatedMovies)
}

export const getMovieDetails = id => {
    return apiCall(movieDetails(id))
}

export const getMovieCredits = id => {
    return apiCall(movieCredits(id))
}

export const getSimilarMovies = id => {
    return apiCall(similarMovies(id))
}

export const getPersonDetails = id => {
    return apiCall(personDetails(id))
}

export const getPersonMovies = id => {
    return apiCall(personMovies(id))
}

export const searchMovie = params => {
    return apiCall(searchMovies, params)
}