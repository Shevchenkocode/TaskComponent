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


//Event Listener for all buttons
[].forEach.call(c, (el) => {
    el.addEventListener('click', (e) => {
        switch (e.target.id) {
            //Add colum button event
            case 'add-colum':
                col++;
                for(let i=0; i < line + 1; i++){
                    let tr = document.getElementById('l'+i);
                    let td = document.createElement("td");
                    td.id = "c" + col;
                    tr.appendChild(td);
                    let div = document.createElement("div");
                    div.className = "box";
                    td.appendChild(div);
                }
                document.getElementById('add-colum').style.marginLeft = t.offsetWidth + 82 + "px";
                break;

            //Remove colum button event
            case 'rm-colum':
                    for(let i = 0; i < line + 1; i++){
                        document.getElementById("c" + colD).remove();
                    }
                    document.getElementById('add-colum').style.marginLeft = t.offsetWidth + 82 + "px";
                    col--;
                    refreshColum();

                    colD = null;
                    document.getElementById('rm-colum').style.visibility = "hidden";
                    break;

            //Add line button event
            case 'add-line':
                let tr = document.createElement("tr");
                line++;
                tr.id = "l" + line;
                t.appendChild(tr);
                for(let i = 0; i < col+1; i++){
                    let td = document.createElement("td");
                    td.id = "c" + i;
                    tr.appendChild(td);
                    let div = document.createElement("div");
                    div.className = "box";
                    td.appendChild(div);
                }

                document.getElementById('add-colum').style.marginTop = 82 + "px";
                document.getElementById('add-line').style.marginTop = t.offsetHeight + 84 + "px";
                break;

            //Remove line button event
            case 'rm-line':
                let l = document.getElementById("l" + lineD);
                l.remove();
                document.getElementById("add-line").style.marginTop = t.offsetHeight + 84 + "px";
                line--;
                refreshLine();
                lineD = null;
                document.getElementById('rm-line').style.visibility = "hidden";
                break;
        }
    })
});

//Code for moving remove buttons
t.addEventListener('mouseover', (e) => {
    let target = e.target  || e.srcElement;;
    while(target != this){
        let tag = target.tagName;
        if(tag == 'TD') {
                document.getElementById('rm-colum').style.marginLeft = 80 + Number(target.id.split("c", 2)[1]) * 52 + "px";
                colD = Number(target.id.split("c", 2)[1]);
                break;
        }
        target = target.parentNode;
    }
});

t.addEventListener('mouseover', (e) => {
    if(col != 0)
        document.getElementById('rm-colum').style.visibility = "visible";
    if(line != 0)
        document.getElementById('rm-line').style.visibility = "visible";
    let target = e.target  || e.srcElement;;
    while(target != this){
        let tag = target.tagName;
        if(tag == 'TR'){
                document.getElementById('rm-line').style.marginTop = 5 + Number(target.id.split("l", 2)[1]) * 52 + "px";
                lineD = Number(target.id.split("l", 2)[1]);
                break;
        }
        target = target.parentNode;
    }
});

//Hiddin remove buttons when standstill
t.addEventListener('mouseout', (e) => {
        setTimeout( () =>{
            document.getElementById('rm-colum').style.visibility = "hidden";
            document.getElementById('rm-line').style.visibility = "hidden";
        }, 25000);
});

//Hiddin remove buttons when only one colums and line
t.addEventListener('mouseout', (e) => {
        if (col == 0) {
            document.getElementById('rm-colum').style.visibility = "hidden";
        }
        if (line == 0) {
            document.getElementById('rm-line').style.visibility = "hidden";
        }
});
