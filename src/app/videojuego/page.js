"use client";

import React, { useState, useEffect } from "react";

export default function ListVideojuego() {
  const [videojuegos, setVideojuegos] = useState([]);

  async function fetchVideojuegos() {
    const response = await fetch("/api/videojuego");
    const body = await response.json();
    setVideojuegos(body);
  }

  useEffect(() => {
    fetchVideojuegos();
  }, []);

  async function deleteVideojuego(deleteID) {
    if (window.confirm("¿Seguro que quieres eliminarlo permanentemente?")) {
      const response = await fetch("/api/videojuego", {
        method: "DELETE",
        headers: { "Content-Type": "application-json" },
        body: JSON.stringify({ id: deleteID }),
      });
      alert("Eliminado correctamente");
      fetchVideojuegos();
    }
  }

  return (
    <div>
      <h1>Lista de videojuegos</h1>
      {videojuegos.map((videojuego) => (
        <p key={videojuego.id}>
          Titulo: {videojuego.titulo} || Plataforma: {videojuego.plataforma}{" "}
          <button onClick={() => deleteVideojuego(videojuego.id)}>
            Eliminar
          </button>
        </p>
      ))}
    </div>
  );
}
