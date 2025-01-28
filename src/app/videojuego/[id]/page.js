"use client";

import React, { use, useState, useEffect } from "react";

export default function Videojuego({ params }) {
  const { id } = use(params);
  const [videojuego, setVideojuego] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [genero, setGenero] = useState("");
  const [fecha_lanzamiento, setFecha_lanzamiento] = useState("");
  const [completado, setCompletado] = useState(false);

  async function actualizarVideojuego(e) {
    e.preventDefault();
    const response = await fetch("/api/videojuego", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        update: {
          titulo: titulo,
          plataforma: plataforma,
          genero: genero,
          fecha_lanzamiento: fecha_lanzamiento,
          completado: completado,
        },
      }),
    });
    if (response.ok) {
      setIsEditing(false);
      fetchVideojuego();
    } else {
      console.error("Error al actualizar el videojuego");
    }
  }

  async function fetchVideojuego() {
    const url = "/api/videojuego/videojuegoind?id=" + id;
    const response = await fetch(url);
    const v = await response.json();
    setTitulo(v.titulo);
    setPlataforma(v.plataforma);
    setGenero(v.genero);
    setFecha_lanzamiento(v.fecha_lanzamiento);
    setCompletado(v.completado);
    setVideojuego(v);
  }

  useEffect(() => {
    fetchVideojuego();
  }, []);

  if (videojuego && !isEditing) {
    return (
      <div className="container">
        <h1>{videojuego.titulo}</h1>
        {console.log(videojuego)}
        <h2>{videojuego.plataforma}</h2>
        <p>{videojuego.genero}</p>
        <p>{videojuego.fecha_lanzamiento}</p>
        <p>{videojuego.completado ? "Completado" : "No completado"}</p>
        <button onClick={() => setIsEditing(true)}>Editar</button>
      </div>
    );
  } else if (videojuego && isEditing) {
    return (
      <form onSubmit={actualizarVideojuego}>
        <label>
          Titulo:
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Plataforma:
          <input
            type="text"
            value={plataforma}
            onChange={(e) => setPlataforma(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Género:
          <input
            type="text"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Fecha de lanzamiento:
          <input
            type="date"
            value={fecha_lanzamiento}
            onChange={(e) => setFecha_lanzamiento(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Completado:
          <input
            type="checkbox"
            checked={completado}
            onChange={(e) => setCompletado(e.target.checked)}
          />
        </label>
        <br />
        <input type="submit" value="Actualizar videojuego" />
      </form>
    );
  } else {
    return <p>No encontrado</p>;
  }
}
