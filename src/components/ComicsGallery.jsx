import { useState, useEffect } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; 

export default function ComicsGallery( { onComicSelect }) {
    const hash = '1d2b2b301652b8c5eec0c58ef93fdb23'; 
    const publicKey = 'daf26a73ed58359b4a772c4b26a21865'; 
    const ts = 1; 

    const [data, setData] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [index, setIndex] = useState(0);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const searchComics = (searchData) => {
        //&orderBy=-onsaleDate no funciona para traer los más recientes
        const url = `https://gateway.marvel.com/v1/public/comics?apikey=${publicKey}&ts=${ts}&hash=${hash}&orderBy=-onsaleDate${searchData ? `&title=${encodeURIComponent(searchData)}` : ''}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(comics => {
            console.log("Data:", comics);
            if (comics && comics.data && comics.data.results) {
                setData(comics.data.results);
            } else {
                console.warn("Unexpected data structure:", comics);
                setData([]);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
    }

    useEffect(() => {
        searchComics(inputValue);

        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    const search = () => {
        searchComics(inputValue);
        setIndex(0);
    };

    const toggleHeart = (i) => {
        setFavorites((prevFavorites) => {
            const isFavorited = prevFavorites.includes(i);
            let updatedFavorites;

            if (isFavorited) {
                updatedFavorites = prevFavorites.filter((favIndex) => favIndex !== i);
            } else {
                updatedFavorites = [...prevFavorites, i];
            }

            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

            return updatedFavorites;
        });
    };

    const viewFavorites = () => {
        setShowFavoritesOnly(true);
    };

    const viewAllComics = () => {
        setShowFavoritesOnly(false);
    };

    return (
        <div id='comics-gallery'>
            <div id='buttons-bar'>
                <button onClick={() => viewFavorites()}>Show Favorites</button>
                <button onClick={() => viewAllComics()}>Show All Comics</button>
                <div id='search-bar'>
                    <input 
                        id='searchInput'
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Search by title..."
                    />
                    <button onClick={search}>Search</button>
                </div>
            </div>
            {data.length > 0 && (
                <div id='comics'>
                    {(showFavoritesOnly ? favorites : data.map((_, i) => i)).map((comicIndex) => {
                        const comic = data[comicIndex];
                        return (
                            <div key={comicIndex} className='comic-card'>
                                <div id='clickable-comic' onClick={() => onComicSelect(comic)}>
                                    <h4>{comic.title}</h4>
                                    <img
                                        className='comic-image'
                                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                        alt={comic.title}
                                    />
                                </div>
                                <div className='favourites' id={`favourite-${comicIndex}`}>
                                    {favorites.includes(comicIndex) ? (
                                        <AiFillHeart
                                            id={`heart-fill-${comicIndex}`}
                                            onClick={() => toggleHeart(comicIndex)}
                                            style={{ cursor: 'pointer', color: 'red' }}
                                        />
                                    ) : (
                                        <AiOutlineHeart
                                            id={`heart-outline-${comicIndex}`}
                                            onClick={() => toggleHeart(comicIndex)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
