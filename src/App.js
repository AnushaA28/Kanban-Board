
import './App.css';
import Movies from './components/Movies';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import WatchList from './components/WatchList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {useState,useEffect} from "react"


function App() {
  let [watchList,setWatchList] = useState([]);
  let [pageNo,setPageNo] = useState(1);

    
    let handlePrev = ()=>{
        if(pageNo>1)
            setPageNo(pageNo-1)
    }

    let handleNext = ()=>{
        setPageNo(pageNo+1);
    }

  let handleAddToWatchList = (movieObj)=>{

      let newWatchList = [...watchList,movieObj];
      localStorage.setItem("movieApp",JSON.stringify(newWatchList));
      setWatchList(newWatchList);
  }

  let handleRemoveFromWatchList = (movieObj)=>{
      let filteredWatchList = watchList.filter((movie)=>{
          return movie.id != movieObj.id;
      })
      localStorage.setItem("movieApp",JSON.stringify(filteredWatchList));
      setWatchList(filteredWatchList);
  }

  useEffect(()=>{
    let moviesFromLocalStorage = localStorage.getItem("movieApp");
    if(!moviesFromLocalStorage){
        return;
    }
    setWatchList(JSON.parse(moviesFromLocalStorage));
},[])



  return (
    <BrowserRouter>
      <Navbar/>

      <Routes>
        <Route path='/' element={
          <>
            <Banner/>
            <Movies watchList={watchList}
                    setWatchList={setWatchList}
                    handleAddToWatchList={handleAddToWatchList}
                    handleRemoveFromWatchList={handleRemoveFromWatchList}
                    pageNo={pageNo}
                    handleNext={handleNext}
                    handlePrev={handlePrev}/>
          </>
        }></Route>
        
        <Route path='/watchlist' element={
          <WatchList watchList={watchList}
                    setWatchList={setWatchList}
                      handleRemoveFromWatchList={handleRemoveFromWatchList}/>
        }
        ></Route>

        
      </Routes>
    </BrowserRouter>
    // <>
    //   <Navbar/>
    //   <Banner/>
    //   <Movies/>
    //   {/* <WatchList/> */}
    // </>
    
  );
}

export default App;