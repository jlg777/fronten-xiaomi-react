
export function formatDate(dateString, options = {}) {
  if (!dateString) return "Fecha inválida";

  const date = new Date(dateString);
  if (isNaN(date)) return "Fecha inválida";

  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  });
}
