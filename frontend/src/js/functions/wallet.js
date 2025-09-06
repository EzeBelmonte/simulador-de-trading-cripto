let amount = 0;

// Depositar dinero
export function toDeposit() {
  document.getElementById("deposit-button").addEventListener("click", () => {
    const depositInput = parseFloat(document.getElementById("deposit-amount-input").value)
      deposit(depositInput)
  })
}

// Ingreso de dinero
export function deposit(depositMoney) {
  if (!isNaN(depositMoney) && depositMoney > 0) {
    amount += depositMoney
    updateAmout(amount)
  }
}

// Actualizar monto
function updateAmout(amount) {
  document.getElementById("money").textContent = amount.toFixed(2)
  clearInput()
}

// limpiar input después del depósito
function clearInput() {
  document.getElementById("deposit-amount-input").value = ""
}