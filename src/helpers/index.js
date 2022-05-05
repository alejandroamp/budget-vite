export const generarId = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const formatearFecha = (fecha) => {
  let fechaFormateada = new Date(fecha);
  let opciones = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  return fechaFormateada.toLocaleDateString("en-US", opciones);
};
