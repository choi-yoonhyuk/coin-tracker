import React, { useEffect, useState } from "react";

const Coin = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    const fetchCoins = async () => {
      const res = await fetch("https://api.coinpaprika.com/v1/tickers");
      const json = await res.json();
      setCoins(json);
      setLoading(false);
    };
    fetchCoins();
  }, []);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <h1>The Coins! ({coins.length})</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <input
            style={{ textAlign: "right" }}
            type="number"
            value={value}
            onChange={onChange}
            placeholder="I have.."
          />
          <span> $ </span>
          <select>
            {coins.map((coin) => (
              <option key={coin.id}>
                {coin.name} ({coin.symbol}):{" "}
                {value ? value / coin.quotes.USD.price : 0} {coin.symbol}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Coin;
