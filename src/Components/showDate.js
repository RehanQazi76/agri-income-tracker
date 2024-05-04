import React from "react";
import { ReactDOM } from "react";


const date= new Date();
var DateMessage;
const Days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];
if(date.getHours()<12){
    DateMessage="Good morning "
}
else{
    DateMessage="Good Evening";
}
function showDate(){
    return(
    <>
        <h1>Welcome {DateMessage}</h1>
        <h2 className="time"> {date.getDate() +" "+ Days[date.getDay()]}</h2>
        </>
    );
}

 
export default showDate;

