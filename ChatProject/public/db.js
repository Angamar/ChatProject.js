import {Chatroom} from "./chat.js";
import {ChatUI} from "./ui.js"

//DOM elements

let chatList = document.querySelector('ul');
let body = document.querySelector('body');
let formUpdateColor = document.querySelector('#formUpdateColor');
let inputColor = document.querySelector('#inputColor');
let formNewMessage = document.querySelector('#formNewMessage');
let inputMessage = document.querySelector('#inputMessage');
let formUpdateUsername = document.querySelector('#formUpdateUsername');
let inputUsername = document.querySelector('#inputUsername');
let divUU = document.querySelector('#divUpdatedUsername');
let navRooms = document.querySelector('nav div');
let navButtons = document.querySelectorAll('nav button');
//Date filter elements
let inputDateStart = document.querySelector('#dateStart');
let inputDateEnd = document.querySelector('#dateEnd');
let formDate = document.querySelector('#formDate');


let selectedButton = (b) => {
    navButtons.forEach(b => {
        b.classList.remove("btn-selected");
    });
    b.classList.add('btn-selected');
}

let username = ( ) => {
    if (localStorage.username){
        //ako u lokalnoj memoriji postoji username
        return localStorage.username;
    } else {
        return "anonymus";
    }

}

let room = () => {
    let roomTmp = "general";
    if(localStorage.room){
        roomTmp = localStorage.room;
    }
    let btnTmp = document.querySelector(`#${roomTmp}`);
    btnTmp.click();
    selectedButton(btnTmp);
    return roomTmp;
}


let chatroom = new ChatUI(chatList);
let cr = new Chatroom(room(), username());
cr.getChats(data => chatroom.templateLI(data));

//Event listener za datum
formDate.addEventListener('submit', e => {
    e.preventDefault();
    chatroom.clear();
    cr.getChatsByDate((data) => {
        chatroom.templateLI(data);
    });

    formDate.reset();
});


//validacija










//BACKGROUND COLOR
//Setting the backgorund colour from local storage

if (localStorage.color){
    body.style.backgroundColor = localStorage.color;
} else {
    body.style.backgroundColor = 'white';
}

//Changing the background color on submit
formUpdateColor.addEventListener('submit', e => {
    e.preventDefault();
    let newColor = inputColor.value;
    localStorage.setItem('color', newColor); 
    setTimeout(()=>{body.style.backgroundColor = newColor}, 500);


});

//Sending a new message
formNewMessage.addEventListener('submit', e => {
    e.preventDefault();
    let textMessage = inputMessage.value;
    cr.addMessage(textMessage)
        .then(() => {formNewMessage.reset()})
        .catch(err => console.log(err))
});



//Promena korisničkog imena
formUpdateUsername.addEventListener('submit', e => {
    e.preventDefault();
    let newUsername = inputUsername.value;
    if (newUsername != ""){
            cr.updateUsername(newUsername);
            //shows temporary notification that the username is changed
            //FALI VALIDACIJA ZA TAB I SPACE
            divUU.innerHTML = `Your name was updated to <span id="spanNewUsername">${newUsername}</span>`;
            setTimeout(() => divUU.innerText="", 3000);
    } else {
        alert('Invalid username!');
    }

    formUpdateUsername.reset();

    room();


});

//Promena sobe
navRooms.addEventListener('click', e => {
    if(e.target.tagName == "BUTTON"){
        //clears messages from the previous room
        chatroom.clear();
        //change room by clicking the buttons
        let roomTmp = e.target.getAttribute('id');
        cr.updateRoom(roomTmp);
        cr.getChats(chat => chatroom.templateLI(chat));
        //update room in Local Storage
        localStorage.setItem(`room`,roomTmp);
        //selected class
        selectedButton(e.target);

    }
});


//cr.getChats(data => console.log(data));




//generating li elements with data

