"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/authService";

export default function LoginPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  async function IniciarSesion() {
    setMensaje("");
    const respuesta = await login(usuario, password);
    if(!respuesta.success){
      setMensaje(respuesta.message);
      return;
    }
    localStorage.setItem(
      "usuario",JSON.stringify(respuesta.usuario)
    );
    router.push("/dashboard")
  }
  return (
    <div>
      <h1>Sistema Supermercado</h1>

      <input type="text" placeholder="Usuario" value={usuario} 
      onChange={(e)=>setUsuario(e.target.value)} />
      <br />

      <input type="password" placeholder="Contraseña" value={password}
      onChange={(e)=> setPassword(e.target.value)} />
      <br />

      <button onClick={IniciarSesion}>Iniciar sesión</button>
      <br/>
      <p>{mensaje}</p>
    </div>
  );
}