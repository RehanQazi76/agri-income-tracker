import React, { useState, useEffect } from 'react';
import '../styles/Formcomponent.css';
import { useGlobalContext } from '../Context/globalContext';

function FormComponent(props) {
  const { addExpense, error, setError, addIncome, categories, getCategories,addCategory } = useGlobalContext();
  const source = props.source;
  const [toggle, setToggle] = useState(true);
  const [formData, setFormData] = useState({
    source: source,
    title: '',
    amount: '',
    date: '',
    category: '',
    description: ''
  });
  const [newCategoryFormData, setNewCategoryFormData] = useState({
    name: ''
  });

  useEffect(() => {
    getCategories();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNewCategoryChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setNewCategoryFormData({ ...newCategoryFormData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, amount, date, category, description } = formData;
    if (!title || !amount || !date || !category) {
      setError("Please fill in all required fields.");
      return;
    }
    if (formData.source === 'income') {
      addIncome({ title, amount, date, category, description });
    } else {
      addExpense({ title, amount, date, category, description });
    }
    setFormData({
      source: source,
      title: '',
      amount: '',
      date: '',
      category: '',
      description: ''
    });
    setError(null);
  };

  const handleNewCategorySubmit = (e) => {
    e.preventDefault();
    const { name } = newCategoryFormData;
    console.log(name);
    // Assuming you have a function addCategory to add new category
    addCategory(name);
    // Clear the form data
    setNewCategoryFormData({ name: '' });
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
      {props.source === null && (
          <div className="inputGroup">
            <label className="label" htmlFor="toggleSource" >Select Source</label>
            <input
                type="checkbox"
                id="incomeSwitch"
                className="checkbox"
                checked={formData.source === 'income'}
                onChange={() => setFormData({ ...formData, source: formData.source === 'income' ? 'expense' : 'income' })}
              />              

              <label htmlFor="incomeSwitch" className="toggle" style={{display:"flex", flexDirection:"row", gap:"40px", alignItems:"center", padding:"20px"}}>
                <p>
                  Income</p>
                   <p>Expense </p>
              </label>
          </div>
        )}
        <div className="inputGroup">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter Title"
            value={formData.title}
            onChange={handleChange}
            className="input"
          />
        </div>
        
<div className="inputGroup">
  <label htmlFor="amount">Amount</label>
  <input
    type="number"
    id="amount"
    name="amount"
    placeholder="Enter Amount"
    value={formData.amount}
    onChange={handleChange}
    className="input"
  />
</div>
<div className="inputGroup">
  <label htmlFor="date">Enter Date</label>
  <input
    type="date"
    id="date"
    name="date"
    value={formData.date}
    onChange={handleChange}
    className="input"
  />
</div>
<div className="inputGroup">
  <label htmlFor="category">Enter category</label>
  <select
    id="category_dropdown"
    name="category"
    value={formData.category}
    onChange={handleChange}
    className="input"
  >
    <option value="">Select an option</option>
    {categories.map((category)=>{
      return(<option key={category._id} value={category.name}>{category.name}</option>)
    })}
  </select>

</div>
   {/* Button to show new category form */}
   <button type="button" className='submitButton' onClick={() => setToggle(!toggle)}>Add New Category</button>
        {/* New category form */}
        {!toggle && (
          
            <div className="inputGroup">
              <label htmlFor="newCategory">New Category</label>
              <input
                type="text"
                id="newCategory"
                name="name"
                placeholder="Enter New Category"
                value={newCategoryFormData.name}
                onChange={handleNewCategoryChange}
                className="input"
              />
              <button className="submitButton" style={{margin:"10px"}}  onClick={newCategoryFormData.name!=null? handleNewCategorySubmit:null}>Submit</button>
            </div>
            
          
        )}
<div className="inputGroup">
  <label htmlFor="description">Description</label>
  <textarea
    id="description"
    name="description"
    placeholder="Enter Description"
    value={formData.description}
    onChange={handleChange}
    className="input"
  />
</div>

        <button type="submit" className="submitButton">Submit</button>
      </form>
      
    </div>
  );
}

export default FormComponent;
