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
    const sec = now.getSeconds().toString().padStart(2, 0);
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
}
