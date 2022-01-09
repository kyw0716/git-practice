import { useEffect, useState } from "react";

function App() {
  const [load, setLoad] = useState(false);
  const [coins, setCoins] = useState([]);
  const [price, setPrice] = useState(0);
  const [money, setMoney] = useState(0);
  const [input, setInput] = useState(0);
  const onSubmit = (event) => {
    setMoney(input);
    event.preventDefault();
  }
  const inputChange = (event) => {
    setInput(event.target.value);
  }
  const onChange = (event) =>{
    setPrice(event.target.value);
  }
  const reset = () =>{
    setMoney(0);
    setPrice(0);
    setInput(0);
  }
  useEffect(()=>{
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then((response) => response.json())
    .then((json) => {
      setCoins(json);
      setLoad(true);
    })
  },[]);
  return (
    <div>
      <h1>The Coins!! ({coins.length})</h1>
      {!load ? 
        <strong>Loading...</strong> : 
        <select onChange={onChange}>
          {coins.map((coin) => 
          <option 
            value={coin.quotes.USD.price}
          >
            {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD
          </option>)}
        </select>
      }
      <form onSubmit={onSubmit}>
        <input
          placeholder="Enter your own money..."
          type="number"
          value={input}
          onChange={inputChange}
        />
        <button>Submit</button>
        <button onClick={reset}>Reset</button>
      </form>
      <hr />
      {(money !== 0 )&(price !== 0) ? <h1>You can Buy {parseInt(money / price)} coins!!</h1> : null}
    </div>
  );
}

export default App;