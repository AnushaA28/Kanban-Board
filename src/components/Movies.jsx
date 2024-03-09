import MovieCard from "./MovieCard";
import axios from "axios"
import {useEffect, useState} from "react"
import Pagination from "./Pagination";

function Movies(props){
    let {
        handleAddToWatchList,handleRemoveFromWatchList,
        pageNo,handleNext,handlePrev} = props;
    let [movies,setMovies] = useState([]);
    const [watchList, setWatchList] = useState([]);
    const [hovered, setHovered] = useState('');


// watchList handlers

const removeFromWatchList = (movie) => {
    const filteredWatchList = watchList.filter((m) => {
        return m.id !== movie.id;
    });
    setWatchList(filteredWatchList);
    localStorage.setItem('imdb', JSON.stringify(filteredWatchList));
  }
  
  const addToWatchList = (movie) => {
    const newWatchList = [...watchList, movie];
    setWatchList(newWatchList);
    localStorage.setItem('imdb', JSON.stringify(newWatchList))
  }
    
    const showButton = (id) => {
        setHovered(id);
    }
    
    const hideButton = (id) => {
        setHovered('');
    }
    
    

    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=2816c138913c6ef73d40c883d36fbe56&page=${pageNo}`)
        .then(function(res){
        console.log(res);
        console.log(res.data.results);
        setMovies(res.data.results);
        console.log("anushaa" + pageNo);
    })
    },[pageNo])

    

    return(
        <div className="p-5">
            <div className="text-2xl m-5 font-bold text-center">
                Trending Movies
            </div>
            <div className="flex flex-wrap justify-around gap-8">
                {movies.map((movieObj)=>{
                    // console.log(movieObj);
                    return <MovieCard key={movieObj.id}
                                    movieObj={movieObj}
                                    name={movieObj.title} 
                                    poster_path={movieObj.poster_path}
                                    watchList = { watchList}
                                    handleAddToWatchList = {handleAddToWatchList}
                                    handleRemoveFromWatchList = {handleRemoveFromWatchList}/>
                })}
            </div>
                    <div
                    onMouseEnter={() => showButton(movies.movie.id)}
                    onMouseLeave={() => hideButton()}
                    >
</div>
            <Pagination pageNo={pageNo}
                        handleNext={handleNext}
                        handlePrev={handlePrev}/>
        </div>
    )
}

export default Movies;