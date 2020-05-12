//DOM elementi

//dohvata prvi
let ulTasks = document.querySelector('ul');
//dohvata sve
let liTasks = document.querySelectorAll('li');
//hvatanje taska fielda
let inputNewTask = document.querySelector('#newTask');
//hvatanje radio buttona
let radioAppend = document.querySelector('#append');
let radioPrepend = document.querySelector('#prepend');



//brisanje elementa iz ul liste
ulTasks.addEventListener('click', e=>{
    if(e.target.tagName == 'LI'){
        e.target.remove()
    }
    });


//dodavanje elementa u ul listu
inputNewTask.addEventListener('keyup', e =>{
    if(e.keyCode == 13){ //ako je pritisnuto ENTER
        let liNewTask = document.createElement('li'); // napravi novi li
        let inputText = inputNewTask.value; // preuzmi vrednost iz input polja i stavi ga u inputText promenljivu
       
        if (inputText == ''){
            alert('Unesite nešto');
        } else {
        liNewTask.textContent = inputText; //dodaj vrednost promenljive inputText promenljivoj liNewTasks
       
        if (radioAppend.checked){
            ulTasks.append(liNewTask);
        } else {
            ulTasks.prepend(liNewTask);
        }
        inputNewTask.value = '';
        }
    }

});

db.collection("users").get()
.then(function(querySnapshot) {
querySnapshot.forEach(function(doc) {
console.log(doc.id, " => ", doc.data());
});
})
.catch(function(error) {
console.log("Error getting documents: ", error);
});