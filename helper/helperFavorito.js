import Favorito from "../models/favorito.js"

const helpersFavoritos = {
    existeFavoritoById: async (id) => {
        const existe = await Favorito.findById(id)
        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    }
}
export default helpersFavoritos