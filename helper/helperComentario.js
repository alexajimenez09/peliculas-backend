import Comentario from "../models/comentario.js"

const helpersComentarios = {
    existeComentarioById: async (id) => {
        const existe = await Comentario.findById(id)
        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    }
}
export default helpersComentarios