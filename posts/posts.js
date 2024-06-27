/* Posts Page JavaScript */

"use strict";
function like(postId){
    fetch(apiBaseURL + "/api/likes", {
        method: "POST",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.token
        },
        body: JSON.stringify({
            postId: postId
        })
    }).then(response => {
        console.log(response);
        location = "/posts/";  //force refresh
    });
}

buttonPostMessage.addEventListener("click", e => {
    fetch(apiBaseURL + "/api/posts", {
        method: "POST",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.token
        },
        body: JSON.stringify({
            text: messageElement.value
        })
    }).then(response => {
        console.log(response);
        location = "/posts/";  //force refresh
    });
});

function getMessage(message) {
    return /*html*/`
    <div class="message">
        <h1>${message.text}</h1>
        <div class="username">${message.username}</div>
        <div class="createdAt">${message.createdAt}</div>
        <div class="ID:">${message._id}</div>
        <div class="Likes:">${message.likes.length} Likes 
            <button onclick="like('${message._id}')">Like</button>
        </div>
    </div>
    <hr>`;
}
function showMessages(messages) {
    if(messages.hasOwnProperty("message")){
        location = "/";
        return;
    }
    messagesOutput.innerHTML = messages.map(getMessage).join("");
}

fetch(apiBaseURL + "/api/posts", {
    method: "GET",
    // mode: "no-cors", // cors, no-cors, *cors, same-origin
    // credentials: "omit", // include, *same-origin, omit
    headers: { Authorization: `Bearer ${localStorage.token}` }
}).then(response => {
    if (response.statusCode >= 400) {
        console.log(response);
        location = "/";
    }
    return response.json()
}).then(data=>{
    showMessages(data);
});