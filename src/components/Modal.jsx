import { useState, useEffect } from "react";
import Mensaje from "./Mensaje";
import CerrarBtn from "../img/cerrar.svg";

const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  guardarGasto,
  gastoEditar,
  setGastoEditar,
}) => {
  const [mensaje, setMensaje] = useState("");
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [id, setId] = useState("");
  const [fecha, setFecha] = useState("");

/* A hook that is called when the component is mounted. It is used to set the state of the component. */
  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setNombre(gastoEditar.nombre);
      setCantidad(gastoEditar.cantidad);
      setCategoria(gastoEditar.categoria);
      setId(gastoEditar.id);
      setFecha(gastoEditar.fecha);
    }
  }, [gastoEditar]);

/**
 * When the user clicks the close button, the modal will close after 200 milliseconds.
 */
  const handleModal = () => {
    console.log("Click en cerrar");
    setGastoEditar({});
    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
    }, 200);
  };

/**
 * If the user has not filled out all the fields, then display an error message for 3 seconds,
 * otherwise add the expense to the list.
 * @returns the object with the values of the form.
 */
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log('Click en submit');
    if ([nombre, cantidad, categoria].includes("")) {
      setMensaje("All fields are required");
      //console.log('No se puede agregar el gasto');
      setTimeout(() => {
        setMensaje("");
      }, 3000);
      return;
    }
    guardarGasto({ nombre, cantidad, categoria, id, fecha });
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarBtn} alt="Close" onClick={handleModal} />
      </div>
      <form
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
        onSubmit={handleSubmit}
      >
        <legend>
          {gastoEditar.nombre ? "Edit Expense" : "Add new expense"}
        </legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        <div className="campo">
          <label htmlFor="nombre">Expense name</label>
          <input
            id="nombre"
            type="text"
            placeholder="Add a new expense"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="cantidad">Amount</label>
          <input
            id="cantidad"
            type="number"
            placeholder="Add a new amount"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria">Category</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">--</option>
            <option value="savings">Savings</option>
            <option value="house">House</option>
            <option value="food">Food</option>
            <option value="other">Other</option>
            <option value="fun">Fun</option>
            <option value="health">Health</option>
            <option value="subscriptions">Subscriptions</option>
          </select>
        </div>
        <input
          type="submit"
          value={gastoEditar.nombre ? "Save" : "Add new expense"}
        />
      </form>
    </div>
  );
};

export default Modal;
