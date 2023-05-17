// const audio = document.querySelector('#audio');
// audio.autoplay = true;
// audio.currentTime = 40;
// setTimeout(() => {
//     console.log(audio.duration)
// }, 500);


const audio = document.querySelector('#audio');
// console.log(audio)

const playPauseBtn = document.getElementById('play-btn');
const play = document.getElementById('play');

const loop = document.getElementById('loop');
const progress = document.getElementById('progress');
const totalTime = document.getElementById('totalTime');
const current = document.getElementById('current');

playPauseBtn.addEventListener('click', ()=>{
    if(play.classList.contains('bi-play')){
        audio.play();
    }else if(play.classList.contains('bi-pause')){
        audio.pause();
    }

    play.classList.toggle('bi-play');
    play.classList.toggle('bi-pause');
})

loop.addEventListener('click', ()=>{
    loop.classList.toggle('green--color');
    if(loop.classList.contains('green--color')){
        audio.loop = true;
    }else{
        audio.loop = false;
    }

    // console.dir(audio);
})
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
}, 1000)


progress.onchange = function(){
    audio.currentTime = progress.value * fraction;
}