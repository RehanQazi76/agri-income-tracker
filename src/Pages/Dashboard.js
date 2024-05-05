// Dashboard.js
import React, { useEffect,useContext } from 'react';
import ShowDate from '../Components/showDate';
import "../styles/dashboard.css";
import TransactionRow from '../Components/TransactionRow';
import { useGlobalContext } from '../Context/globalContext';
import StatInfoDiv from '../Components/StatInfoDiv';
import Navbar from '../Components/Navbar';
import Chart from '../Components/Chart/Chart';


function formatDate(dateString) {
  // Trim the time part from the date string
  const dateOnly = dateString.split('T')[0];
  // Split the date into components
  const [year, month, day] = dateOnly.split('-');
  // Format the date
  return `${day} ${month} ${year}`;
}

function DisplayTransaction(trans){
  
  return(  <TransactionRow
    id={trans._id}
    key={trans._id}
    source={trans.source}
    amount={trans.amount}
    title={trans.title}
    date={formatDate(trans.date)}
    category={trans.category}
    description={trans.description}
    />);
} 

function Dashboard(){
    // You can access TotalIncome, TotalExpense, TotalBal, ExpensesTransaction, IncomeTransaction as this.props in this component
    const {totalExpenses, totalIncome, totalBalance, getIncomes, getExpenses ,transactionHistory} = useGlobalContext()
  
    useEffect(()=>{
      getIncomes();
      getExpenses();
    },[])
    const [...history] = transactionHistory();
    console.log("the history",history)
    
    return (
      <>
      <Navbar/>
      <div>
   
        <ShowDate/>
      </div>
      <div className='parent'>
        <div className='graphsand_bal'>
          <div >
          <Chart />
          </div>
          <div className='bal'>
            <div className='Income_expense'>
            <StatInfoDiv title={"Total Income"} amount={totalIncome()}/>
            <StatInfoDiv title={"Total Expense"} amount={totalExpenses()}/>
            </div>
            <div className='balence'>
            <StatInfoDiv title={"Total Balance"} amount={totalBalance()}/>
            </div>
          </div>
        </div>
        <div className='transactions'>
          <h1>Recent Transactions</h1>
          {history.map(DisplayTransaction)}       
        </div>
      </div>
      
      </>




    );
    }
export default Dashboard;
