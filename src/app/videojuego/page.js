"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function ListVideojuego() {
  const [videojuegos, setVideojuegos] = useState([]);
  const [filtro, setFiltro] = useState("");

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

  const videojuegosFiltrados = videojuegos.filter((videojuego) =>
    videojuego.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div>
      <h1>Lista de videojuegos</h1>
      <input
        type="text"
        placeholder="Filtrar por título"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />
      <br />
      {videojuegosFiltrados.map((videojuego) => (
        <p key={videojuego.id}>
          <Link href={"/videojuego/" + videojuego.id}>
            {" "}
            Titulo: {videojuego.titulo} || Plataforma: {videojuego.plataforma}{" "}
          </Link>
          <button onClick={() => deleteVideojuego(videojuego.id)}>
            Eliminar
          </button>
        </p>
      ))}
      <br />
      <Link href={"/videojuego/create"}>Agregar videojuego</Link>
    </div>
  );
}
