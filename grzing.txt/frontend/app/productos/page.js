"use client";

import { useEffect, useState } from "react";

import {
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} from "@/services/productoService";

export default function Productos() {

    const [productos, setProductos] = useState([]);

    const [id, setId] = useState(null);

    const [codigo, setCodigo] = useState("");
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");

    async function cargarProductos() {

        const data = await obtenerProductos();

        setProductos(data);

    }

    useEffect(() => {

        cargarProductos();

    }, []);

    async function guardar() {

        const producto = {

            codigo,
            nombre,
            descripcion,
            precio: Number(precio),
            stock: Number(stock)

        };

        if (id === null) {

            await crearProducto(producto);

        } else {

            await actualizarProducto(id, producto);

        }

        limpiar();

        cargarProductos();

    }

    function editar(producto) {

        setId(producto.id);

        setCodigo(producto.codigo);
        setNombre(producto.nombre);
        setDescripcion(producto.descripcion || "");
        setPrecio(producto.precio);
        setStock(producto.stock);

    }

    async function eliminar(id) {

        if (!confirm("¿Eliminar producto?")) return;

        await eliminarProducto(id);

        cargarProductos();

    }

    function limpiar() {

        setId(null);

        setCodigo("");
        setNombre("");
        setDescripcion("");
        setPrecio("");
        setStock("");

    }

    return (

        <div>

            <h1>Productos</h1>

            <input
                placeholder="Código"
                value={codigo}
                onChange={(e)=>setCodigo(e.target.value)}
            />

            <br /><br />

            <input
                placeholder="Nombre"
                value={nombre}
                onChange={(e)=>setNombre(e.target.value)}
            />

            <br /><br />

            <input
                placeholder="Descripción"
                value={descripcion}
                onChange={(e)=>setDescripcion(e.target.value)}
            />

            <br /><br />

            <input
                type="number"
                placeholder="Precio"
                value={precio}
                onChange={(e)=>setPrecio(e.target.value)}
            />

            <br /><br />

            <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e)=>setStock(e.target.value)}
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
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        productos.map((p)=>(

                            <tr key={p.id}>

                                <td>{p.id}</td>

                                <td>{p.codigo}</td>

                                <td>{p.nombre}</td>

                                <td>${p.precio}</td>

                                <td>{p.stock}</td>

                                <td>

                                    <button
                                        onClick={()=>editar(p)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        onClick={()=>eliminar(p.id)}
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