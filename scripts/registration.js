addEventListener("DOMContentLoaded", function(){
    document.querySelector("#addUserBtn").addEventListener("click", addUser)
})



//add the song to the database.. it has to be async function because we are calling data outside our server

async function addUser(){
    //create a song object based on the form that the user fills out. This will make it easier when we send the data to the backend
    const user = {
        username: document.querySelector("#username").value,
        password: document.querySelector("#password").value,
        status: "online",

    }

    const response = await fetch("http://localhost:3000/api/user",{
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(user)
    })

    if(response.ok){
        const results = await response.json()
        alert("Added user")

        //reset the form after the song is successfully added
        document.querySelector("form").reset()
    }

    else{
        document.querySelector("#error").innerHTML = "Cannot add user"
    }
}