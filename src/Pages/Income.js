// Income.js
import React, { useEffect } from 'react';
import FormComponent from '../Components/Form';
import TransactionRow from '../Components/TransactionRow';  
import { useGlobalContext } from '../Context/globalContext';
import Navbar from '../Components/Navbar';


function formatDate(dateString) {
  // Trim the time part from the date string
  const dateOnly = dateString.split('T')[0];
  // Split the date into components
  const [year, month, day] = dateOnly.split('-');
  // Format the date
  return `${day} ${month} ${year}`;
}

function Income (){
  const{incomes, getIncomes}= useGlobalContext();
  useEffect(()=>{
    getIncomes();
  },[incomes])


  return (
    <>
    <Navbar/>
    <div className='container' style={{margin:"20px"}}>
      <h1   >Income</h1>
      
      <div className=' row'>

     
      <div className='col'>
      <FormComponent source={"income"} />  
      </div>
      <div className='col'>
        {/* {console.log(incomes)} */}
        {incomes.map(income=>{
          
            return <TransactionRow
            id={income._id}
            key={income._id}
            source={"income"}
            amount={income.amount}
            title={income.title}
            date={  formatDate(income.date)}
            category={income.category}
            description={income.description}
            />
          
        })}
      </div>
      </div>
      
    </div>
    </>
  );
}


export default Income;
