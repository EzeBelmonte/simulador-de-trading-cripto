import { updateFormatPrice } from "./utilities.js";

// Función que renderiza la opción seleccionada
function selectedCryptoPrice(cryptoName, cryptoCache) {
  const crypto = cryptoCache.find(crypto => crypto.symbol === cryptoName); // Buscar el objeto en el arreglo
  // Mostrar en las respectivas secciones del HTML
  return updateFormatPrice(crypto.price);
}

// Validar el ingreso de dinero mientras el usuario escribe
export function validacion() {
  const input = document.getElementById("deposit-amount-input");
  // Elimina caracteres no deseados
  input.value = input.value.replace(/[^0-9.]/g, '');
  // Elimina la notación científica
  if (input.value.includes('e') || input.value.includes('E')) {
    input.value = input.value.replace(/[eE]/g, '');
  }
}

// Función para Limit Order
export const cryptoPrice = (cryptoName, cryptoCache) => {
  const price = selectedCryptoPrice(cryptoName, cryptoCache);

  document.getElementById("preview-selected-price").textContent = price;
  document.getElementById("trading-crypto-price").value = price;
}
