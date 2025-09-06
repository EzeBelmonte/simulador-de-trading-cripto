// Darle formato al precio
export function updateFormatPrice(price) {
  const formatted = price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8
  });

  return formatted;
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