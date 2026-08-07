"use client";

import { useEffect, useState } from "react";

import {
    obtenerClientes,
    obtenerProductos
} from "@/services/pedidoService";

export default function Pedidos() {

    const [clientes, setClientes] = useState([]);

    const [productos, setProductos] = useState([]);

    useEffect(() => {

        cargar();

    }, []);

    async function cargar() {

        setClientes(await obtenerClientes());

        setProductos(await obtenerProductos());

    }

    return (

        <div>

            <h1>Pedidos</h1>

            <h3>Cliente</h3>

            <select>

                <option>Seleccione...</option>

                {

                    clientes.map(cliente=>(

                        <option
                            key={cliente.id}
                            value={cliente.id}
                        >

                            {cliente.nombre} {cliente.apellido}

                        </option>

                    ))

                }

            </select>

            <br /><br />

            <h3>Producto</h3>

            <select>

                <option>Seleccione...</option>

                {

                    productos.map(producto=>(

                        <option
                            key={producto.id}
                            value={producto.id}
                        >

                            {producto.nombre}

                        </option>

                    ))

                }

            </select>

            <br /><br />

            <input
                type="number"
                placeholder="Cantidad"
            />

            <br /><br />

            <button>

                Agregar

            </button>

        </div>

    );

}