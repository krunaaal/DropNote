// add a note to localStorage

let addBtn = document.getElementById('addBtn');
showNotes();

addBtn.addEventListener('click', function (e) {

    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    //to get the title
    titleElm = document.getElementById('addTitle'); 
    getTitles = localStorage.getItem('titles');
    if(getTitles == null){
        titleObj = [];
    }
    else{
        titleObj = JSON.parse(getTitles)
    }
    titleObj.push(titleElm.value);
    localStorage.setItem("titles", JSON.stringify(titleObj));
    titleElm.value = "";

    notesObj.push(addTxt.value);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = "";
    showNotes();
})

// function to show notes
function showNotes() {

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let titles = localStorage.getItem('titles');
    if (titles == null) {
        titleObj = [];
    }
    else {
        titleObj = JSON.parse(titles);
    }    

    let html = "";

    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${titleObj[index]}</h5>
                    <p class="card-text"> ${element}</p>
                    <button id="${index}" onClick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
                </div>
            </div>
        `
    });

    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show!`
    }
}

// function to delete a note
function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let titles = localStorage.getItem('titles');
    if (titles == null) {
        titleObj = [];
    }
    else {
        titleObj = JSON.parse(titles);
    }  

    notesObj.splice(index, 1);
    titleObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    localStorage.setItem('titles', JSON.stringify(titleObj));
    showNotes();
}

// searching a note
let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {

    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();

        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})
