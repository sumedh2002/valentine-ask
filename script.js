// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Click Envelope

envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout( () => {
        document.querySelector(".letter-window").classList.add("open");
        // Play background music when the envelope is opened (user gesture)
        try{ playMusic(); }catch(e){}
    },50);
});

// Logic to move the NO btn

noBtn.addEventListener("mouseover", () => {
    const min = 200;
    const max = 200;

    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// Logic to make YES btn to grow

// let yesScale = 1;

// yesBtn.style.position = "relative"
// yesBtn.style.transformOrigin = "center center";
// yesBtn.style.transition = "transform 0.3s ease";

// noBtn.addEventListener("click", () => {
//     yesScale += 2;

//     if (yesBtn.style.position !== "fixed") {
//         yesBtn.style.position = "fixed";
//         yesBtn.style.top = "50%";
//         yesBtn.style.left = "50%";
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }else{
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }
// });

// YES is clicked

yesBtn.addEventListener("click", () => {
    title.textContent = "Yay! I love you my love <3";

    catImg.src = "cat_dance.gif";

    document.querySelector(".letter-window").classList.add("final");

    buttons.style.display = "none";

    finalText.style.display = "block";
});

// --- Background music (Spotify embed) ---
const spotifyInput = document.getElementById('spotify-url');
const savePlayBtn = document.getElementById('save-play');
const playBtn = document.getElementById('play-btn');
const stopBtn = document.getElementById('stop-btn');
const message = document.getElementById('music-message');
const playerWrap = document.getElementById('spotify-player-wrap');
const iframe = document.getElementById('spotify-embed');

function extractSpotifyId(url){
    if(!url) return null;
    const m = url.match(/track\/([A-Za-z0-9]+)(\?|$)/);
    return m ? m[1] : null;
}

function makeEmbedUrl(id, autoplay = false){
    if(!id) return '';
    // Note: autoplay on Spotify embed may be blocked by browsers.
    let u = `https://open.spotify.com/embed/track/${id}`;
    if(autoplay) u += '?autoplay=1';
    return u;
}

function saveSpotifyUrl(url){
    try{ localStorage.setItem('spotifyUrl', url); }catch(e){}
}

function loadSaved(){
    const url = localStorage.getItem('spotifyUrl');
    if(url){
        spotifyInput.value = url;
        message.textContent = 'Saved track ready.';
    } else if (spotifyInput && spotifyInput.value){
        // If the input has a default value (from HTML), persist it so future visits remember it
        try{
            localStorage.setItem('spotifyUrl', spotifyInput.value);
            message.textContent = 'Saved track ready.';
        }catch(e){ }
    }
}

function playMusic(){
    const url = spotifyInput.value || localStorage.getItem('spotifyUrl');
    if(!url){ message.textContent = 'Paste a Spotify track URL first.'; return; }
    const id = extractSpotifyId(url);
    if(!id){ message.textContent = 'Invalid Spotify track URL.'; return; }
    iframe.src = makeEmbedUrl(id, true);
    playerWrap.style.display = 'block';
    saveSpotifyUrl(url);
    message.textContent = 'Playing (autoplay may be blocked; click Play if needed).';
}

function stopMusic(){
    iframe.src = '';
    playerWrap.style.display = 'none';
    message.textContent = 'Stopped.';
}

savePlayBtn.addEventListener('click', playMusic);
playBtn.addEventListener('click', () => {
    // This user click satisfies gesture requirement in most browsers
    playMusic();
});
stopBtn.addEventListener('click', stopMusic);

document.addEventListener('DOMContentLoaded', loadSaved);
