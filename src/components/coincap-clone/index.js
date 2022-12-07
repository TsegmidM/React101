import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const toFormat = (amount) => {
  // coin.priceUsd / 1000000000;

  if (amount / 1000 > 0 && amount / 1000 < 1000) {
    // k
    return `$${parseFloat(amount / 1000).toFixed(2)}k`;
  } else if (amount / 1000000 > 0 && amount / 1000000 < 1000) {
    //m
    return `$${parseFloat(amount / 1000000).toFixed(2)}m`;
  } else if (amount / 1000000000 > 0 && amount / 1000000000 < 1000) {
    //b
    return `$${parseFloat(amount / 1000000000).toFixed(2)}b`;
  } else {
    // coin.priceUsd
    return `$${amount}`;
  }
};

export default function CoinCapClone() {
  const [capcoins, setCapcoins] = useState([]);

  const fetchCoinData = () => {
    // setCapcoins([]);
    axios.get("https://api.coincap.io/v2/assets").then((res) => {
      if (capcoins.length !== 0) {
        //haritsuulna capcooinsiig === res
        // console.log(capcoins);
        let newCoin = res.data.data.slice(0, 20);
        //
        const result = [];
        capcoins.forEach((coin, id) => {
          if (coin?.name === newCoin[id]?.name) {
            if (
              parseFloat(coin.priceUsd).toFixed(4) <
              parseFloat(newCoin[id].priceUsd).toFixed(4)
            ) {
              result.push({ ...newCoin[id], change: "up" });
              // console.log(`${coin.name}: Usluu`)
              // setCapcoins((curr) => {
              //   return [...curr,{ ...newCoin[id], change: "up" }];
              // });
            } else if (
              parseFloat(coin.priceUsd).toFixed(4) >
              parseFloat(newCoin[id].priceUsd).toFixed(4)
            ) {
              result.push({ ...newCoin[id], change: "down" });
              // setCapcoins((curr) => {
              //    return [...curr,{ ...newCoin[id], change: "down" }];
              //  // return curr.map((coin)=)
              // });
            } else if (
              parseFloat(coin.priceUsd).toFixed(4) ===
              parseFloat(newCoin[id].priceUsd).toFixed(4)
            ) {
              result.push({ ...newCoin[id], change: "no" });
              // setCapcoins((curr) => {
              //   return [...curr,{ ...newCoin[id], change: "no" }];
              // });
            }
          }
        });
        setCapcoins(result);
        setTimeout(()=>{
          setCapcoins(result.map((aaa)=>{
            return{
              ...aaa,
              change:"no"
            }
          }))
        },1000)
        // console.log(capcoins);
        //  console.log(result[0])
      } else
        setCapcoins(() => {
          return res.data.data.slice(0, 20).map((coin) => {
            return { ...coin, change: "no" };
          });
        });
    });
  };

  //   useEffect(()=> {
  //     fetchCoinData();
  //   },[]);

  useEffect(() => {
    const counterInterval = setInterval(() => {
      fetchCoinData();
    }, 1500);
    return () => {
      clearInterval(counterInterval);
    };
  }, []);

  return (
    <div className="coincap-container">
      <div className="coincap-main-container">
        <button
          onClick={() => {
            fetchCoinData();
          }}
        >
          FETCH!
        </button>
        <table className="coincap-table">
          <thead>
            <tr className="main-container-top-section">
              <th className="coincap-rank">Rank</th>
              <th className="coincap-name">Name</th>
              <th>Price</th>
              <th>Market Cap</th>
              <th>Volume(24Hr)</th>
              <th>Change(24Hr)</th>
            </tr>
          </thead>

          {capcoins.slice(0, 20).map((coin, idx) => {
            return (
              <tbody key={idx}>
                <tr
                  style={{
                    backgroundColor:
                      coin.change === "up"
                        ? "green"
                        : coin.change === "down"
                        ? "red"
                        : "white",
                    transition: "background-color 0.5s ease-in-out",
                  }}
                  className="main-container-coins"
                >
                  <td className="coincap-rank">
                    <span>{coin.rank}</span>
                  </td>
                  <td className="coincap-name">
                    <div
                    // style={{
                    //   color: coin.change==="up" ? "green" : (coin.change ==="down" ? "red" : "black")
                    // }}
                    >
                      {coin.name}
                    </div>
                  </td>
                  <td>
                    <span className="coincap-coin">
                      {parseFloat(coin.priceUsd).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </td>
                  <td>
                    <span className="coincap-coin">
                      {toFormat(coin.marketCapUsd)}
                    </span>
                  </td>
                  {/* .toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  })} */}
                  <td>
                    <span className="coincap-coin">
                      {toFormat(coin.volumeUsd24Hr)}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        color: coin.changePercent24Hr < 0 ? "red" : "green",
                      }}
                      className="coincap-coin"
                    >{`${parseFloat(coin.changePercent24Hr).toFixed(
                      2
                    )}%`}</span>
                  </td>
                </tr>
              </tbody>
            );
          })}
          {/* {capcoins.rank},{capcoins.name},{capcoins.priceUsd},{capcoins.marketCapUsd},{capcoins.volumeUsd24Hr},{capcoins.changePercent24Hr} */}
          {/* <pre>{JSON.stringify(capcoins, null, 2)}</pre> */}
        </table>
        <pre>{JSON.stringify(capcoins, null, 2)}</pre>
      </div>
    </div>
  );
}
