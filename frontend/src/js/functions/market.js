export const socket = new WebSocket("ws://localhost:3000"); // conectarnos

let cryptoCache = [] // Guardar el top 50

const lastBuys = []; // Últimas compras
const lastSells = []; // Últimas ventas
const maxItems = 5; // Cabtidad de compras/ventas a mostrar

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


//----------------------------------
// Cuando recibimos un trade desde el backend
const buysList = document.getElementById("buys-list");
const sellsList = document.getElementById("sells-list");

socket.addEventListener("message", (event) => {
  const trade = JSON.parse(event.data)
 console.log(trade)
  const price = parseFloat(trade.p).toFixed(2)
  const amount = parseFloat(trade.q).toFixed(4)

  // Determinar si es compra o venta según el flag 'm'
  if (trade.m) {
    // Fue compra
    lastBuys.unshift({ price, amount })
    if (lastBuys.length > maxItems) lastBuys.pop()
  } else {
    // Fue venta
    lastSells.unshift({ price, amount })
    if (lastSells.length > maxItems) lastSells.pop()
  }

  if (buysList) {
    buysList.innerHTML = lastBuys
      .map(t => `<li><span>${t.amount}</span> <span>$${t.price}</span></li>`)
      .join("")
  }

  if (sellsList) {
    sellsList.innerHTML = lastSells
      .map(t => `<li><span>${t.amount}</span> <span>$${t.price}</span></li>`)
      .join("")
  }
})

// Obtener valores de las transacciones en tiempo real
export function subscribeCrypto(symbol) {
  // limpiar buffers al cambiar de mercado
  lastBuys.length = 0
  lastSells.length = 0
  if (buysList) buysList.innerHTML = ""
  if (sellsList) sellsList.innerHTML = ""

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

