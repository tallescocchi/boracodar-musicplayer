let songs = [
  {
    title: 'Over You',
    artist: 'Chris Daughtry',
    musicUrl: './assets/music/Daughtry - Over You (320 kbps).mp3',
    musicImg: './assets/images/chrisdaughtry.jpeg'
  },
  {
    title: 'Light On',
    artist: 'David Cook',
    musicUrl: './assets/music/David Cook - Light On (320 kbps).mp3',
    musicImg: './assets/images/davidcook.jpeg'
  },
  {
    title: "Won't Let Go",
    artist: 'Fivefold',
    musicUrl: "./assets/music/FiveFold - Won't Let Go [LEGENDADO] (320 kbps).mp3",
    musicImg: './assets/images/fivefold.jpeg'
  }
]

let music = document.querySelector('audio')
let indexMusic = 0
let image = document.querySelector('.player img')
let musicName = document.querySelector('.player-description h2')
let bandName = document.querySelector('.player-description i')

renderMusic(indexMusic)

function renderMusic(index) {
  music.setAttribute('src', songs[index].musicUrl)
  music.addEventListener('loadeddata', () => {
    musicName.textContent = songs[index].title
    bandName.textContent = songs[index].artist
    image.src = songs[index].musicImg

    duration()

    document.querySelector('.button-play').style.display = 'block'
    document.querySelector('.button-pause').style.display = 'none'
  })
}

function duration() {
  let musicDuration = document.querySelector('.end')
  
  musicDuration.textContent = secondsForMinutes(Math.floor(music.duration))
}

function playMusic() {
  music.play()

  document.querySelector('.button-pause').style.display = 'block'
  document.querySelector('.button-play').style.display = 'none'
}

function pauseMusic() {
  music.pause()

  document.querySelector('.button-play').style.display = 'block'
  document.querySelector('.button-pause').style.display = 'none'
}

function updateBar() {
  let bar = document.querySelector('progress')

  bar.style.width = Math.floor((music.currentTime / music.duration) * 100) + '%'

  let elapsedTime = document.querySelector('.initial')

  elapsedTime.textContent = secondsForMinutes(Math.floor(music.currentTime))
}

function secondsForMinutes(seconds) {
  let minutesField = Math.floor(seconds / 60)
  let secondsField = seconds % 60

  if(secondsField < 10){
    secondsField = '0' + secondsField
  }
  return minutesField + ':' + secondsField
}

document.querySelector('.button-play').addEventListener('click', playMusic)

document.querySelector('.button-pause').addEventListener('click', pauseMusic)

music.addEventListener('timeupdate', updateBar)

document.querySelector('.button-last').addEventListener('click', () => {
  indexMusic--
  if(indexMusic < 0){
    indexMusic = 2
  }
  renderMusic(indexMusic)
})

document.querySelector('.button-next').addEventListener('click', () => {
  indexMusic++
  if(indexMusic > 2){
    indexMusic = 0
  }
  renderMusic(indexMusic)
})


