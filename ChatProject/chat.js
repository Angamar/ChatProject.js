export class Chatroom {

    //constructor
    //koja osoba kreira razgovor i u kojoj sobi se kreira razgovor
    constructor(r, u){
        this.room = r;
        this.username = u;
        this.chats = db.collection('chat');
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
        console.log("Promena username!");
    }

    //promena kanala
    updateRoom(newRoom){
        this.room = newRoom;
        console.log("Promena sobe!");
        if(this.unsub){
        }
    }

    async addMessage(mess){

        let dateTmp = new Date();

        //kreiramo dokument koji cemo dodati bazi
        let chat = {
            message: mess,
            room: this.room,
            username: this.username,
            created_at: firebase.firestore.Timestamp.fromDate(dateTmp)
        }

        //dodamo čet (dokument) promenljivoj koja je povukla celu kolekciju iz baze
        let response = await this.chats.add(chat);
        return response;
    }

    getChats(callback){
    this.usub = this.chats
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
}


//console.log(cr);
//console.log(cr.room); //poziva se getter
//console.log(cr._room); //poziva se polje
//cr.addMessage('Hello!')
//  .then (console.log('Uspešno!'))
// .catch (err => console.log(err));

