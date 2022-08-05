import Actor from "../models/actor.js"


const actorGet= async(req,res)=>{
    const actores =await Actor.find()
    res.json({
        actores
    })
}

const actorID= async(req,res)=>{
    const {_id}=req.params
    const actor= await Actor.find(_id)
    res.json({
        actor
    })
}

const actorNombre= async(req,res)=>{

    const {id}=req.params;
    const peliculas = await Pelicula.find().where('reparto.idactor').in(id).exec();
    res.json({
        peliculas
    })
}

const fotoPost = async (req, res) => {
    const { foto } = req.body
    const imagen = new Actor({ foto })
    imagen.save()
    res.json({ imagen })
}

const actorPost=async(req,res)=>{
    const{nombre,biografia,alias,foto}=req.body
    const actor= new Actor({nombre,biografia,alias,foto})
    actor.save()
    res.json({actor})
}



const actorDelete=async(req,res)=>{
    const {nombre}=req.query
    const actor=await Actor.findOneAndDelete({nombre}) 
    res.json({
        msg:` ${nombre} Ha sido eliminada`
    })
}
const editarActor = async (req, res) => {
    const { _id } = req.params;
    const { createAt, ...resto } = req.body
    const editar = await Actor.findByIdAndUpdate(id, resto);

    res.json({ editar })
}

export {actorGet,actorNombre,actorPost,actorDelete,fotoPost,actorID,editarActor }