import React, {useState} from 'react';
import './game.css';
import man2 from './man2.png';


function Box(){
    return (
        <div className="box"></div>
    )
}
function Game(){
    var no_of_boxes = 63;
    var box_id = [];
    for(var i=0; i<no_of_boxes; i++){
        box_id.push({id:i, state:""});
    }

    // var bo = {id:0, state:""};

    const [box, setBox] = useState(box_id);
    const [boxIndexState, setBoxIndexState] = useState(13);

    function startGame(){
        setBox((state)=>{
            // console.log("game state: "+state)
            var new_arr = [...state];
            new_arr[boxIndexState].state = man2;
            return new_arr;
        });
    }


    var current_box_index = 0;

    function move(direction){
        setBox((state)=>{
            // console.log("game state: "+state)
            var new_arr = [...state];
            new_arr[boxIndexState].state = "";
            return new_arr;
        });

        
       if(direction === "down"){
        setBoxIndexState(boxIndexState => boxIndexState + 9);
        setBox((state)=>{
            // console.log("game state: "+state)
            var new_arr = [...state];
            new_arr[boxIndexState].state = man2;
            return new_arr;
        });
       }

    

    }

    return (
        <div className="game">
         {
             box.map((box_object)=>{
                return <div className="box">{<img src={box_object.state} alt="" className="man" />}</div>
             })

         }

{/* <img src={process.env.PUBLIC_URL+'images/man1.png'} alt=""/> */}
{/* <img className="man" src={process.env.PUBLIC_URL+'images/man2.png'} alt=""/> */}
<button className="start-btn" onClick={startGame}>START</button>
{/* <button>Up</button>
<button onClick={() => setBoxIndexState(boxIndexState+9)}>Down</button>
<button>Left</button>
<button>Right</button> */}
        </div>


    )

}

export default Game;