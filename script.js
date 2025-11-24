//we are going to make an event listener that will trigger when the DOM is loaded (aka visiting webpage)
addEventListener("DOMContentLoaded",  async function(){
    const response = await this.fetch("http://localhost:3000/api/songs")
    const songs = await response.json()

    let html = ""
    for (let song of songs){
        html=+`<li>${song.title} - ${song.artst}</li>`
    }

    document.querySelector("#addedsong").innerHTML = html
})