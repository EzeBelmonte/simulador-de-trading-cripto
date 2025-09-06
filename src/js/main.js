import { listTop50Cryptos } from "./functions/market.js";
import { selectedCrypto } from "./functions/listeners.js";
import { desposit } from "./functions/wallet.js";
import { updateFormatPrice, validacion } from "./functions/utilities.js"

//let cryptoCache = await listTop50Cryptos();
let cryptoCache = listTop50Cryptos();

// ======= LISTADO DE CRIPTOMONEDAS
async function init() {
  const select = document.getElementById("crypto-select");

  cryptoCache.forEach(c => {
    const option = document.createElement("option");
    option.value = c.symbol;
    option.textContent = c.symbol;
    select.appendChild(option);
  })

  if (cryptoCache.length > 0) {
    const price = updateFormatPrice(cryptoCache[0].price);
    document.getElementById("show-current-price").textContent = price;
    document.getElementById("trade-price-cripto").value = price;
  }
}
// Luego, actualiza cada 30 segundos (30000 ms)
setInterval(listTop50Cryptos, 30000);


// ======= LLAMADO A FUNCIONES
init();
// Depositar dinero
//toDeposit()


// ======= LISTENERS
// Escuchamos el cambio de criptomoneda del select
document.getElementById("crypto-select").addEventListener("change", (event) => {
  selectedCrypto(event.target.value, cryptoCache); // Llamar a la función pasando el nombre y arreglo
});

document.getElementById("deposit-amount-input").addEventListener('input', validacion);

// Escuchamos el botón que ingresa dinero
document.getElementById("deposit-button").addEventListener("click", desposit);

