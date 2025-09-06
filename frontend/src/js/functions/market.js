export const socket = new WebSocket("ws://localhost:3000"); // conectarnos

let cryptoCache = [] // Guardar el top 50
const lastBuys = []; // Últimas compras
const lastSells = []; // Últimas ventas
const maxItems = 4; // Cabtidad de compras/ventas a mostrar

// URL de CoinGecko
const FETCH_URL = "http://localhost:3000/api/top50cryptos" // backend local

// ----------------------------
// Actualiza la cache
export async function refreshCryptoCache() {
  try {
    const response = await fetch(FETCH_URL)
    const data = await response.json()
    
    cryptoCache = Array.isArray(data) ? data : []
  } catch (err) {
    cryptoCache = []
  }
}

// Un callback para pasar los trades al main.js
let tradeHandler = null
export function onTrade(handler) {
  tradeHandler = handler
}

socket.addEventListener("message", (event) => {
  const trade = JSON.parse(event.data)
  if (tradeHandler) tradeHandler(trade)
})

// Obtener valores de las transacciones en tiempo real
export function subscribeCrypto(symbol) {
  // limpiar buffers al cambiar de mercado
  lastBuys.length = 0
  lastSells.length = 0

  const send = () => socket.send(JSON.stringify({ action: "subscribe", symbol }))
  if (socket.readyState === WebSocket.OPEN) send()
  else socket.addEventListener("open", send, { once: true })
}

// Obtener el nombre completo (Bitcoin, Ethereum...)
export function getCryptoNameFromSymbol(symbol) {
  const cache = cryptoCache
  const baseSymbol = symbol.replace("USDT", "").toLowerCase()
  const match = cache.find(c => c.symbol.toLowerCase() === baseSymbol)
  return match ? match.name : symbol
}

// Obtener el ticker abreviado (btc, eth, bnb...)
export function getCryptoTickerFromSymbol(symbol) {
  const cache = cryptoCache
  const baseSymbol = symbol.replace("USDT", "").toLowerCase()
  const match = cache.find(c => c.symbol.toLowerCase() === baseSymbol)
  return match ? match.symbol.toUpperCase() : baseSymbol.toUpperCase()
}


// ------------- GETTERS
// Devuelve la cache actual
export function getCryptoCache() {
  return cryptoCache
}

// Devuelve el precio de una cripto por id
export function getCryptoPrice(id) {
  if (!Array.isArray(cryptoCache)) return null
  const crypto = cryptoCache.find(c => c.id === id)
  return crypto ? crypto.current_price : null
}

// Exportar lastBuys/lastSells para que main los use
export function getLastTrades() {
  return { lastBuys, lastSells, maxItems }
}