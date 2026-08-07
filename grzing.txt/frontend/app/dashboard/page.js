"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();

  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const datos = localStorage.getItem("usuario");

    if (datos) {
      setUsuario(JSON.parse(datos));
    }

    setCargando(false);
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    router.push("/login");
  };

  if (cargando) {
    return <p>Cargando...</p>;
  }

  if (!usuario) {
    return (
      <div>
        <p>No hay sesión activa</p>
        <button onClick={() => router.push("/login")}>
          Ir al login
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bienvenido {usuario.nombre}</p>

      <br />

      <Link href="/usuarios">
        <button>Usuarios</button>
      </Link>

      <br />

      <Link href="/clientes">
        <button>Clientes</button>
      </Link>

      <br />

      <Link href="/productos">
        <button>Productos</button>
      </Link>

      <br />

      <Link href="/pedidos">
        <button>Pedidos</button>
      </Link>

      <br /><br />

      <button onClick={cerrarSesion}>
        Cerrar sesión
      </button>
    </div>
  );
}