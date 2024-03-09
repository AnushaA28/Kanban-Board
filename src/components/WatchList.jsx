import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movies from './Movies';
import Pagination from './Pagination';

function WatchList() {
    // Define genre IDs
    let genreIds = {
        28: "Action",
        12: "Adventure"
        // Add more genre data here
    }

    // State for favorites, genres, selected genre, rating, and search string
    const [favourites, setFavourites] = useState([]);
    const [genres, setGenres] = useState([]);
    const [currGenre, setCurrGenre] = useState('All Genres');
    const [rating, setRating] = useState(0);
    const [searchStr, setSearchStr] = useState('');
    const [movies, setMovies] = Movies.useState([]);

    useEffect(() => {
        // Fetch movie data from local storage and API
        (function () {
            let moviesFromLS = localStorage.getItem('imdb');
            moviesFromLS = JSON.parse(moviesFromLS) || [];
            setFavourites(moviesFromLS);

            axios.get(
                // Add API URL here
            ).then((res) => {
                setMovies(res.data.results);
            });
        })();
    }, [Pagination.pageNum]);

    // useEffect for genre
    useEffect(() => {
        let temp = movies.map((movie) => genreIds[movie.genre_ids[0]]);
        setGenres(["All genres", ...temp]);
    });

    // Create filter function according to genre
    let filteredArray = [];

    // Genre filter
    filteredArray = currGenre === 'All Genres' ? favourites : favourites.filter((movie) => genreIds[movie.genre_ids[0]]);

    // Condition for sorting movies according to rating
    if (rating === -1) {
        filteredArray = filteredArray.sort(function (objA, objB) {
            return objB.vote_average - objA.vote_average;
        });
    }

    if (rating === 1) {
        filteredArray = filteredArray.sort(function (objA, objB) {
            return objA.vote_average - objB.vote_average;
        });
    }

    // Movies searching functionality
    filteredArray = filteredArray.filter((movie) => {
        return movie.title.toLowerCase().includes(searchStr.toLowerCase());
    });

    // Delete functionality
    const del = (movie) => {
        let newArray = favourites.filter((m) => m.id !== movie.id);
        setFavourites([...newArray]);
        localStorage.setItem('imdb', JSON.stringify(newArray));
    }

    // Return the JSX for the WatchList component
    return (
        <>
            <div className="mt-6 flex space-x-2 justify-center">
                {genres.map((genre) => {
                    return (
                        <button
                            key={genre}
                            className={currGenre === genre ? 'm-2 text-lg px-2 bg-blue-400 text-white rounded-xl font-bold' : 'm-2 text-lg px-2 bg-gray-400 text-white rounded-xl font-bold'}
                            onClick={() => {
                                setCurrGenre(genre);
                            }}
                        >
                            {genre}
                        </button>
                    );
                })}
            </div>

            {/* Input field for movie search */}
            <div className="text-center">
                <input
                    type="text"
                    className="border bg-gray-200 border-4 text-center p-1 m-2"
                    placeholder="Search For Movies"
                    value={searchStr}
                    onChange={(e) => setSearchStr(e.target.value)}
                />
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-6 py-4 font-medium text-gray-900">Name</th>
                            <th>
                                <div className="flex">
                                    {/* Image showing arrow for up rating */}
                                    <img
                                        src=""
                                        onClick={() => {
                                            setRating(1);
                                        }}
                                    />
                                    <div>Ratings</div>
                                    {/* Image showing arrow for down rating */}
                                    <img
                                        src=""
                                        onClick={() => {
                                            setRating(-1);
                                        }}
                                    />
                                </div>
                            </th>
                            <th>
                                <div className="flex">
                                    <div>Popularity</div>
                                </div>
                            </th>
                            <th>
                                <div className="flex">
                                    <div>Genre</div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {filteredArray.map((movie) => (
                            <tr className="hover:bg-gray-50" key={movie.id}>
                                <td className="flex items-center px-6 py-4 font-normal text-gray-900">
                                    <img className="h-[6rem] w-[10rem] object-fit" src="" alt="" />
                                    <div className="font-medium text-gray-700 text-sm">{movie.title}</div>
                                </td>
                                <td className="pl-6 py-4">
                                    {movie.vote_average}
                                </td>
                                <td className="pl-6 py-4">
                                    {movie.popularity}
                                </td>
                                <td className="pl-2 py-4">
                                    {genreIds[movie.genre_ids[0]]}
                                </td>
                                {/* Adding delete button */}
                                <td className="pl-2 py-4">
                                    <button className="text-red-600" onClick={() => del(movie)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default WatchList;
