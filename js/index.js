const cards = document.querySelector(".cards .row");
const imgUrls = ["./image/dog.jpg", "./image/baran.jpg", "./image/indyuk.jpg", "./image/cow.jpg", "./image/loshad.jpg", "./image/petux.jpg"]
const titles = ["Dog", "Sheep", "Turkey", "Cow", "Horse", "Rooster"]
const sounds = ["./sounds/dog.mp3", "./sounds/sheep.mp3", "./sounds/turkey.mp3", "./sounds/cow.mp3", "./sounds/horse.mp3", "./sounds/rooster.mp3"]
let shapeColor = "#0d6efd";

class Card {
    constructor(card) {
        this.imgSrc = card.src;
        this.imgShapeColor = card.imgShapeColor;
        this.title = card.title
        this.borderRadius = card.borderRadius;
        this.backgroundColor = card.backgroundColor;
    }
    render() {
        let newCard = document.createElement("div");
        newCard.innerHTML = `
        <div style="border-radius: ${this.borderRadius}; background-color: ${this.backgroundColor}" class="card">
            <div class="card__imgbox">
                <img src="${this.imgSrc}" alt="image" class="card__img">
                <div style="background-color: ${this.imgShapeColor};" class="card__img-shape"></div>
            </div>
            <h1 class="card__title text-center">${this.title} </h1>
            <div class="card__btns">
                <div class="card__play-btn d-flex align-items-center">
                    <button class="btn fs-3 btn-danger" id="play">
                        Play
                        <div class="badge">
                            <i class="fas fa-play"></i>
                        </div>
                    </button>
                </div>
              <div class="volume-range">
              <input type="range" min="0" max="10" value="8" class="card__volume"></div>
            </div>
        </div>
        `
        newCard.classList.add("col-12","col-xxl-4","col-xl-4","col-lg-6","col-md-6","col-sm-12");
        cards.append(newCard)
    }
}
for (let i = 0; i < imgUrls.length; i++) {
    const cardAnimal = new Card({
        src: imgUrls[i],
        imgShapeColor: shapeColor,
        title: titles[i],
        borderRadius: "15px",
        backgroundColor: "#fff"
    }).render()
}
const volumes = document.querySelectorAll(".card__volume")
const btns = document.querySelectorAll("#play");
btns.forEach((btn, index) => {
    const audio = new Audio(sounds[index]);
    volumes.forEach((volume)=>{
        volume.addEventListener("input",()=>{
            audio.volume = volume.value/10;
        })
    })
    btn.addEventListener("click", () => {
        for(let i=0; i<btns.length;i++){
            if(i == index){
                continue
            }else{
                btns[i].innerHTML = `
                Play
                <div class="badge">
                    <i class="fas fa-play"></i>
                </div>
                `
                pause(audio)
                  btns[i].classList.add("btn-danger")
            }
        }
        let btnContent = btn.textContent.trim();
        if (btnContent == "Play") {
            btn.innerHTML = `
            Pause
            <div class="badge">
                <i class="fas fa-pause"></i>
            </div>
          `
          play(audio)
            btn.classList.replace("btn-danger", "btn-primary");
        } else if (btnContent == "Pause") {
            btn.innerHTML = `
          Play
          <div class="badge">
              <i class="fas fa-play"></i>
          </div>
          `
          pause(audio)
            btn.classList.add("btn-danger")
        }
    })
})
function play(audio) {
    audio.play()
}
function pause(audio) {
    audio.pause()
}