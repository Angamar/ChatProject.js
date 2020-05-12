import {Chatroom} from "./chat.js";
import {ChatUI} from "./ui.js"

let cr = new Chatroom("Aleksa", "Poruka");

cr.getChats(data => console.log(data));
cr.updateRoom('general');

let chatList = document.querySelector('ul');
let chatroom = new ChatUI(chatList);
cr.getChats(data => chatroom.templateLI(data));