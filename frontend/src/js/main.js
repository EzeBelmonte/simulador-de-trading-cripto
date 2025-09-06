import { toDeposit } from "./functions/wallet.js";
import { refreshCryptoCache, getCryptoCache, getCryptoPrice, subscribeCrypto } from "./functions/market.js";

// Depositar dinero
toDeposit()

// Listado de criptomonedas
async function init() {
  const select = document.getElementById("crypto-select")
  
  // Función que refresca cache y actualiza precio de la cripto seleccionada
  async function refreshAndUpdate() {
    try {
      await refreshCryptoCache()
      const cryptos = getCryptoCache()

      if (!cryptos || cryptos.length === 0) {
        console.warn("CryptoCache vacía, no se puede actualizar precio")
        return
      }

      const selectedId = select.value || cryptos[0].id
      updatePrice(getCryptoPrice(selectedId))
    } catch (err) {
      console.error("Error actualizando precios:", err)
    }
  }

  // Inicializamos la cache y mostramos la primera cripto
  await refreshAndUpdate()

  const cryptos = getCryptoCache()

  // Llenamos el select con las criptos
  cryptos.forEach(crypto => {
    const option = document.createElement("option")
    option.value = crypto.id
    option.textContent = crypto.name
    select.appendChild(option)
  })

  // Mostrar precio y suscribirse a la primera cripto
  if (cryptos.length > 0) {
    updatePrice(getCryptoPrice(cryptos[0].id))
    subscribeCrypto((cryptos[0].symbol + "usdt").toLowerCase())
  }


  // Cambiar precio cuando se selecciona otra cripto
  select.addEventListener("change", () => {
    // Obtenemos la criptomoneda
    const value = select.value

    // Actualizar el valor de la cripto
    updatePrice(getCryptoPrice(value)) 

    // Enviamos al backend para la table de compra/venta
    const selected = getCryptoCache().find(c => c.id === value)
    if (selected) subscribeCrypto((selected.symbol + "usdt").toLowerCase())
  })

  // Mostrar precio de la primera cripto por defecto
  updatePrice(getCryptoPrice(cryptos[0].id))

  // Refrescar cache y precio cada 60 segundos
  setInterval(refreshAndUpdate, 30000)
}

// Darle formato al precio
function updatePrice(price) {
  const formatted = price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8
  })

  document.getElementById("show-current-price").textContent = `$${formatted}`
}


document.addEventListener("DOMContentLoaded", () => {
  init()
})