import {addToWatchList, removeFromWatchList} from "./Movies";
import Movies from "./Movies";

export default function MovieCard(props){
    let {movieObj,handleAddToWatchList,handleRemoveFromWatchList,name,watchList,poster_path} = props;


    function isContain(movieObj){
        for(let i=0;i<watchList.length;i++){
            if(watchList[i].id == movieObj.id){
                return true;
            }
        }
        return false;
    }

    

    return(
        <div className="h-[40vh] w-[200px] bg-center bg-cover 
        rounded-xl hover:scale-110 duration-300 hover:cursor-pointer
         flex flex-col justify-between items-end overflow-hidden"
        style={{
               backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
       }}>
           {isContain(movieObj)?
            <div onClick={()=>handleRemoveFromWatchList(movieObj)} className="m-4 bg-gray-900
                            flex justify-center items-center 
                            h-8 w-8 rounded-lg">
                    &#10060;
                </div>
           :<div onClick={()=>handleAddToWatchList(movieObj)}
            className="m-4 bg-gray-900
                        flex justify-center items-center 
                        h-8 w-8 rounded-lg">
                    &#128525;
                </div>
           }
           
           
           <div className="text-xl text-white
            bg-gray-900/60 w-full p-2 text-center ">
               {name}
            </div>
            <div className="p-2 bg-gray-900 rounded-xl absolute right-2 top-2">
    {watchList.includes(movieObj.movie) === false ? (
        <div onClick={() => Movies.addToWatchList(movieObj.movie.id)}>
            😀
        </div>
    ) : (
        <div onClick={() => Movies.removeFromWatchList(movieObj.movie.id)}>
            ❌
        </div>
    )}
</div>


       </div>
    )
}