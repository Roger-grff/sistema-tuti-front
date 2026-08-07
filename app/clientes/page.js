"use client";

import { useEffect, useState } from "react";

import {
    obtenerClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente
} from "@/services/clienteService";

export default function Clientes() {

    const [clientes, setClientes] = useState([]);

    const [id, setId] = useState(null);

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [cedula, setCedula] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");
    const [direccion, setDireccion] = useState("");

    async function cargarClientes() {

        const data = await obtenerClientes();

        setClientes(data);

    }

    useEffect(() => {

        cargarClientes();

    }, []);

    async function guardar() {

        const cliente = {

            nombre,
            apellido,
            cedula,
            telefono,
            correo,
            direccion

        };

        if (id === null) {

            await crearCliente(cliente);

        } else {

            await actualizarCliente(id, cliente);

        }

        limpiar();

        cargarClientes();

    }

    function editar(cliente) {

        setId(cliente.id);

        setNombre(cliente.nombre);
        setApellido(cliente.apellido);
        setCedula(cliente.cedula);
        setTelefono(cliente.telefono || "");
        setCorreo(cliente.correo || "");
        setDireccion(cliente.direccion || "");

    }

    async function eliminar(id) {

        if (!confirm("¿Eliminar cliente?")) return;

        await eliminarCliente(id);

        cargarClientes();

    }

    function limpiar() {

        setId(null);

        setNombre("");
        setApellido("");
        setCedula("");
        setTelefono("");
        setCorreo("");
        setDireccion("");

    }

    return (

        <div>

            <h1>Clientes</h1>

            <input
                placeholder="Nombre"
                value={nombre}
                onChange={(e)=>setNombre(e.target.value)}
            />

            <br /><br />

            <input
                placeholder="Apellido"
                value={apellido}
                onChange={(e)=>setApellido(e.target.value)}
            />

            <br /><br />

            <input
                placeholder="Cédula"
                value={cedula}
                onChange={(e)=>setCedula(e.target.value)}
            />

            <br /><br />

            <input
                placeholder="Teléfono"
                value={telefono}
                onChange={(e)=>setTelefono(e.target.value)}
            />

            <br /><br />

            <input
                placeholder="Correo"
                value={correo}
                onChange={(e)=>setCorreo(e.target.value)}
            />

            <br /><br />

            <input
                placeholder="Dirección"
                value={direccion}
                onChange={(e)=>setDireccion(e.target.value)}
            />

            <br /><br />

            <button onClick={guardar}>
                {id === null ? "Guardar" : "Actualizar"}
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
                        <th>Apellido</th>
                        <th>Cédula</th>
                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        clientes.map((c)=>(

                            <tr key={c.id}>

                                <td>{c.id}</td>

                                <td>{c.nombre}</td>

                                <td>{c.apellido}</td>

                                <td>{c.cedula}</td>

                                <td>

                                    <button
                                        onClick={()=>editar(c)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        onClick={()=>eliminar(c.id)}
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