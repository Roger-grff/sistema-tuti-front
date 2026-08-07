import { supabase } from "@/lib/supabase";

// Obtener clientes
export async function obtenerClientes() {

    const { data, error } = await supabase
        .from("clientes")
        .select("*")
        .order("nombre");

    if (error) throw error;

    return data;

}

// Obtener productos
export async function obtenerProductos() {

    const { data, error } = await supabase
        .from("productos")
        .select("*")
        .order("nombre");

    if (error) throw error;

    return data;

}