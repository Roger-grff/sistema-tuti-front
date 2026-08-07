import { supabase } from "@/lib/supabase";

export async function login(usuario, password) {

    const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("usuario", usuario)
        .single();

    if (error || !data) {
        return {
            success: false,
            message: "Usuario incorrecto."
        };
    }

    if (data.password !== password) {
        return {
            success: false,
            message: "Contraseña incorrecta."
        };
    }

    return {
        success: true,
        usuario: data
    };

}