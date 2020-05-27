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

    //TRUE if message is from today
    dateToday(day, month, year){
        let today = new Date();
        let todayD = today.getDate();
        let todayM = today.getMonth() +1;
        let todayY = today.getFullYear();

        if(day==todayD && month==todayM && year==todayY){
            return true;
        } else {
            return false;
        }
    }

    formatDate(date){
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hour = date.getHours();
        let minute = date.getMinutes();

        let dd = String(day).padStart(2,"0");
        let mm = String(month).padStart(2,"0"); //dodaje 0 na pocetak stringa sve dok se ne dostigne duzina stringa 2
        let hh = String(hour).padStart(2, "0");
        let minmin = String(minute).padStart(2,"0");

        if (this.dateToday(day, month, year)){
            let strDate = `${hh}:${minmin}`;
            return strDate;
        } else {
            let strDate = `${dd}.${mm}.${year}. - ${hh}:${minmin}`;
            return strDate;    
        }
    }

    templateLI(document){

        let htmlLI = `<li`;
        if(document.username == localStorage.username){
            htmlLI += ` class="me">`;
        } else {
            htmlLI += `>`;
        }
        htmlLI += ` <span class="username">${document.username}</span>
                    <span class="message">${document.message}</span>
                    <div class="date">${this.formatDate(document.created_at.toDate())}
                    <img src="delete.png" id="delete"></div>

                </li>`;
        this.list.innerHTML += htmlLI;


        //skrolovanje u cetu na dno cet liste
        this.list.scrollTop = this.list.scrollHeight;


    }

    clear(){
        //<ul> listu iz konstruktora postavimo na praznu
        this.list.innerHTML = "";
    }
}