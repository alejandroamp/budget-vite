//Instalar Libreria npm i react-circular-progressbar

import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({
  gastos,
  presupuesto,
  setGastos,
  setPresupuesto,
  setIsValidPresupuesto,
}) => {
  const [porcentaje, setPorcentaje] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);


/* A function that is executed when the component is mounted and when the component is updated. */
  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => {
      return total + gasto.cantidad;
    }, 0);

    //Calcular el porcentaje gastado
    const porcentajeGastado = ((totalGastado / presupuesto) * 100).toFixed(2);
    setTimeout(() => {
      setPorcentaje(porcentajeGastado);
    }, 1000);

    //Calcular el disponible
    setGastado(totalGastado);
    setDisponible(presupuesto - totalGastado);
  }, [gastos, presupuesto]);

/**
 * The function formatearPresupuesto takes a number and returns a formatted number.
 * @returns the value of the variable "presupuestoRestante"
 */
  const formatearPresupuesto = (numero) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(numero);
  };

/**
 * If the user clicks "OK" on the confirm dialog, then the localStorage is cleared and the page is
 * reloaded.
 *
 * If the user clicks "Cancel" on the confirm dialog, then nothing happens.
 */
  const handleReset = () => {
    //console.log('Resetando la App');
    const resultado = window.confirm("Are you sure?");
    if (resultado) {
      localStorage.clear();
      window.location.reload();
    }
    /* O Tambien se puede hacer:
            if(resultado) {
                setGastos([])
                setPresupuesto(0)
                setIsValidPresupuesto(false)
            } */
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "#dc2626" : "#3B82F6",
            trailColor: "#6c696c65",
            textColor: porcentaje > 100 ? "#dc2626" : "#3B82F6",
          })}
          value={porcentaje}
          text={`${porcentaje}% Spent`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleReset}>
          Reset App
        </button>
        <p>
          <span>Budget: </span> {formatearPresupuesto(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Available: </span> {formatearPresupuesto(disponible)}
        </p>
        <p>
          <span>Spent: </span> {formatearPresupuesto(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
