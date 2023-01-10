export default function formatCurrency(value) {
  return parseFloat(value).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}
