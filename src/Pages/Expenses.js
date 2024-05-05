// Expenses.js
import React from 'react';
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
  return `${day}-${month}-${year}`;
}

 function handlemap(Transaction){
    return(
      <TransactionRow
            id={Transaction._id}
            key={Transaction._id}
            title={Transaction.title}
            scource={Transaction.scource}
            amount={Transaction.amount}
            date={formatDate(Transaction.date)}
            category={Transaction.category}
            description={Transaction.description}
            />
    )
  }

  function Expenses(){

    const { expenses,  getExpenses } = useGlobalContext();

    React.useEffect(() => {
      getExpenses();
    }, []);
    return(
      <>
      <Navbar/>
      <div className='container' style={{margin:"20px"}}>
      <h1   >Expense</h1>
      
      <div className=' row'>

     
      <div className='col'>
      <FormComponent source ={"expense"}/>  
      </div>
      <div  className='col'>
        {expenses.map(expense=>{
            return handlemap(expense);        })}
      </div>
     
      </div>
      
    </div>
    </>
    );
  }
export default Expenses;
