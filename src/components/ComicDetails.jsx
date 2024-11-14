import React from 'react';

export default function ComicDetails({ comic, onBack }) {

    console.log(comic, comic.characters.items[0].name);

    return (
        <div id='comic-details'>
            <button onClick={onBack}>Back to Gallery</button>
            <div id='comic-info'>
                <h1>{comic.title}</h1>
                <div id='detailed-comic'>
                    <img
                        id='detailed-comic-image'
                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                        alt={comic.title}
                    />
                    <p id='detailed-comic-description'>{comic.description || "No description available."}</p>
                    <div id='detailed-comic-characters'>
                        <h2>Characters Featured:</h2>
                        <ul>
                            {comic.characters.items.map((character, index) => (
                                <li key={index}>{character.name}</li>
                            ))}
                        </ul>
                    </div>                                           
                </div>
            </div>
        </div>
    );
}