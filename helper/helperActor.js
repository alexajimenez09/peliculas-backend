import Actor from "../models/actor.js"

const helpersActores = {
    existeActorById: async (id) => {
        const existe = await Actor.findById(id)
        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    }
}
export default helpersActores