import { supabase } from "@/lib/supabase";

// Obtener todos los clientes
export async function obtenerClientes() {

    const { data, error } = await supabase
        .from("clientes")
        .select("*")
        .order("id");

    if (error) throw error;

    return data;
}

// Crear cliente
export async function crearCliente(cliente) {

    const { error } = await supabase
        .from("clientes")
        .insert(cliente);

    if (error) throw error;

}

// Actualizar cliente
export async function actualizarCliente(id, cliente) {

    const { error } = await supabase
        .from("clientes")
        .update(cliente)
        .eq("id", id);

    if (error) throw error;

}

// Eliminar cliente
export async function eliminarCliente(id) {

    const { error } = await supabase
        .from("clientes")
        .delete()
        .eq("id", id);

    if (error) throw error;

}