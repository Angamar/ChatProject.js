export class Chatroom {

    //constructor
    //koja osoba kreira razgovor i u kojoj sobi se kreira razgovor
    constructor(r, u){
        this.room = r;
        this.username = u;
        this.messages = db.collection('chat');
        this.unsub;
    }

    //setters
    set room(r){
        this._room = r;
    }

    set username(u){
        this._username = u;
    }
    //getters
    get room(){
        return this._room;
    }

    get username(){
        return this._username;
    }


    //promea korisnickog imena
    updateUsername(newUsername){
        this.username = newUsername;
        localStorage.setItem('username', newUsername); //stavlja ga u lokalnu memoriju
    }

    //promena kanala
    updateRoom(newRoom){
        this.room = newRoom;
        console.log("Promena sobe!");
        if(this.unsub){
            this.unsub();
        }
    }

    async addMessage(mess){

        let dateTmp = new Date();

        //kreiramo dokument koji cemo dodati bazi
        let message = {
            message: mess,
            room: this.room,
            username: this.username,
            created_at: firebase.firestore.Timestamp.fromDate(dateTmp)
        }

        //dodamo poruku (dokument) promenljivoj koja je povukla celu kolekciju iz baze
        let response = await this.messages.add(message);
        return response;
    }

    getChats(callback){
    this.unsub = this.messages
                .where('room', '==', this.room)
                .orderBy('created_at')
                .onSnapshot(snapshot => {
                    snapshot.docChanges().forEach( change => {
                        if(change.type == 'added'){
                            //dodaj novu poruku jer je doslo do izmene
                            callback(change.doc.data());
                        }
                    })
                });
    }

    setTimeStamp(dateId){
        let date = document.querySelector(dateId);
        let dateValue = new Date(date.value);    
        let dateFirestore = firebase.firestore.Timestamp.fromDate(dateValue);
        return dateFirestore;
    }
    
    getChatsByDate(callback){
        let dateStart = this.setTimeStamp('#dateStart');
        let dateEnd = this.setTimeStamp('#dateEnd');
        this.messages
            .where('room','==',this.room)
            .where('created_at','<=', dateEnd)
            .where('created_at', '>=', dateStart)
            .orderBy('created_at')
            .onSnapshot( snapshot => {
                snapshot.docChanges().forEach( change => {
                    if( change.type === 'added' ){
                        callback(change.doc);
                    }
                });
            });
    }
}




//console.log(cr);
//console.log(cr.room); //poziva se getter
//console.log(cr._room); //poziva se polje
//cr.addMessage('Hello!')
//  .then (console.log('Uspešno!'))
// .catch (err => console.log(err));
