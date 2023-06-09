import { formatTime } from './utils.js';

export default class AudioPlayer {
  constructor(parent) {
    this.audio = new Audio();
    this.controlButton = parent.querySelector('.controls');
    this.volumeButton = parent.querySelector('.volume');
    this.progressBar = parent.querySelector('.progress-bar');
    this.progressBarFiller = parent.querySelector('.progress-bar__filler');
    this.durationBlock = parent.querySelector('.duration');
    this.currentTimeBlock = parent.querySelector('.current-time');
    this.volumeSlider = parent.querySelector('.volume-slider');
    this.volumeSliderScaleContainer = parent.querySelector('.slider-scale-container');
    this.volumeSliderScale = parent.querySelector('.slider-scale');

    this.audio.addEventListener('loadedmetadata', () => {
      this.durationBlock.textContent = formatTime(this.audio.duration);
    });

    this.controlButton.addEventListener('click', () => {
      this.togglePlay();
    });

    this.volumeButton.addEventListener('click', () => {
      this.toggleMute();
    });

    this.audio.addEventListener('ended', () => {
      this.controlButton.setAttribute('src', './assets/images/play.svg');
    });

    this.volumeSlider.addEventListener('click', (e) => {
      let volume = (100 + 5 - e.offsetX);
      volume = volume < 6 ? 0 : volume > 94 ? 100 : volume;
      this.volumeSliderScale.style.width = `${volume}%`;
      this.audio.volume = volume / 100;

      if (this.audio.volume === 0) {
        this.volumeButton.src = './assets/images/mute.svg';
      } else {
        this.volumeButton.src = './assets/images/volume.svg';
        this.audio.muted = false;
      }
    });
  }

  togglePlay() {
    if (this.audio.paused) {
      this.controlButton.setAttribute('src', './assets/images/pause.svg');
      this.audio.play();
    } else {
      this.controlButton.setAttribute('src', './assets/images/play.svg');
      this.audio.pause();
    }
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.controlButton.setAttribute('src', './assets/images/play.svg');
  }

  toggleMute() {
    if(this.audio.muted) {
      this.audio.muted = false;
      this.volumeButton.src = './assets/images/volume.svg'
    } else {
      this.audio.muted = true;
      this.volumeButton.src = './assets/images/mute.svg'
    }
  }

  updateProgress() {
    const time = Math.floor(this.audio.currentTime / this.audio.duration * 100);
    this.progressBarFiller.style.width = `${time}%`;
    this.currentTimeBlock.textContent = formatTime(this.audio.currentTime); 


    setTimeout(() => this.updateProgress(), 100);
  }
  
  init(src) {
    this.controlButton.setAttribute('src', './assets/images/play.svg');
    this.audio.src = src;
    this.currentTimeBlock.textContent = formatTime(this.audio.currentTime);
    this.updateProgress();
  }
}