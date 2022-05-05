import { useState, useEffect } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import ListadoGastos from "./components/ListadoGastos";
import { generarId } from "./helpers";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import Filtros from "./components/Filtros";

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  const [isValidPresupuesto, setisValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos")
      ? JSON.parse(localStorage.getItem("gastos"))
      : []
  );

  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

/* This is a useEffect hook that is checking if the gastoEditar object has any keys. If it does, it
will set the modal to true and then set the animarModal to true after 500ms. */
  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [gastoEditar]);

/* This is a useEffect hook that is setting the presupuesto in localStorage. */
  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

/* This is a useEffect hook that is setting the gastos in localStorage. */
  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);

/* This is a useEffect hook that is checking if the presupuestoLS is greater than 0. If it is, it will
set the isValidPresupuesto to true. */
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0;

    if (presupuestoLS > 0) {
      setisValidPresupuesto(true);
    }
  }, []);

/* This is a useEffect hook that is checking if the filtro is true. If it is, it will set the
gastosFiltrados to the gastos that have the same category as the filtro. */
  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter(
        (gasto) => gasto.categoria === filtro
      );
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro]);

/**
 * The handleNuevoGasto function is called when the user clicks on the "Nuevo Gasto" button
 */
  const handleNuevoGasto = () => {
    //console.log('Click en nuevo gasto');
    setModal(true);
    setGastoEditar({});

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

/**
 * The function takes a parameter called gasto, and if the gasto has an id, it will update the gasto,
 * otherwise it will create a new gasto
 */
  const guardarGasto = (gasto) => {
    if (gasto.id) {
      //Actualizar Gasto
      const gastosActuales = [...gastos];
      const index = gastosActuales.findIndex(
        (gastoActual) => gastoActual.id === gasto.id
      );
      gastosActuales[index] = gasto;
      setGastos(gastosActuales);
      setGastoEditar({});
    } else {
      //Nuevo gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

/**
 * We're creating a new array, and then we're finding the index of the element that we want to remove,
 * and then we're using the splice method to remove that element from the array
 */
  const eliminarGasto = (id) => {
    //console.log('Eliminando Gasto',id);
    const gastosActuales = [...gastos];
    const index = gastosActuales.findIndex(
      (gastoActual) => gastoActual.id === id
    );
    gastosActuales.splice(index, 1);
    setGastos(gastosActuales);
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setisValidPresupuesto={setisValidPresupuesto}
      />
      {isValidPresupuesto && (
        <>
          <main>
            <Filtros filtro={filtro} setFiltro={setFiltro} />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="Add new"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}
      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
