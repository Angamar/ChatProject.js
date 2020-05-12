//DOM elementi

//dohvata prvi
let ulTasks = document.querySelector('ul');
//dohvata sve
let liTasks = document.querySelectorAll('li');

//dodavanje event listenera svakoj stavki liste

liTasks.forEach (li => {
    li.addEventListener('click', ()=> {
        if(li.style.textDecoration == 'line-through') {
            li.style.textDecoration = 'none';
            li.style.color = ''; //prazan string vraća  na default vrednost
        } else {
            li.style.textDecoration = 'line-through';
            li.style.color = 'lightsalmon';
        }
    } );
});