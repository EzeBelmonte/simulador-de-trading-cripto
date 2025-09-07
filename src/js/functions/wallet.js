import { updateFormatPrice } from "./utilities.js";

let availableAmount = 0;

export function desposit() {
  // Valor ingresado en el input
  const depositInput =  document.getElementById("deposit-amount-input");

  // Elimina cualquier carácter que no sea número o punto decimal
  depositInput.value = depositInput.value.replace(/[^0-9.]/g, '');

  // Verifica si el valor contiene 'e' (notación científica) y lo elimina si lo tiene
  if (depositInput.value.includes('e') || depositInput.value.includes('E')) {
    depositInput.value = depositInput.value.replace(/[eE]/g, '');
  }

  // Validación de número
  const money = parseFloat(depositInput.value);

  // Verificaciones
  if (isNaN(money) || money <= 0) {
    console.error("Ingresar monto válido");
  }

  // Limpiar input
  depositInput.value = "";

  // Sumar el dinero ingresado a nuestro monto
  availableAmount += money;

  // Renderizamos el nuevo monto
  document.getElementById("amount-deposited").textContent = updateFormatPrice(availableAmount);
}


// ======= GETTERS
export function getAvailableAmount() {
  return availableAmount;
}