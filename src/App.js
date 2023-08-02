import React, {useState, useMemo} from 'react'
import Orb from './Components/orb/Orb'
import Navigation from './Components/navigation/Navigation'

import Dashboard from './Components/dashboard/Dashboard';
import Income from './Components/income/Income'
import Expenses from './Components/expenses/Expenses';

import bg from './img/bg.png'
import styled from "styled-components";
import { MainLayout} from './styles/Layouts';
import Transaction from './Components/transaciton/Transaction';

function App() {
  const [active, setActive] = useState(1)
  const orbMemo = useMemo(() => {
    return <Orb />
  },[])
  const displayData = () => {
    switch(active){
      case 1:
        return <Dashboard />
      case 2:
        return <Transaction />
      case 3:
        return <Income />
      case 4: 
        return <Expenses />
      default: 
        return <Dashboard />
    }
  }
  return (
    <AppStyled bg={bg} className='App'>
      {orbMemo}
      <MainLayout>
      <Navigation active={active} setActive={setActive} />
      <main>
          {displayData()}
        </main> 
      </MainLayout>
    </AppStyled>
  );
}
const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;
export default App;
