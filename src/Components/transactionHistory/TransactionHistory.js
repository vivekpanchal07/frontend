/* eslint-disable array-callback-return */
import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import IncomeItem from "../incomeitem/IncomeItem";

function TransactionHistory() {
  const { transactionHistoryforTransaction } = useGlobalContext();

  const [...history] = transactionHistoryforTransaction();
  return (
    <TransactionHistoryStyled>
      <InnerLayout>
        {history?

        history.map((item) => {
          const {_id, title, amount, date, category, description, type} = item;
          return(
            <IncomeItem
                    key={_id}
                    id={_id} 
                    title={title} 
                    description={description} 
                    amount={amount} 
                    date={date} 
                    type={type}
                    category={category} 
                    indicatorColor= {type === 'expense' ? 'red' : 'var(--color-green)'}
                    ></IncomeItem>)
          
        })
       : <div>No Transaction Found</div> }
        
      </InnerLayout>
    </TransactionHistoryStyled>
  );
}

const TransactionHistoryStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .history-item {
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export default TransactionHistory;
