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
const mute = document.getElementById('mute');
const replay = document.getElementById('replay');


const progress = document.getElementById('progress');
const totalTime = document.getElementById('totalTime');
const current = document.getElementById('current');


const songTitle = document.getElementById('song-title');
const songImage = document.querySelector('.img');


const next = document.getElementById('next');
const prev = document.getElementById('prev');


// for list window
const listBtn = document.querySelector('.list-btn');
const listBtnClose = document.querySelector('#x');
const listWindow = document.querySelector('.listWindow');

const songListHolder = document.querySelector('.song-list');


// *********************************************************
// all variables
let songNo = 0;

// *********************************************************
// for importent object to add features
const replayList = {
    status: false,
}

// function to handel replay
function repalyHandel(){
        songNo = 0;
        selectSong(songNo);
        audio.play();
}


// *********************************************************
// for selecting song from musicData

function selectSong(i){
    songTitle.innerText = musicData[i].musicTitle;
    songImage.style.backgroundImage = `url(${musicData[i].musicImageUrl})`;
    audio.src = `${musicData[i].musicUrl}`;
}

//default songNo
selectSong(songNo);

next.addEventListener('click', ()=>{
    if(songNo >= musicData.length - 1) return;

    songNo ++;
    selectSong(songNo);
    audio.play();

    if(play.classList.contains('bi-pause')){
        play.classList.add('bi-play');
        play.classList.remove('bi-pause');
    }
})

prev.addEventListener('click', ()=>{
    if(songNo <= 0) return;

    songNo --;
    selectSong(songNo);
    audio.play();

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
//extra features --------------------
// for add loop a single music
loop.addEventListener('click', ()=>{
    loop.classList.toggle('green--color');
    if(loop.classList.contains('green--color')){
        audio.loop = true;
    }else{
        audio.loop = false;
    }
})

replay.addEventListener('click', ()=>{
    replay.classList.toggle('green--color');
    if(replay.classList.contains('green--color')){
        replayList.status = true;
    }else{
        replayList.status = false;
    }
})


mute.addEventListener('click', ()=>{
    mute.classList.toggle('bi-volume-mute-fill')
    mute.classList.toggle('bi-volume-up-fill')

    if(mute.classList.contains('bi-volume-mute-fill')){
        audio.muted = true;
    }else if(mute.classList.contains('bi-volume-up-fill')){
        audio.muted = false;
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

// currentTime
setInterval(()=>{

    findingDuration();
    totalTime.innerText = timeConvert(songDuration);
    progress.value = audio.currentTime/fraction;
    current.innerText = timeConvert(audio.currentTime);

    

    //for adding loop function with multiple music
    if(!audio.loop){
        if(progress.value == 100){
            //for handeling replay
            if(songNo == musicData.length - 1){
                if(replayList.status){
                    repalyHandel();
                    return;
                }
            }

            //for handeling next song
            if(songNo >= musicData.length - 1) return;
            songNo ++;
            selectSong(songNo);
            audio.play();
        }

    }
    


    //sync with the paly music with palyBtn
    if(audio.paused){
        play.classList.add('bi-play');
        play.classList.remove('bi-pause');
    }else{
        play.classList.remove('bi-play');
        play.classList.add('bi-pause');
    }


    if(Math.floor(audio.currentTime) > Math.floor(audio.duration) - 2){

        play.classList.remove('bi-pause');
        play.classList.add('bi-play');
    }  


}, 1000)


progress.addEventListener('change',()=>{
    audio.currentTime = progress.value * fraction;
})

// *********************************************************
// *********************************************************

// for window of list of songs
listBtn.addEventListener('click', ()=>{
    listWindow.classList.remove('display--none');
})

listBtnClose.addEventListener('click', ()=>{
    listWindow.classList.add('display--none');
})

function playTheSong(ele){
    songNo = + ele.currentTarget.dataset.no

    selectSong(songNo);
    audio.play();
    listWindow.classList.add('display--none');
}

// songListHolder
musicData.forEach((ele, index)=>{
    const songDiv = document.createElement('div'); //creating element for songdata to hold
    songDiv.classList.add('song');

    songDiv.setAttribute('data-no', `${index}`); //for adding data of index

    // ************** for image in list
    const imgHolder = document.createElement('div');
    imgHolder.classList.add('list-img-holder');

    const img = document.createElement('img');
    img.src = ele.musicImageUrl;
    img.classList.add('list-img');

    imgHolder.appendChild(img);
    // **************

    // ************** for song info in list
    const infoHolder = document.createElement('div');

    const titleH3 = document.createElement('h3');
    titleH3.id = 'song-title';
    titleH3.innerText = ele.musicTitle;

    const para = document.createElement('p');
    para.innerText = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum, eum.';

    infoHolder.appendChild(titleH3);
    infoHolder.appendChild(para);
    // **************

    songDiv.appendChild(imgHolder);
    songDiv.appendChild(infoHolder);

    songDiv.addEventListener('click', playTheSong);

    songListHolder.appendChild(songDiv);
})

// *********************************************************
// *********************************************************