// we are going to make an event listener that will trigger when the DOM is loaded (aka visiting webpage)
window.addEventListener("DOMContentLoaded", async function () {
    const response = await fetch("http://localhost:3000/api/songs");
    const songs = await response.json();

    let html = "";
    for (let song of songs) {
        html += `<li>${song.title} - ${song.artist}</li>`;
    }

    document.querySelector("#addedsong").innerHTML = html;
});
