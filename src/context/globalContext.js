/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    getIncomes();
  });

  const addIncome = async (income) => {
    const response = await axios
      .post(`${BASE_URL}add-income`, income)
      .catch((err) => {
        setError(err.response.data.message);
      });
      getIncomes()
  };
  const deleteIncome = async (id) => {
    const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
    getIncomes()
  }

  const getIncomes = async () => {
    const response = await axios.get(`${BASE_URL}get-incomes`);
    setIncomes(response.data);
    console.log(response.data);
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) =>{
        totalIncome = totalIncome + income.amount
    })

    return totalIncome;
}

  //calculate incomes
  const addExpense = async (income) => {
    const response = await axios.post(`${BASE_URL}add-expense`, income)
        .catch((err) =>{
            setError(err.response.data.message)
        })
    getExpenses()
}

const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}get-expenses`)
    setExpenses(response.data)
    console.log(response.data)
}

const deleteExpense = async (id) => {
    const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
    getExpenses()
}

const totalBalance = () => {
  return totalIncome() - totalExpenses()
}

const totalExpenses = () => {
    let totalIncome = 0;
    expenses.forEach((income) =>{
        totalIncome = totalIncome + income.amount
    })

    return totalIncome;
}

const transactionHistory = () => {
  const history = [...incomes, ...expenses]
  history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt)
  })

  return history.slice(0, 3)
}
const transactionHistoryforTransaction = () => {
  const history = [...incomes, ...expenses]
  history.sort((a, b) => {
      return  new Date(a.createdAt) - new Date(b.createdAt) 
  })

  return history;
}

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        expenses,
        error,
        setError,
        transactionHistory,
        transactionHistoryforTransaction
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
