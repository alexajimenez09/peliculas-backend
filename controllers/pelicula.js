import Pelicula from "../models/pelicula.js"
import subirArchivo from "../helper/helperSubirArchivo.js"
import {v2 as cloudinary} from "cloudinary" 

const peliculaGet = async (req, res) => {
    const peliculas = await Pelicula.find()
    res.json({
        peliculas
    })
}

const peliculaTitulo = async (req, res) => {
    const { titulo } = req.query
    const peliculas = await Pelicula.find(
        {
            $or: [
                { titulo: new RegExp(titulo, "i") },
                { subtitulo: new RegExp(titulo, "i") }
            ]
        }
    )
    if (peliculas)
        res.json({ peliculas })
    else
        res.json(`${titulo} No encontrado`)
}

const peliculaPost = async (req, res) => {
    const { titulo, subtitulo, sinopsis, duracion, fechaPublicacion, categoria, reparto,creador } = req.body
    const pelicula = new Pelicula({ titulo, subtitulo, sinopsis, duracion, fechaPublicacion, categoria, reparto,creador })
    pelicula.save()
    res.json({ pelicula })
}

const peliculaDelete = async (req, res) => {
    const { titulo } = req.query
    const pelicula = await Pelicula.findOneAndDelete({ titulo })
    res.json({
        msg: ` ${titulo} Ha sido eliminada`
    })
}

const peliculaId = async (req, res) => {
    const { _id } = req.params
    const pelicula = await Pelicula.findById({ _id })
    res.json({
        pelicula
    })
}


const posterPost = async (req, res) => {
    const { poster } = req.body
    const imagen = new Pelicula({ poster })
    imagen.save()
    res.json({ imagen })
}

const cargarArchivo= async (req, res) => {
    const { id } = req.params;
    try {
        let nombre
        await subirArchivo(req.files, undefined)
            .then(value => nombre = value)
            .catch((err) => console.log(err));
  
        //persona a la cual pertenece la foto
        let pelicula = await Pelicula.findById(id);
        if (pelicula.foto) {
            const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
            const pathImage = path.join(__dirname, '../uploads/', pelicula.foto);
            
            if (fs.existsSync(pathImage)) {
                console.log('Existe archivo');
                fs.unlinkSync(pathImage)
            }
            
        }
       
        pelicula = await Pelicula.findByIdAndUpdate(id, { poster: nombre })
        //responder
        res.json({ nombre });
    } catch (error) {
        res.status(400).json({ error, 'general': 'Controlador' })
    }
  
}

const editarPeli = async (req, res) => {
    const { id } = req.params;
    const { createAt, ...resto } = req.body
    const editar = await Pelicula.findByIdAndUpdate(id, resto);

    res.json({ editar })
}

const buscarActor= async(req,res)=>{
    const {nombre}=req.query
    const actores=await Pelicula.find( {
        $or: [
            { nombre: new RegExp(nombre, "i") },
            { alias: new RegExp(nombre, "i") }
        ]
    })
    if (actores)
        res.json({actores})
    else
        res.json(`${nombre} No encontrado`)
}


const cargarArchivoCloud=async (req, res) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
        secure: true
    });
  
    const { id } = req.params;
    try {
        //subir archivo
  
        const { tempFilePath } = req.files.archivo
        cloudinary.uploader.upload(tempFilePath,
            { width: 250, crop: "limit" },
            async function (error, result) {
                if (result) {
                    let holder = await Pelicula.findById(id);
                    if (holder.poster) {
                        const nombreTemp = holder.poster.split('/')
                        const nombreArchivo = nombreTemp[nombreTemp.length - 1] // hgbkoyinhx9ahaqmpcwl jpg
                        const [public_id] = nombreArchivo.split('.')
                        cloudinary.uploader.destroy(public_id)
                    }
                    holder = await Pelicula.findByIdAndUpdate(id, { poster: result.url })
                    //responder
                    res.json({ url: result.url });
                } else {
                    res.json(error)
                }
  
            })
    } catch (error) {
        res.status(400).json({ error, 'general': 'Controlador' })
    }
}
  
  
  
  
const mostrarImagenCloud= async (req, res) => {
    const { id } = req.params
  
    try {
        let holder = await Pelicula.findById(id)
        if (holder.poster) {
            return res.json({ url: holder.poster })
        }
                res.status(400).json({ msg: 'Falta Imagen' })
            } catch (error) {
                res.status(400).json({ error })
  
                }
}



export { peliculaGet, peliculaTitulo, peliculaPost, peliculaDelete, peliculaId, posterPost, editarPeli,buscarActor,cargarArchivo,cargarArchivoCloud,mostrarImagenCloud}