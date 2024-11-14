import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import ComicsGallery from './components/ComicsGallery'
import ComicDetails from './components/ComicDetails'

function App() {
  const [selectedComic, setSelectedComic] = useState(null);

  const handleComicSelect = (comic) => {
    setSelectedComic(comic);
  }

  const handleBackToGallery = () => {
    setSelectedComic(null);
  }

  return (
    <>
      <NavBar/>
      {selectedComic ? (<ComicDetails comic={selectedComic} onBack={handleBackToGallery} />
      ) : (
        <ComicsGallery onComicSelect={handleComicSelect} />
      )}
    </>
  )
}

export default App
