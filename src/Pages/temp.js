import React, { useEffect, useRef } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { Button } from 'antd';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useReactToPrint } from 'react-to-print';
import { PieChart, Pie, Cell, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import html2canvas from 'html2canvas';

const Report = () => {
  const {
    incomes,
    expenses,
    totalIncome,
    totalExpenses,
    totalBalance,
    transactionHistory,
  } = useGlobalContext();
  
  const reportRef = useRef(); // Reference for printing
  const graphRef = useRef(); // Reference for capturing graphs

  const pieData = [
    { name: 'Income', value: incomes.reduce((sum, inc) => sum + inc.amount, 0) },
    { name: 'Expense', value: expenses.reduce((sum, exp) => sum + exp.amount, 0) },
  ];

  const lineData = [...incomes, ...expenses]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((entry) => ({
      ...entry,
      date: new Date(entry.date).toLocaleDateString(),
    }));

  const generatePDF = async () => {
    const doc = new jsPDF();
    
    const chartCanvas = await html2canvas(graphRef.current); // Capture the graph area
    const chartImage = chartCanvas.toDataURL('image/png'); // Convert to image

    doc.text("Agricultural Income and Expense Report", 14, 10);

    // Insert the graph image into the PDF
    const chartHeight = 60; // Adjust as needed
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

  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg" ref={reportRef}>
      <h2 className="text-2xl font-bold mb-4">Income and Expense Report</h2>

      {/* Graphs for capturing */}
      <div ref={graphRef} className="flex justify-center mb-4">
        {/* Pie Chart for Income vs Expense */}
        <PieChart width={300} height={300}>
          <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100}>
            <Cell key="Income" fill="#82ca9d" />
            <Cell key="Expense" fill="#ff7300" />
          </Pie>
          <Legend />
        </PieChart>

        {/* Line Chart for Income and Expense Trends */}
        <LineChart width={300} height={300} data={lineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#82ca9d" />
          <Line type="monotone" dataKey="amount" stroke="#ff7300" />
        </LineChart>
      </div>

      {/* Recent Transactions */}
      <div>
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        <ul>
          {transactionHistory().map((transaction) => (
            <li key={transaction._id} className="border-b p-2">
              {transaction.title}: Rs{transaction.amount.toFixed(2)} on {new Date(transaction.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <Button type="primary" onClick={generatePDF}>Download as PDF</Button>
        <Button type="default" onClick={handlePrint} className="ml-4">Print Report</Button>
      </div>
    </div>
  );
};

export default Report;
