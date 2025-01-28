"use client";

import { useState } from "react";
import Link from "next/link";

export default function CreateVideojuego() {
  const [titulo, setTitulo] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [genero, setGenero] = useState("");
  const [fechaLanzamiento, setFechaLanzamiento] = useState("");
  const [completado, setCompletado] = useState(false);

  async function crearVideojuego(e) {
    e.preventDefault();

    if (titulo !== "" && plataforma !== "" && genero !== "") {
      try {
        const response = await fetch("/api/videojuego", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            videojuego: {
              titulo: titulo,
              plataforma: plataforma,
              genero: genero,
              fecha_lanzamiento: fechaLanzamiento,
              completado: completado,
            },
          }),
        });
        if (response.ok) {
          alert("Videojuego creado exitosamente.");
          window.location.href = "/videojuego";
          setTitulo("");
          setPlataforma("");
          setGenero("");
          setFechaLanzamiento("");
          setCompletado(false);
        } else {
          alert("Hubo un error al crear el videojuego.");
        }
      } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        alert("Error al crear el videojuego. Por favor, inténtalo de nuevo.");
      }
    } else {
      alert("Algún campo vacío");
    }
  }

  return (
    <div className="container">
      <h1>Añadir Videojuego</h1>
      <form onSubmit={crearVideojuego}>
        <label>
          Título:
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
            value={fechaLanzamiento}
            onChange={(e) => setFechaLanzamiento(e.target.value)}
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
        <input
          className="botonAnadir"
          type="submit"
          value="Añadir Videojuego"
        />
      </form>
    </div>
  );
}
