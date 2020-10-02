const background = document.querySelector('#background'); // background derived from album cover below
const thumbnail = document.querySelector('#thumbnail'); // album cover 
const song = document.querySelector('#song'); // audio object

const songArtist = document.querySelector('.song-artist'); // element where track artist appears
const songTitle = document.querySelector('.song-title'); // element where track title appears
const progressBar = document.querySelector('#progress-bar'); // element where progress bar appears
let pPause = document.querySelector('#play-pause'); // element where play and pause image appears

songIndex = 0;
songs = ['songs/04 - Ammukutti.mp3','songs/Kal Ho Naa Ho - Shahrukh Khan.mp3','songs/08 - Hey Aasmaan.mp3','songs/02 - Hoyna Hoyna.mp3','songs/04 - Gangu Leader.mp3','songs/Koi-Mil-Gaya.mp3','songs/Tum_Se_Hi.mp3']; // object storing paths for audio objects
thumbnails = ['images/ammukutti.jpg','images/kal ho na hoo.jpg',"images/ammukutti.jpg",'images/Hoyna.jpg',"images/gangulead.jpg",'images/koi-mil-gaya.jpg',"images/tum se hi.jpg"]; // object storing paths for album covers and backgrounds
songArtists = ['HemaChandra','Sonu Nigam', 'chandra varma', 'Aravind','Aravindacharya','Udit Narayan', 'Mohit Chauhan']; // object storing track artists
songTitles = [ 'Ammukutti',"Kal ho naa ho","Hey Aasmaan","Hoyna Hoyna","Gangu Leader","Koi mil gaya","tum se hi"]; // object storing track titles

// function where pp (play-pause) element changes based on playing boolean value - if play button clicked, change pp.src to pause button and call song.play() and vice versa.
let playing = true;
function playPause() {
    if (playing) {
        const song = document.querySelector('#song'),
        thumbnail = document.querySelector('#thumbnail');

        pPause.src = "images/pause.png"
        thumbnail.style.transform = "scale(1.15)";
        
        song.play();
        playing = false;
    } else {
        pPause.src = "images/play.png"
        thumbnail.style.transform = "scale(1)"
        
        song.pause();
        playing = true;
    }
}

// automatically play the next song at the end of the audio object's duration
song.addEventListener('ended', function(){
    nextSong();
});

// function where songIndex is incremented, song/thumbnail image/background image/song artist/song title changes to next index value, and playPause() runs to play next track 
function nextSong() {
    songIndex++;
    if (songIndex >= songs.length) {
        songIndex = 0;
    };
    song.src = songs[songIndex];
    thumbnail.src = thumbnails[songIndex];
    background.src = thumbnails[songIndex];

    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];
   
    playing = true;
    playPause();
}

// function where songIndex is decremented, song/thumbnail image/background image/song artist/song title changes to previous index value, and playPause() runs to play previous track 
function previousSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length-1;
    };
    song.src = songs[songIndex];
    thumbnail.src = thumbnails[songIndex];
    background.src = thumbnails[songIndex];

    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];

    playing = true;
    playPause();
}

// update progressBar.max to song object's duration, same for progressBar.value, update currentTime/duration DOM
function updateProgressValue() {
    progressBar.max = song.duration;
    progressBar.value = song.currentTime;
    document.querySelector('.currentTime').innerHTML = (formatTime(Math.floor(song.currentTime)));
    if (document.querySelector('.durationTime').innerHTML === "NaN:NaN") {
        document.querySelector('.durationTime').innerHTML = "0:00";
    } else {
        document.querySelector('.durationTime').innerHTML = (formatTime(Math.floor(song.duration)));
    }
};

// convert song.currentTime and song.duration into MM:SS format
function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10){ 
        sec  = `0${sec}`;
    };
    return `${min}:${sec}`;
};

// run updateProgressValue function every 1/2 second to show change in progressBar and song.currentTime on the DOM
setInterval(updateProgressValue, 500);

// function where progressBar.value is changed when slider thumb is dragged without auto-playing audio
function changeProgressBar() {
    song.currentTime = progressBar.value;
};