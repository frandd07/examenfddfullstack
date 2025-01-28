import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eyaraedkwjgspknimmfb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5YXJhZWRrd2pnc3BrbmltbWZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjI4MTgsImV4cCI6MjA1MjMzODgxOH0.6GEOM6YASqLMdFYTmNW7ceebdOKKxtVMQjUqlm8VWWg";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  const { data: videojuego, error } = await supabase
    .from("videojuego")
    .select("id,titulo,plataforma,completado")
    .order("titulo", { ascending: true });

  if (error) {
    return new Response(JSON.stringify(error), { status: 404 });
  }

  return new Response(JSON.stringify(videojuego), { status: 200 });
}

export async function PUT(request) {
  const body = await request.json();
  const id = body.id;

  if (id && typeof body.completado !== "undefined") {
    const { data: updateData, error } = await supabase
      .from("videojuego")
      .update({ completado: body.completado })
      .eq("id", id);

    if (error) {
      return new Response(JSON.stringify(error), { status: 400 });
    }

    return new Response(JSON.stringify({ success: "actualizado" }), {
      status: 200,
    });
  }

  return new Response(JSON.stringify({ error: "Faltan datos" }), {
    status: 400,
  });
}

export async function DELETE(request) {
  const body = await request.json();
  const id = body.id;

  const { data: deleteData, error } = await supabase
    .from("videojuego")
    .delete()
    .eq("id", id);

  if (error) {
    return new Response(JSON.stringify(error), { status: 404 });
  }

  return new Response(JSON.stringify({ success: "eliminado con éxito" }), {
    status: 200,
  });
}

export async function POST(request) {
  const body = await request.json();
  const videojuego = body.videojuego;

  if (
    videojuego.titulo !== "" &&
    videojuego.plataforma !== "" &&
    videojuego.genero !== ""
  ) {
    const { data: postData, error } = await supabase
      .from("videojuego")
      .insert(videojuego);
    if (!error) {
      return new Response(JSON.stringify({ success: "Creado con éxito" }), {
        status: 201,
      });
    }
  } else {
    return new Response(JSON.stringify(error), { status: 400 });
  }
}
