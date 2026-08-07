"use client";

import { useEffect, useState } from "react";

import {
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
} from "@/services/usuarioService";

export default function Usuarios() {

    const [usuarios, setUsuarios] = useState([]);

    const [id, setId] = useState(null);

    const [nombre, setNombre] = useState("");

    const [usuario, setUsuario] = useState("");

    const [password, setPassword] = useState("");

    async function cargarUsuarios() {

        const data = await obtenerUsuarios();

        setUsuarios(data);

    }

    useEffect(() => {

        cargarUsuarios();

    }, []);

    async function guardar() {

        const datos = {

            nombre,

            usuario,

            password

        };

        if (id === null) {

            await crearUsuario(datos);

        } else {

            await actualizarUsuario(id, datos);

        }

        limpiar();

        cargarUsuarios();

    }

    function editar(usuarioSeleccionado) {

        setId(usuarioSeleccionado.id);

        setNombre(usuarioSeleccionado.nombre);

        setUsuario(usuarioSeleccionado.usuario);

        setPassword(usuarioSeleccionado.password);

    }

    async function eliminar(id) {

        if (!confirm("¿Eliminar usuario?")) return;

        await eliminarUsuario(id);

        cargarUsuarios();

    }

    function limpiar() {

        setId(null);

        setNombre("");

        setUsuario("");

        setPassword("");

    }

    return (

        <div>

            <h1>Usuarios</h1>

            <input
                placeholder="Nombre"
                value={nombre}
                onChange={(e)=>setNombre(e.target.value)}
            />

            <br /><br />

            <input
                placeholder="Usuario"
                value={usuario}
                onChange={(e)=>setUsuario(e.target.value)}
            />

            <br /><br />

            <input
                placeholder="Contraseña"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={guardar}>

                {id===null ? "Guardar" : "Actualizar"}

            </button>

            <button onClick={limpiar}>

                Nuevo

            </button>

            <br /><br />

            <table border="1">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Nombre</th>

                        <th>Usuario</th>

                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        usuarios.map((u)=>(

                            <tr key={u.id}>

                                <td>{u.id}</td>

                                <td>{u.nombre}</td>

                                <td>{u.usuario}</td>

                                <td>

                                    <button
                                        onClick={()=>editar(u)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        onClick={()=>eliminar(u.id)}
                                    >
                                        Eliminar
                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}