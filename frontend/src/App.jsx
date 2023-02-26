import { useState, useRef, useEffect} from 'react';
import Banner from './components/Banner';
import Login from './components/Login/Login';
import './App.css';


function App() {
  const [bannerHeight, setBannerHeight] = useState(0)
  const banner = useRef(null);

  useEffect(() => {
    setBannerHeight(banner.current.clientHeight)
  }, [])
  return (
    <>
      <div className="App">
        <div className="Banner" ref={banner}>
          <Banner/>
        </div>
        <Login bannerHeight={bannerHeight} />
        <p>{console.log(bannerHeight)}</p>
      </div>
    </>
  )
}

export default App
