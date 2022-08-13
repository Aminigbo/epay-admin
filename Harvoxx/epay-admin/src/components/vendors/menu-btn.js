import React, {useState, useContext} from 'react';
import {globalContext} from '../../global-context';
import MenuIcon from '@mui/icons-material/Menu';

function MenuBtn(){

    var globalState = useContext(globalContext);
    const [menuState, setMenuState] = useState(false)
    function handleClick(){
        if(menuState === true){
            globalState.setState((state)=>{
                return {...state, vendorDashboardLeftClass:"close", vendorDashboardRightClass:"close"}
            })
            setMenuState(false)
        }else if(menuState === false){
            globalState.setState((state)=>{
                return {...state, vendorDashboardLeftClass:"open", vendorDashboardRightClass:"open"}
            })
            setMenuState(true);
        }
    }
    return (
        <div>
          <button className="menu-btn" onClick={handleClick}><MenuIcon className="icon"/></button>
       </div>
    );
}

export default MenuBtn;