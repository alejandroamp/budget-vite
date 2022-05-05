import { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({
  presupuesto,
  setPresupuesto,
  setisValidPresupuesto,
}) => {
  const [mensaje, setMensaje] = useState("");

/**
 * If the budget is not valid, then set the message to 'Is not a valid budget' and return. Otherwise,
 * set the message to an empty string and set the budget to valid.
 * @returns the value of the variable "mensaje"
 */
  const handlePresupuesto = (e) => {
    e.preventDefault();
    //console.log('enviando form...');
    //console.log(Number(presupuesto));
    if (!presupuesto || presupuesto < 0) {
      //console.log('No es un presupuesto valido');
      setMensaje("Is not a valid budget");
      return;
    }
    //console.log('Si es un presupuesto valido');
    setMensaje("");
    setisValidPresupuesto(true);
  };
  return (
    <div
      onSubmit={handlePresupuesto}
      className="contenedor-presupuesto contenedor sombra"
    >
      <form className="formulario">
        <div className="campo">
          <label htmlFor="">Set Budget</label>
          <input
            type="number"
            className="nuevo-presupuesto"
            placeholder="Add a new budget"
            value={presupuesto}
            onChange={(e) => setPresupuesto(Number(e.target.value))}
          />
        </div>
        <input type="submit" value="Add" />
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </div>
  );
};

export default NuevoPresupuesto;
