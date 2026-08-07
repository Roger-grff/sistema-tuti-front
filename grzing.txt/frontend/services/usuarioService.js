import { supabase } from "@/lib/supabase";

// Obtener todos los usuarios
export async function obtenerUsuarios() {

    const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .order("id");

    if (error) throw error;

    return data;
}

// Obtener un usuario por ID
export async function obtenerUsuario(id) {

    const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw error;

    return data;

}

// Crear usuario
export async function crearUsuario(usuario) {

    const { error } = await supabase
        .from("usuarios")
        .insert(usuario);

    if (error) throw error;

}

// Actualizar usuario
export async function actualizarUsuario(id, usuario) {

    const { error } = await supabase
        .from("usuarios")
        .update(usuario)
        .eq("id", id);

    if (error) throw error;

}

// Eliminar usuario
export async function eliminarUsuario(id) {

    const { error } = await supabase
        .from("usuarios")
        .delete()
        .eq("id", id);

    if (error) throw error;

}