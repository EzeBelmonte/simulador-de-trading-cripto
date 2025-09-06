import { updateFormatPrice } from "./utilities.js";

// Función que renderiza la opción seleccionada
export const selectedCrypto = (cryptoName, cryptoCache) => {
  const crypto = cryptoCache.find(crypto => crypto.symbol === cryptoName); // Buscar el objeto en el arreglo
  // Mostrar en las respectivas secciones del HTML
  const price = updateFormatPrice(crypto.price);
  document.getElementById("show-current-price").textContent = price;
  document.getElementById("trade-price-cripto").value = price;
}