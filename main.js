// const audio = document.querySelector('#audio');
// audio.autoplay = true;
// audio.currentTime = 40;
// setTimeout(() => {
//     console.log(audio.duration)
// }, 500);

// *********************************************************
// *********************************************************
//All Seclector
const audio = document.querySelector('#audio');
// console.log(audio)

const playPauseBtn = document.getElementById('play-btn');
const play = document.getElementById('play');

const loop = document.getElementById('loop');
const progress = document.getElementById('progress');
const totalTime = document.getElementById('totalTime');
const current = document.getElementById('current');


const songTitle = document.getElementById('song-title');
const songImage = document.querySelector('.img');


const next = document.getElementById('next');
const prev = document.getElementById('prev');


// *********************************************************
// *********************************************************
// for selecting song from musicData

function selectSong(i){
    songTitle.innerText = musicData[i].musicTitle;
    songImage.style.backgroundImage = `url(${musicData[i].musicImageUrl})`;
    audio.src = `${musicData[i].musicUrl}`;
}

let songNo = 0;

//default songNo
selectSong(songNo);

next.addEventListener('click', ()=>{
    if(songNo >= musicData.length - 1) return;
    songNo ++;
    selectSong(songNo);

    if(play.classList.contains('bi-pause')){
        play.classList.add('bi-play');
        play.classList.remove('bi-pause');
    }
})

prev.addEventListener('click', ()=>{
    if(songNo <= 0) return;

    songNo --;
    selectSong(songNo);

    if(play.classList.contains('bi-pause')){
        play.classList.add('bi-play');
        play.classList.remove('bi-pause');
    }
})


// *********************************************************
// for adding play and pause function
playPauseBtn.addEventListener('click', ()=>{
    if(play.classList.contains('bi-play')){
        audio.play();
    }else if(play.classList.contains('bi-pause')){
        audio.pause();
    }

    play.classList.toggle('bi-play');
    play.classList.toggle('bi-pause');
})

// *********************************************************
// for add loop a single music
loop.addEventListener('click', ()=>{
    loop.classList.toggle('green--color');
    if(loop.classList.contains('green--color')){
        audio.loop = true;
    }else{
        audio.loop = false;
    }
})

// *********************************************************
// traking time and progress bar
let songDuration, fraction;

function findingDuration(){
    songDuration = audio.duration;
    fraction = songDuration / 100;
    // console.log(songDuration)
}

 function timeConvert(totalSec){
    const min = Math.floor(totalSec / 60);
    const sec = Math.floor(totalSec % 60);
    let stringSec = '' + sec;
    let stringMin = '' + min;

    if(min < 10){
        stringMin = `0${min}`;
    }

    if(sec < 10){
        stringSec = `0${sec}`;
    }

    return `${stringMin}:${stringSec}`;
 }

// setTimeout(()=>{
    // findingDuration();
    // totalTime.innerText = timeConvert(songDuration);
// }, 1000)

// currentTime
setInterval(()=>{
    findingDuration();
    totalTime.innerText = timeConvert(songDuration);
    progress.value = audio.currentTime/fraction;
    current.innerText = timeConvert(audio.currentTime);



    //for adding loop function with multiple music
    if(!audio.loop){
        if(progress.value == 100){
            if(songNo >= musicData.length - 1) return;
            songNo ++;
            selectSong(songNo);
            audio.play();
        }
    }

    if(progress.value > 99){
        play.classList.remove('bi-pause');
        play.classList.add('bi-play');
    }

    //sync with the paly music with palyBtn
    if(audio.paused){
        play.classList.add('bi-play');
        play.classList.remove('bi-pause');
    }else{
        play.classList.remove('bi-play');
        play.classList.add('bi-pause');
    }


}, 1000)


progress.onchange = function(){
    audio.currentTime = progress.value * fraction;
}

// *********************************************************
// *********************************************************