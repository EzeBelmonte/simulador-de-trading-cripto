import { listTop50Cryptos } from "./functions/market.js";
import { validacion, cryptoPrice } from "./functions/listenersEvents.js";
import { desposit } from "./functions/wallet.js";
import { updateFormatPrice } from "./functions/utilities.js"

//let cryptoCache = await listTop50Cryptos();
let cryptoCache = listTop50Cryptos();

// ======= LISTADO DE CRIPTOMONEDAS
async function init() {
  const select = document.getElementById("crypto-selected");

  cryptoCache.forEach(c => {
    const option = document.createElement("option");
    option.value = c.symbol;
    option.textContent = c.symbol;
    select.appendChild(option);
  })

  if (cryptoCache.length > 0) {
    const price = updateFormatPrice(cryptoCache[0].price);
    document.getElementById("preview-selected-price").textContent = price;
    document.getElementById("trading-crypto-price").value = price;
  }
}
// Luego, actualiza cada 30 segundos (30000 ms)
setInterval(listTop50Cryptos, 30000);


// ======= LLAMADO A FUNCIONES
init();


// ======= LISTENERS
// Escuchamos el cambio de criptomoneda del select
document.getElementById("crypto-selected").addEventListener("change", (event) => {
  cryptoPrice(event.target.value, cryptoCache); // Llamar a la función pasando el nombre y arreglo
});
// Validar el ingreso de dinero
document.getElementById("deposit-amount-input").addEventListener('input', validacion);
// Escuchamos el botón que ingresa dinero
document.getElementById("deposit-amount-button").addEventListener("click", desposit);