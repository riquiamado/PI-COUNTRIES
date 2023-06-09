import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllCountries,
  getActivities,
  orderByName,
  orderByPopulation,
  filterCreated,
  filterByRegion,
  Clean,
} from "../../redux/actions";
import Pagination from "../paginado";
import React from "react";
import CountryCard from "../countryCard";
import "./home.css";
import SearchBar from "../searchBar";

function Home() {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);
  const allCountries = useSelector((state) => state.allCountries);
  const countries = useSelector((state) => state.countries);

  const currentPages = useSelector((state) => state.currentPage);
  const pages = 10;
  const idLastCard = currentPages === 1 ? 8 : currentPages * pages - 2;
  const idFirstCard = currentPages === 1 ? 0 : idLastCard - pages + 1;
  const totalCard = allCountries.length;
  const currentCountries = allCountries.slice(idFirstCard, idLastCard + 1);
  //eslint-disable-next-line no-unused-vars
  const [orden, setOrden] = useState("");

  useEffect(() => {
    if (allCountries.length === countries.length) {
      dispatch(getAllCountries());
      dispatch(getActivities());
    }
    return dispatch(Clean());
  }, [allCountries.length, countries.length, dispatch]);

  function handleClick(e) {
    dispatch(getAllCountries());
  }

  function handleSortName(e) {
    dispatch(orderByName(e.target.value));
    setOrden(`orden ${e.target.value}`);
  }

  function handleSortPopulation(e) {
    dispatch(orderByPopulation(e.target.value));
    setOrden(`orden${e.target.value}`);
  }
  function handleFilterByContinents(e) {
    dispatch(filterByRegion(e.target.value));
  }

  function handleSelect(e) {
    e.target.value === "Sin Filtrar "
      ? dispatch(getAllCountries())
      : dispatch(filterCreated(e.target.value));
    setOrden(`orden ${e.target.value}`);
  }

  return (
    <div className={"container"}>
      <SearchBar />

      <div className={"conti"}>
        <button onClick={(el) => handleClick(el)}>Recargar Paises: </button>

        <Link to={"/"}>
          <button>Inicio</button>
        </Link>

        <Link to="/activities">
          <button>Crear Actividades</button>
        </Link>
      </div>

      <div className={"button"}>
        <div>
          <label htmlFor="">Orden Alfabético: </label>
          <select onChange={(e) => handleSortName(e)}>
            <option value={"All"}>All</option>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>

        <div>
          <label htmlFor="">Ordenar por Poblacion: </label>
          <select onChange={(el) => handleSortPopulation(el)}>
            <option value="">All</option>
            <option value="mayor">Mayor</option>
            <option value="menor">Menor</option>
          </select>
        </div>

        <div>
          <label htmlFor="">Buscar por Continentes: </label>
          <select onChange={(e) => handleFilterByContinents(e)}>
            <option value={"All"}>All </option>
            <option value={"South America"}>Sudamérica</option>
            <option value={"North America"}>Norteamérica</option>
            <option value={"Africa"}>África</option>
            <option value={"Asia"}>Asia</option>
            <option value={"Europe"}>Europa</option>
            <option value={"Oceania"}>Oceanía</option>
            <option value={"Antarctica"}>Antárctica</option>
          </select>
        </div>

        <div>
          <label>Buscar por Actividad: </label>
          {activities.length === 0 ? (
            <p>No se han creado actividades</p>
          ) : (
            <select onChange={(e) => handleSelect(e)}>
              <option value="Sin Filtrar ">Sin Filtrar</option>
              {activities?.map((e) => (
                <option value={e.name} key={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div>
        <Pagination
          totalCard={totalCard}
          currentPages={currentPages}
          pages={pages}
        />
      </div>

      <div className={"countriesContainer"}>
        {currentCountries?.map((e) => {
          return (
            <div className="card" key={e.id}>
              <CountryCard
                id={e.id}
                flag={e.flag}
                name={e.name}
                continents={e.continents}
                population={e.population}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
