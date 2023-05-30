class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.kickSound = document.querySelector(".kick-sound");
    this.hihatSound = document.querySelector(".hihat-sound");
    this.snareSound = document.querySelector(".snare-sound");
    this.currentKick = "./sounds/kick-classic.wav";
    this.currentSnare = "./sounds/snare-acoustic01.wav";
    this.currenthHihat = "./sounds/hihat-acoustic01.wav";
    this.playbtn = document.querySelector(".play");
    this.selects = document.querySelectorAll("select");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.muteBtns = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
  }
  activePad() {
    this.classList.toggle("active");
  }
  repeat() {
    let step = this.index % 8;
    const activepads = document.querySelectorAll(`.b${step}`);
    console.log(activepads);
    activepads.forEach((bar) => {
      bar.style.animation = "playTrack 0.3s alternate ease-in-out 2";
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickSound.currentTime = 0;
          this.kickSound.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareSound.currentTime = 0;
          this.snareSound.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatSound.currentTime = 0;
          this.hihatSound.play();
        }
      }
    });
    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
      // console.log(this.isPlaying);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
      // console.log(this.isPlaying);
    }
  }
  updateBtn() {
    if (!this.isPlaying) {
      this.playbtn.innerText = "Stop";
      this.playbtn.classList.add("active");
    } else {
      this.playbtn.innerText = "Play";
      this.playbtn.classList.remove("active");
    }
  }
  changeSound(e) {
    const selectName = e.target.name;
    const selectValue = e.target.value;
    console.log(selectValue);
    switch (selectName) {
      case "kick-select":
        this.kickSound.src = selectValue;
        break;
      case "snare-select":
        this.snareSound.src = selectValue;
        break;
      case "hihat-select":
        this.hihatSound.src = selectValue;
        break;
    }
  }
  mute(e) {
    const index = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      if (index == "0") {
        this.kickSound.volume = 0;
      } else if (index == "1") {
        this.snareSound.volume = 0;
      } else if (index == "2") {
        this.hihatSound.volume = 0;
      }
    } else {
      if (index == "0") {
        this.kickSound.volume = 1;
      } else if (index == "1") {
        this.snareSound.volume = 1;
      } else if (index == "2") {
        this.hihatSound.volume = 1;
      }
    }
  }
  changeTempo(e) {
    const tempoText = document.querySelector(".tempo-nr");
    tempoText.innerText = e.target.value;
  }
  updateTempo(e) {
    this.bpm = e.target.value;
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const play = document.querySelector(".play");
    if (play.classList.contains("active")) {
      this.start();
    }
  }
}
const drumkit = new DrumKit();
drumkit.playbtn.addEventListener("click", () => {
  drumkit.updateBtn();
  drumkit.start();
});

drumkit.pads.forEach((pad) => {
  pad.addEventListener("click", drumkit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumkit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumkit.changeSound(e);
  });
});

drumkit.muteBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    drumkit.mute(e);
  });
});

drumkit.tempoSlider.addEventListener("input", function (e) {
  drumkit.changeTempo(e);
});
drumkit.tempoSlider.addEventListener("change", function (e) {
  drumkit.updateTempo(e);
});
