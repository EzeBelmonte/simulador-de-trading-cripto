import { api_key } from "../key.js"
const apiKey = api_key()

// Obtenemos el top 50 de criptomonedas
/*
export async function listTop50Cryptos() {
  try {
    const response = await fetch('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=50&tsym=USD', {
      headers: {
        authorization: `Apikey ${apiKey}`
      }
    });

    const data = await response.json();

    const cryptoList = data.Data.map(coin => ({
      symbol: coin.CoinInfo.Name,
      fullName: coin.CoinInfo.FullName,
      price: coin.RAW?.USD?.PRICE || 'N/A',
      change24h: coin.RAW?.USD?.CHANGEPCT24HOUR || 'N/A'
    }));

    return cryptoList;

  } catch (err) {
    console.error('Error al obtener datos:', err);
  }
}
*/

export function listTop50Cryptos() {
  const cryptoList = [
    {
      symbol: 'BTC',
      fullName: 'Bitcoin',
      price: '120000.00',
      change24h: '2.5'
    },
    {
      symbol: 'ETH',
      fullName: 'Ethereum',
      price: '3000.00',
      change24h: '-1.3'
    },
    {
      symbol: 'LTC',
      fullName: 'Litecoin',
      price: '180.00',
      change24h: '0.8'
    },
    {
      symbol: 'XRP',
      fullName: 'Ripple',
      price: '0.90',
      change24h: '3.4'
    },
    {
      symbol: 'ADA',
      fullName: 'Cardano',
      price: '1.50',
      change24h: '-0.5'
    },
    {
      symbol: 'PEPE',
      fullName: 'PEPEcoin',
      price: '0.00000977',
      change24h: '-0.5'
    }
  ];

  return cryptoList;
}




listTop50Cryptos();