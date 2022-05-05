import { useState, useEffect } from "react";

const Filtros = ({ filtro, setFiltro }) => {
  return (
    <div className="filtros sombra contenedor">
      <form>
        <div className="campo">
          <label>FIlter</label>
          <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
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
      </form>
    </div>
  );
};

export default Filtros;
