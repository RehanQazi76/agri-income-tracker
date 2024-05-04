// comment all code?
import React, { useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useReactToPrint } from 'react-to-print';
import { PieChart,BarChart, Pie, Cell, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from 'recharts';
import html2canvas from 'html2canvas';
import { useGlobalContext } from '../Context/globalContext';
import Navbar from '../Components/Navbar';
const getRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);
const calculatePercentage = (categoryTotal, total) => {
  var res= ((categoryTotal / total) * 100).toFixed(0);
  res=Number(res);
  return res;
  
};
const Report = () => {
  const {
    incomes,
    expenses,
    getIncomes,
    totalIncome,
    totalExpenses,
    totalBalance,
    getExpenses,
    transactionHistory,
  } = useGlobalContext();
  const totalInc=totalIncome();
  const totalExp=totalExpenses();
  const graphRef = useRef();// Reference for capturing graphs
  useEffect(()=>{
    getIncomes();
    getExpenses();
  },[])
  const incomeByCategory = {};
  const expenseByCategory = {};

  // Aggregate income transactions by category
  incomes.forEach((income) => {
    if (incomeByCategory[income.category]) {
      incomeByCategory[income.category] += income.amount;
    } else {
      incomeByCategory[income.category] = income.amount;
    }
  });

  // Aggregate expense transactions by category
  expenses.forEach((expense) => {
    if (expenseByCategory[expense.category]) {
      expenseByCategory[expense.category] += expense.amount;
    } else {
      expenseByCategory[expense.category] = expense.amount;
    }
  });

  // Convert hashmaps to array format required by Recharts
  const incomeData = Object.keys(incomeByCategory).map((category) => ({
    category: category,
    amount: incomeByCategory[category],
    fill:getRandomColor()
  }));
  const incomeData_pie = Object.keys(incomeByCategory).map((category) => ({
    category: category,
    amount: calculatePercentage(incomeByCategory[category],totalInc),
    fill:getRandomColor()
  }));

  const expenseData = Object.keys(expenseByCategory).map((category) => ({
    category: category,
    amount: expenseByCategory[category],
    fill:getRandomColor()
  }));
  const expenseData_pie = Object.keys(expenseByCategory).map((category) => ({
    category: category,
    amount: calculatePercentage(expenseByCategory[category],totalExp),
    fill:getRandomColor()
  }));
 
  console.log(incomeData_pie);
  const generatePDF = async () => {
    const doc = new jsPDF();
    
    const chartCanvas = await html2canvas(graphRef.current); // Capture the graph area
    const chartImage = chartCanvas.toDataURL('image/png'); // Convert to image

    doc.text("Agricultural Income and Expense Report", 14, 10);

    // Insert the graph image into the PDF
    const chartHeight = 250; // Adjust as needed
    doc.addImage(chartImage, 'PNG', 10, 20, 190, chartHeight);

    // Add spacing between the image and the tables
    const startYForTable = 20 + chartHeight + 20; // Spacing after the image

    // Add income table
    doc.text("Income Table:", 14, startYForTable);
    doc.autoTable({
      startY: startYForTable + 5, // Ensure spacing
      head: [['Title', 'Amount (Rs)', 'Date', 'Category', 'Description']],
      body: incomes.map((income) => [
        income.title,
        `Rs${income.amount.toFixed(2)}`,
        new Date(income.date).toLocaleDateString(),
        income.category,
        income.description,
      ]),
    });

    // Add expense table
    const startYForExpenseTable = doc.previousAutoTable.finalY + 10; // Spacing before the next table
    doc.text("Expense Table:", 14, startYForExpenseTable);
    doc.autoTable({
      startY: startYForExpenseTable + 5, // Ensure spacing
      head: [['Title', 'Amount (Rs)', 'Date', 'Category', 'Description']],
      body: expenses.map((expense) => [
        expense.title,
        `Rs${expense.amount.toFixed(2)}`,
        new Date(expense.date).toLocaleDateString(),
        expense.category,
        expense.description,
      ]),
    });

    // Add total stats with spacing
    const startYForTotals = doc.previousAutoTable.finalY + 10;
    doc.text(`Total Income: Rs ${totalIncome().toFixed(2)}`, 14, startYForTotals);
    doc.text(`Total Expenses: Rs${totalExpenses().toFixed(2)}`, 14, startYForTotals + 10);
    doc.text(`Total Balance: Rs${totalBalance().toFixed(2)}`, 14, startYForTotals + 20);

    doc.save('Agricultural_Report.pdf'); // Save the PDF
  };

  const styles=`
 h1{
  padding:40px;
 }
  .par{
    color: #00246B;
    font-size:20px;
    font-weight:bold;
    width:400px
  
   
  }
  .main{
    list-style-type: none;
    padding: 0;
    background-color:#00246B;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .main li {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color:  #CADCFC;
    display:flex;
    flex-direction:row;
    
    justify-content: space-evenly;
  }
  
  li:last-child {
    margin-bottom: 0;
  }
  .title{
    font-size:30px
  }
  
  
  `
  return(
    <>
    <Navbar/>
    <div >
        <h1>Income Report</h1>
        <br/>
        <div ref={graphRef}>
            <BarChart width={730} height={250} data={incomeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="fill" />
              </BarChart>
            <br/>
            <br/>
            <PieChart width={800} height={400}>
            <Pie data={incomeData_pie} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={80} fill="fill" label />
                <Tooltip />
                <Legend />

            </PieChart>
            <br/> 
        
           <h1>Expense Report</h1>
          
            <BarChart width={730} height={250} data={expenseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="black" />
            </BarChart>

            <br/>
            <PieChart width={800} height={400}>
            <Pie data={expenseData_pie} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
                <Tooltip />
                <Legend />

            </PieChart>
          <br/>
        
          </div>
        <div style={{display:"flex", flexDirection:"column"}}>
            <h1 >Recent Transactions</h1>
            <ul className='main'>
              <li><p className='par title'>Title</p> <p className='par title'> Amount</p><p className='par title'> Date</p> </li>
              {transactionHistory().map((transaction) => (
                <li key={transaction._id} >
                  <p className='par'>{transaction.title}:</p><p className='par'> Rs{transaction.amount.toFixed(2)} </p><p className='par'>on {new Date(transaction.date).toLocaleDateString()}</p>
                </li>
                  ))}
            </ul>
            <button className='submitButton' onClick={generatePDF}style={{fontSize:"30px"}} >Download as PDF</button>

      </div>
      <style>{styles}</style>
      
    </div>
    <br/>

    </>
  )
}
export default Report;