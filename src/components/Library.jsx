import React from 'react';
import LibrarySong from './LibrarySong';

function Library({songs, setCurrentSong}) {
    return (
        <div className='library'>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => <LibrarySong setCurrentSong={setCurrentSong} id={song.id}  songs={songs} key={song.id} song={song}/>)}
            </div>
        </div>
    );
}

export default Library;