import React from "react";
import { ReactDOM } from "react";
import { calender } from "../Utils/Icons";


const date= new Date();
var DateMessage;
const Days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];
if(date.getHours()<12){
    DateMessage="Good morning "
}
else if(date.getHours()<17){
    DateMessage="Good Afternoon";
}
else{
    DateMessage="Good Evening";
}
function showDate(){
    const style=`
    .main{
        display:flex;
        flex-direction:row;
        justify-content:space-around;
    }
    .date{
        display:flex;
        flex-direction:row;
        gap:10px;
        align-items:center;
        justify-items:flex-end
    }
    .date i{
        font-size:xx-large
    }
    `;
    return(
    <div className="main" >

        <h1 >{DateMessage}</h1>
        <div className="date">
        {calender}
        <h1> {date.getDate() +" "+ Days[date.getDay()]}</h1>
        </div>
        <style>{style}</style>
        </div>
        
    );
}

 
export default showDate;

