import { supabase } from "@/lib/supabase";

// Obtener todos los productos
export async function obtenerProductos() {

    const { data, error } = await supabase
        .from("productos")
        .select("*")
        .order("id");

    if (error) throw error;

    return data;

}

// Crear producto
export async function crearProducto(producto) {

    const { error } = await supabase
        .from("productos")
        .insert(producto);

    if (error) throw error;

}

// Actualizar producto
export async function actualizarProducto(id, producto) {

    const { error } = await supabase
        .from("productos")
        .update(producto)
        .eq("id", id);

    if (error) throw error;

}

// Eliminar producto
export async function eliminarProducto(id) {

    const { error } = await supabase
        .from("productos")
        .delete()
        .eq("id", id);

    if (error) throw error;

}