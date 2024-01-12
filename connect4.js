const player = ["lightgrey", "magenta", "chocolate"];
let turn = 0;
let win = false;
let x_input_current = -1; 
let y_input_current = -1; 
let connect = -1;
let board = {};


const make_div = (x,y) => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    div.id = x + "_" + y; // sXY coordinates for Div ID
    div.style.left = (3+x)*100 + "px";
    div.style.top = (3+y)*100+"px";
    div.style.background = player[0];
    board[x+"_"+y] = 0;
    div.onclick = () => {update_board(x);}
};


const update_board = (x) => { // check for winning condition
    if (win == true){ // how many connect dots
        restart_board()
    }
    if(turn+1 == x_input_current*y_input_current){
        window.setTimeout(() => {
            answer = window.confirm("No one wins! \n\nRestart Board?")
            if (answer) {restart_board()}
            else {win = true};
        }, 100)
        
        
    }
    
    for (let yy=y_input_current-1; yy>-1; yy--){ // find the correct Y position
        if (board[x+"_"+yy] == 0){ // move possible
            player_num = (turn%2) + 1;
            next_player_num = (turn+1)%2 + 1;
            board[x+"_"+yy] = player_num

            div = document.getElementById(x+"_"+yy);
            div.style.background = player[player_num];
            document.getElementById("player_turn").innerHTML = player[next_player_num]; // next player turn
            document.getElementById("player_turn").style.color = player[next_player_num];
            
            if(win_line(x,yy)){
                window.setTimeout(() => {
                    let answer2 = window.confirm("Player " + player[(turn%2+1)] + " wins!\n\nRestart Board?")
                    if (answer2) {restart_board()}
                    else {win = true}
                }, 100);
                break;
            }

            turn++;
            break; // exit loop
        }
    }
}


const win_line = (x,y) => {
    win_list = [];
    win_list.push.apply(win_list,vertical(x,y));;
    win_list.push.apply(win_list,horizontal(x,y));
    win_list.push.apply(win_list,diagonal_left(x,y));
    win_list.push.apply(win_list,diagonal_right(x,y));
    if (win_list.length > connect-1){
        for (const elem of win_list.slice(0,connect)){ // outline winning combination
            div = document.getElementById(elem);
            div.style.outline = "10px solid gold";
        }

    return true 
    }
}

const vertical = (x,y) => {
    let yy = y;
    const current = (turn%2)+1;
    const win_list = [];
    while (current === board[x+"_"+yy]){ // downwards check
        if(!win_list.includes(x+"_"+yy)){win_list.push(x+"_"+yy);} // add to list if not in list
        yy++;        
        if(board[x+"_"+yy] === 0){
            break; // if empty div
        }
    }
    yy = y;
    while (current === board[x+"_"+yy]){ // upwards check
        if(!win_list.includes(x+"_"+yy)){win_list.push(x+"_"+yy);} // add to list if not in list
        yy--;
        if(board[x+"_"+yy] === 0){
            break; // if empty div
        }
    }
    if (win_list.length > connect-1){return win_list;} 
    
    
}

const horizontal = (x,y) => {
    var xx = x;
    const current = (turn%2)+1;
    const win_list = [];
    while (current === board[xx+"_"+y]){ // right check
        if(!win_list.includes(xx+"_"+y)){win_list.push(xx+"_"+y);} // add to list if not in list
        xx++;        
        if(board[xx+"_"+y] === 0){
            break; // if empty div
        }
    }
    xx = x;
    while (current === board[xx+"_"+y]){ // left check
        if(!win_list.includes(xx+"_"+y)){win_list.push(xx+"_"+y);} // add to list if not in list
        xx--;
        if(board[xx+"_"+y] === 0){
            break; // if empty div
        }
    }
    if (win_list.length > connect-1){return win_list;}
    
}

const diagonal_right = (x,y) => {
    var xx = x;
    var yy = y;
    const current = (turn%2)+1;
    const win_list = [];
    while (current === board[xx+"_"+yy]){ // right check
        if(!win_list.includes(xx+"_"+yy)){win_list.push(xx+"_"+yy);} // add to list if not in list
        xx++;
        yy--;        
        if(board[xx+"_"+yy] === 0){
            break; // if empty div
        }
    }
    xx = x;
    yy = y;
    while (current === board[xx+"_"+yy]){ // left check
        if(!win_list.includes(xx+"_"+yy)){win_list.push(xx+"_"+yy);} // add to list if not in list
        xx--;
        yy++;
        if(board[xx+"_"+yy] === 0){
            break; // if empty div
        }
    }
    if (win_list.length > connect-1){return win_list;}
}

const diagonal_left = (x,y) => {
    var xx = x;
    var yy = y;
    const current = (turn%2)+1;
    const win_list = [];
    while (current === board[xx+"_"+yy]){ // right check
        if(!win_list.includes(xx+"_"+yy)){win_list.push(xx+"_"+yy);} // add to list if not in list
        xx++;
        yy++;        
        if(board[xx+"_"+yy] === 0){
            break; // if empty div
        }
    }

    xx = x;
    yy = y;
    while (current === board[xx+"_"+yy]){ // left check
        if(!win_list.includes(xx+"_"+yy)){win_list.push(xx+"_"+yy);} // add to list if not in list
        xx--;
        yy--;
        if(board[xx+"_"+yy] === 0){
            break; // if empty div
        }
    }
    if (win_list.length > connect-1){return win_list;}
}

const delete_board = (x_total,y_total) => {
    for (let xx=0; xx<x_total; xx++) {
        for (let yy=0; yy<y_total; yy++){
            if (document.getElementById(xx+"_"+yy)){;
                document.getElementById(xx+"_"+yy).remove();
            };
        };
    };  
};

const restart_board = () => {
    turn = 0; // reset everything like matching
    x_input = +document.getElementById("x_input").value; // to input in user interface
    y_input = +document.getElementById("y_input").value; // to input in user interface
    connect = +document.getElementById("connect").value;
    board = {};
    win = false;
    document.getElementById("player_turn").innerHTML = ""
    delete_board(x_input_current,y_input_current); // remove existing divs
    x_input_current = x_input; // replace current input values
    y_input_current = y_input;
    
    for (let xx=0; xx<x_input; xx++) {
        for (let yy=0; yy<y_input; yy++){
            make_div(xx, yy);
        };
    };
}

document.getElementById("start").onclick = restart_board;
