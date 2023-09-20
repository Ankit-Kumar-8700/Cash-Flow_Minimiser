import './App.css';
import { addTransaction, clearInput, handleSolDiv, resetAll, submit } from './helper';
import logo from './pictures/logo.png';
import {useEffect, useState} from 'react';

function App() {

  let [time,setTime]=useState('');
  function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    setTime(h + ":" + m + ":" + s);
    setTimeout(startTime, 1000);
  }
  
  function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
  }

  useEffect(()=>{
    handleSolDiv();
    startTime();
  },[])

  return (
    <div className="App">
      <nav className="navbar">
        <div className="title">
          <img src={logo} alt="" />
          <p>Cash-Flow</p>
        </div>
        <div className="time">
            {time}
        </div>
      </nav>
      <div className="mainWork">
        <div className="transDiv">
          <div className="transHead">Transactions done : </div>
          <div className="transInput">
            <div className="from">
              <p>From:</p>
              <input className='input' type="text" name="from" id="from" />
            </div>
            <div className="to">
              <p>To:</p>
              <input className='input' type="text" name="to" id="to" />
            </div>
            <div className="from">
              <p>Amount:</p>
              <input className='input' type="number" name="money" id="money" />
            </div>
          </div>
          <div className="transBtns">
            <button className='btn' onClick={addTransaction} >Add</button>
            <button className='btn' onClick={clearInput} >Clear</button>
            <button className='btn' onClick={resetAll} >Reset</button>
            <button className='btn' onClick={submit} >Submit</button>
          </div>
          <div id="errors"></div>
          <div id="transactionsMade">
            {false && <i class="fa-solid fa-coins"></i>}
          </div>
        </div>
        <div className="solDiv">
          <div id="solHead"></div>
          <div id="solPic"></div>
          <div id="solution"></div>
          {false && <i class="fa-solid fa-money-bill-transfer fa-spin"></i>}
        </div>
      </div>
    </div>
  );
}

export default App;
