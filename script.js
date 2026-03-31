//local storage code

let notes = JSON.parse(localStorage.getItem("userNote")) || [];
function saveData(){
    localStorage.setItem('userNote', JSON.stringify(notes));
}

//delete note function
let deleteValue = false;
let deleteAni = false;

function displayNote(note)
{
    var div = document.createElement("div");
    var h = document.createElement("h1");
    var button = document.createElement("button");

    div.dataset.noteId = note.id;
    button.style.display = "none";
    h.textContent = note.title;

    div.classList.add("note-box");
    h.classList.add("box-title");

    div.addEventListener("click", function(){
        if(deleteValue)
        {
            div.classList.add("deleteNote");
            notes = notes.filter(function(n){
                return n.id !== note.id;
            });
            saveData();
            div.remove();
        }
        else
        {
            noteTitle.value = note.title;
            noteTextArea.value = note.content;
            noteTop.style.display = "flex";
            noteTextArea.style.display = "flex";
            welcomeContainer.style.display = "none";
        }
    });

    div.appendChild(h);
    div.appendChild(button);
    document.getElementById("past-note").appendChild(div);

    return div;
}

function loadData()
{
    notes.forEach(function(note){
        displayNote(note);
    })
}


function deleteNote()
{  
    if(!deleteValue){
        deleteValue = true;
        let allNotes = document.querySelectorAll(".note-box");
        allNotes.forEach(function(div){
            div.classList.add("deleteNote");
        });
    }
    else if(deleteValue){
        deleteValue = false;
        let allNotes = document.querySelectorAll(".note-box");
        allNotes.forEach(function(div){
            div.classList.remove("deleteNote");
        });
    }
}


//welcome screen
let welcomeBox = document.getElementById("welcome-screen");
let welcomeStatus = true;
welcomeBox.classList.add("welcomeIdle");
//start up
let noteSidebar = document.getElementById("notes-sidebar");
let notesPage = document.getElementById("notes-page");
let headerContainer = document.getElementById("header-container");

function startNotes(){
    welcomeBox.classList.remove("welcomeIdle");
    welcomeBox.classList.add("welcomeFade");
    setTimeout(function(){
        noteSidebar.style.display = 'flex';
        notesPage.style.display = 'flex';
        headerContainer.style.display = 'flex';
        headerContainer.classList.add("headerIntro");
        noteSidebar.classList.add("noteSidebarIntro");
        notesPage.classList.add("notePageIntro");
    }, 100);
    setTimeout(function(){
        welcomeBox.style.display = 'none';
        noteSidebar.classList.remove("noteSidebarIntro");
        notesPage.classList.remove("notePageIntro");
    }, 1000);
    welcomeStatus = false;
}

if(welcomeStatus)
{
    document.addEventListener('keydown', function(event){
    if(welcomeStatus && event.keyCode == '32')
    {
        startNotes()
    }
    });
    document.addEventListener('mousedown', function(event){
        if(welcomeStatus && event.button === 0)
        {
            startNotes();
        }
    });
}

//clock
function updateClock()
{
    const now = new Date();
    const hour = now.getHours().toString().padStart(2, 0);
    const min = now.getMinutes().toString().padStart(2, 0);
    const timeString = `${hour}:${min}`;
    document.getElementById("clock").innerHTML = timeString;
}

updateClock();
setInterval(updateClock, 1000);

//hide sidebar function

let sidebarHidden = false;

function hideSidebar(){
    noteSidebar.classList.remove("noteSidebarIntro");
    if(!sidebarHidden)
    {
        noteSidebar.classList.remove("noteSidebarIn");
        notesPage.classList.remove("notesPageShrink");

        noteSidebar.classList.add("sideBarOut");
        notesPage.classList.add("notesPageExpand");
        setTimeout(function(){
            noteSidebar.style.opacity = 0;
        }, 500);
        sidebarHidden = true;
    }
    else if(sidebarHidden)
    {
        notesPage.classList.remove("notesPageExpand");
        noteSidebar.classList.remove("sideBarOut");
        notesPage.classList.add("notesPageShrink");
        setTimeout(function(){
            noteSidebar.style.opacity = 1;
            noteSidebar.classList.add("noteSidebarIn");
        }, 100);
        sidebarHidden = false;
    }
}

let welcomeContainer = document.getElementById("note-welcome-group");
let noteTop = document.getElementById("notes-top");
let noteTextArea = document.getElementById("notes-content");
noteTextArea.style.display = 'none';
noteTop.style.display = 'none';

function newNote(){
    noteTop.style.display = 'flex';
    noteTextArea.style.display = 'flex';
    welcomeContainer.style.display = 'none';
    noteTop.classList.add("noteTextAreaShow");
    noteTextArea.classList.add("noteTextAreaShow");
    noteTitle.value = "";
    noteTextArea.value = "";
}

// date
function updateDate()
{
    const now = new Date();
    const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"];
    const day = now.getDay();
    const date = now.getDate();
    const month = now.getMonth()+1;
    const year = now.getFullYear();
    let dateString = `${month}/${date}/${year}`;
    document.getElementById("day-of-week").textContent = dayName[day];
    document.getElementById("date").textContent = dateString;
}

updateDate();

//generating note id
function newID(){
   let id;
   do{
    id = Math.floor(1000 + Math.random() * 9000);
   } while (notes.some(note => note.id === id));
   return id;

}

//saving note
let noteTitle = document.getElementById("note-title");
let newNoteButton = document.getElementById("new-note");
function saveNote()
{
    let userNote = {
        id:newID(),
        title: noteTitle.value,
        content: noteTextArea.value
    };

    notes.push(userNote);
    saveData();
    displayNote(userNote);

    welcomeContainer.style.display = 'flex';
    noteTop.style.display = 'none';
    noteTextArea.style.display = 'none';
    noteTitle.value = "";

}

loadData();




