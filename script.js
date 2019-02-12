'use strict';

//Get square class for change
const c = document.getElementsByClassName('container');

//Variables for saving sum lines and colums
let col = 3;
let line = 3;

//Variables for saving removing line and colum
let colD = null;
let lineD = null;

const t = document.getElementById('t-elem').getElementsByTagName('tbody')[0];
const addL = document.getElementById('add-line');
const addC = document.getElementById('add-colum');
const rmC = document.getElementById('rm-colum');
const rmL = document.getElementById('rm-line');

//Rebuild id numeration for colums
let refreshColum = () => {
    if(colD != null && colD != undefined){
        for(let i = 0; i < col - colD + 1; i++){
            for(let j = 0; j < line + 1; j++){
                let id = Number(colD + i + 1);
                let td = document.getElementById("c" + id);
                let changeID = id - 1;
                td.id = "c" + changeID;
            }
        }
    }
}

//Rebuild id numeration for lines
let refreshLine = () => {
    if(lineD != null && lineD != undefined){
        for(let i = 0; i < line - lineD + 1; i++){
            let id = Number(lineD + i + 1);
            let tr = document.getElementById("l" + id);
            let changeID = id - 1;
            tr.id = "l" + changeID;
        }
    }
}

//Add colum button event
addC.addEventListener('click', (e) => {
    col++;
    for(let i=0; i < line + 1; i++){
        let row = document.getElementById('l'+ i);
        let l = row.insertCell(col);
        l.id = "c" + col;
        l.className = "box";
    }

    //Fix bug with marginLeft for firefox
    if(navigator.userAgent.indexOf("Firefox")!= -1){
        addC.style.marginLeft = t.offsetWidth + 85 + "px";
    }
    //Using for other browser
    else{
        addC.style.marginLeft = t.offsetWidth + 81 + "px";
    }
});

//Add line button event
addL.addEventListener('click', (e) => {
    line++;
    let row = t.insertRow(line);
    row.id = "l" + line;
    for(let i=0; i < col + 1; i++){
        let l = row.insertCell(i);
        l.id = "c" + i;
        l.className = "box";
    }
});

//Remove colum button event
rmC.addEventListener('click', (e) => {
    for(let i = 0; i < line + 1; i++){
        document.getElementById("c" + colD).remove();
    }
    //Fix bug with marginLeft for firefox
    if(navigator.userAgent.indexOf("Firefox")!= -1){
        addC.style.marginLeft = t.offsetWidth + 85 + "px";
    }else{
        addC.style.marginLeft = t.offsetWidth + 81 + "px";
    }
    col--;
    refreshColum();
    colD = null;
    rmC.style.visibility = "hidden";
    rmL.style.visibility = "hidden";
});

//Remove line button event
rmL.addEventListener('click', (e) => {
    document.getElementById("l" + lineD).remove();
    line--;
    refreshLine();
    lineD = null;
    rmC.style.visibility = "hidden";
    rmL.style.visibility = "hidden";
});

//Listener for moving remove buttons
t.addEventListener('mouseover', (e) => {
    if(col != 0)
        rmC.style.visibility = "visible";
    if(line != 0)
        rmL.style.visibility = "visible";

    let target = e.target  || e.srcElement;;
    let tag = target.tagName;

    rmC.style.marginLeft = 80  + Number(target.id.split("c", 2)[1]) * 52 + "px";
    colD = Number(target.id.split("c", 2)[1]);  
    target = target.parentNode;
    lineD = Number(target.id.split("l", 2)[1]);

    if (tag == "TD") {
        rmL.style.marginTop = 80 + Number(target.id.split("l", 2)[1]) * 52 + "px";

    }
});

//Hiddin remove buttons when standstill
t.addEventListener('mouseout', (e) => {
    setTimeout( () =>{
        rmC.style.visibility = "hidden";
        rmL.style.visibility = "hidden";
    }, 18000);
});