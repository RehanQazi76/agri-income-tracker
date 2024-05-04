import React, { useContext, useState } from "react"
import axios from 'axios'
import {toast} from 'react-hot-toast'

const BASE_URL = "http://localhost:4000/api/v1/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(null)

    //calculate incomes
    const addIncome = async (income) => {
        try {
             await axios.post(`${BASE_URL}add-income`, income);
            getIncomes();
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred while adding income.");
        }
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        // console.log(response.data)
    }

    const deleteIncome = async (id) => {
        await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    const totalIncome = () => {
        let totalincome = 0;
        incomes.forEach((income) =>{
            totalincome = totalincome + income.amount
        })

        return totalincome;
    }


    //calculate incomes
 
const addExpense = async (expense) => {
    try {
       await axios.post(`${BASE_URL}add-expense`, expense);
        getExpenses();
    } catch (error) {
        setError(error.response?.data?.message || "An error occurred while adding expense.");
    }
}
    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
        // console.log(response.data)
    }

    const deleteExpense = async (id) => {
     await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalexpense = 0;
        expenses.forEach((expense) =>{
            totalexpense= totalexpense + expense.amount
        })
        console.log(" total income",totalexpense)

        return totalexpense;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        
        const history = [...incomes, ...expenses];
        
        history.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateB - dateA; // Sort in descending order
        });
        
        return history;
    }
    const addCategory = async(name)=>{
        try {
            console.log(name);
            await axios.post(`${BASE_URL}add-category`,{name:name});
            getCategories();
            toast.success("Category added successfully");
        } catch (error) {
            toast.error(error.response?.data?.message,"hhhh" || "An error occurred while adding category.");
        }
    }
    const getCategories= async()=>{ 
        const response = await axios.get(`${BASE_URL}get-category`);
        setCategories(response.data.category)
    }

    const registerUser = async(userInfo )=>{
        try {
            const{data}= await axios.post(`${BASE_URL}register`, userInfo);
            if(data.error){
                toast.error(data.error);
                return false;
            }
            else{
                toast.success("user registered")
                return true;
            }
        } catch (error) {
            
        }
    }
    const login = async(loginInfo)=>{
        try {
            const {data}= await  axios.post(`${BASE_URL}login`, loginInfo);
            if(data.error){
                toast.error(data.error);
                return false;
            }
            else {
                toast.success("login successful");
                return true;
            }
        } catch (error) {
            
        }
    }

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            addCategory,
            getCategories,
            categories,
            error,
            setError,
            registerUser,
            login
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}