// Darle formato al precio
export function updateFormatPrice(price) {
  const formatted = price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8
  });

  return formatted;
}