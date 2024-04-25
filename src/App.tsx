import React from 'react';
import './App.css';
import { useState } from 'react';
import { SessionTypes } from '@walletconnect/types';

import { getAccount, PuzzleAccount, GetSelectedAccountResponse, connect, configureConnection } from '@puzzlehq/sdk-core';



function App() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [account, setAccount] = useState<PuzzleAccount | undefined>();


  const connectPuzzle = async () => {
    const options = {
      dAppName: "<YOUR DAPP NAME>",
      dAppDescription: "<YOUR DAPP DESCRIPTION>",
      dAppUrl: "<YOUR DAPP URL>",
      dAppIconURL: "<YOUR DAPP ICON URL>",
    }
    
    configureConnection(options);
    try {
      const session = await connect();
      console.log(session);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
    

  }

  const fetchAccount = async () => {
    try {
      const response = await getAccount();
      console.log(response.account);
      if (response.account) {
        setAccount(response.account);
        console.log(response.account);
      }
      else if (response.error) {
        setError(response.error);
        console.log(response.error);
      }
      
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
    
  }

  const f3 = async (val: String) => {
    console.log(val);
  }

  const f4 = async () => {
    console.log('f4');
  }

  



  

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Click any button:
        </p>
        <button onClick={() => fetchAccount()}>Account Details</button>
        <button onClick={() => f3('mail02')}>F3</button>
        <button onClick={() => f4()}>F4</button>
        <button onClick={() => connectPuzzle()}>Puzzle</button>
      </header>
    </div>
  );
}

export default App;
