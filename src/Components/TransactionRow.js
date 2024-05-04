import React from "react";
import "../styles/Trow.css";
import { useGlobalContext } from "../Context/globalContext";
import {dollar, comment, calender,plus, minus} from "../Utils/Icons"
function TransactionRow(props){
    const source=props.source;
    const id =props.id;
    // console.log(props.id)
    const{ deleteExpense,deleteIncome}= useGlobalContext();

 
   return<>
    <div className=" Trow_parent " >
        <div className="child1" >
        <div className=" plus">
                {source=="income"?plus:minus} 
        </div>
        </div>
        <div className="child2">
            <div className="child2_1">
                <div className="dot" style={{backgroundColor: source=="income"?"green":"red"}}></div>
                <h4 className="title"> {props.title}</h4>
                 <div className="child2_1_2">
                       <p> {comment}
                         {props.description}</p>
                    </div>
            </div>
            
            <div className="child2_2">
            <div className="child2_2_3">
                       <p> <b>Category: </b>  {props.category}</p>
                    </div>
            <div className="child2_2_1">
                       <p> {dollar}
                        {props.amount}</p>
                    </div>
                    <div className="child2_2_2">
                       <p> {calender}
                        {props.date}</p>
                    </div>
                   
                    

            </div>
        </div>
        <div className="child3">
            
           
                <div className="delete">
                <i className="fa-solid fa-trash" onClick={()=>{
                    source==="income"? deleteIncome(id):deleteExpense(id);
                }}></i>
                
            </div>
            
        </div>
        <div>
            
        </div>
    </div>    
    </>
  
}


export default TransactionRow
