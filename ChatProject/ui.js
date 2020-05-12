export class ChatUI {

    constructor(l){
        this.list = l;
    }

    set list(l){
        this._list = l;
    }

    get list(){
        return this._list;
    }

    templateLI(document){
        let htmlLI = `
            <li>
                <span class = "username">${document.username}</span>
                <span class = "message">${document.message}</span>
                <div class= "date">${document.created_at.toDate()}</div>
            </li>
        `
        this.list.innerHTML += htmlLI;
    }
}