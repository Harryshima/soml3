let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');

let timer;
let index_no = 0;
let playing_song = false;

// Create Audio Element
let track = document.createElement('audio');
track.addEventListener('ended', next_song); //function to auto play next song

// All songs list
let All_song = [
    {
        name: "THE SHADE",
        path: "music/Song1.mp3",
        img: "images/rex.jpeg",
        singer: "Rex Orange County"
    },
    {
        name: "FEELS LIKE YOU",
        path: "music/Song2.mp3",
        img: "images/faime.jpeg",
        singer: "Faime"
    },
    {
        name: "SERENADE",
        path: "music/Song3.mp3",
        img: "images/diverseddie.jpg",
        singer: "Diverseddie"
    },
    {
        name: "We Don't Talk Anymore",
        path: "music/Song4.mp3",
        img: "images/img4.jpg",
        singer: "Charlie Puth"
    },
    {
        name: "Comethru",
        path: "music/Song5.mp3",
        img: "images/jeremy.jpg",
        singer: "Jeremy Zucker"
    }
];

// Function to load the track
function load_track(index_no) {
    clearInterval(timer);
    reset_slider();
    track.src = All_song[index_no].path;
    title.innerHTML = All_song[index_no].name;
    track_image.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    track.load();

     // Displaying duration
     track.addEventListener('loadedmetadata', function() {
        let duration = track.duration;
        let minutes = Math.floor(duration / 60);
        let seconds = Math.floor(duration % 60);
        show_duration.innerHTML = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    });


    total.innerHTML = All_song.length;
    present.innerHTML = index_no + 1;
    timer = setInterval(range_slider , 1000);
}
load_track(index_no);

// Checking whether the song is playing or not
function justplay(){
    if(playing_song==false){
        playsong();
    }else{
        pausesong();
    }
}

// Play song button
function playsong(){
    track.play();
    playing_song = true;
    play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

// Pause song button
function pausesong(){
    track.pause();
    playing_song = false;
    play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}

// Next song button
function next_song(){
    if(index_no < All_song.length - 1){
        index_no += 1;
        load_track(index_no);
        playsong();
    }else{
        index_no = 0;
        load_track(index_no);
        playsong();
    }
}

// Previous song button
function previous_song(){
    if(index_no > 0){
        index_no -= 1;
        load_track(index_no);
        playsong();
    }else{
        index_no = All_song.length - 1;
        load_track(index_no);
        playsong();
    }
}

// Change volume slider
function volume_change(){
    volume_show.innerHTML = recent_volume.value;
    track.volume = recent_volume.value / 100;
}

// Change slider position 
function change_duration(){
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}

// Function to mute sound (icon)
function mute_sound(){
    track.volume = 0;
    volume.value = 0;
    volume_show.innerHTML = 0;
}

// Reset slider
function reset_slider(){
    slider.value = 0;
}

function range_slider() {
    let position = 0;

    // Update slider position
    if (!isNaN(track.duration)) {
        position = track.currentTime * (100 / track.duration);
        slider.value = position;
    }

    // Calculate remaining time
    let totalSeconds = Math.floor(track.duration);
    let currentSeconds = Math.floor(track.currentTime);
    let remainingSeconds = totalSeconds - currentSeconds;

    // Format remaining time as mm:ss
    let minutes = Math.floor(remainingSeconds / 60);
    let seconds = remainingSeconds - minutes * 60;
    let remainingTime = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

    // Display remaining time
    remaining_duration.innerHTML = remainingTime;

    // Check if track has ended
    if (track.ended) {
        play.innerHTML = '<i class="fa fa-play"></i>';
        next_song(); //auto play next song
    }
}
