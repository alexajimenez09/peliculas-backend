import {Router} from "express"
import { peliculaGet,peliculaTitulo,peliculaPost,peliculaDelete,peliculaId,posterPost,editarPeli, buscarActor,cargarArchivo,cargarArchivoCloud,mostrarImagenCloud} from "../controllers/pelicula.js"
import {validarCampos} from "../middlewares/middlewares.js"
import { check } from "express-validator"
import { validarJWT } from "../middlewares/validarToken.js"
import validarExistaArchivo from "../middlewares/validar-exista-archivo.js"
import helpersPeliculas from "../helper/helperpelicula.js"


const router=new Router()


router.get('/',[
    
    validarCampos
],peliculaGet)//listar todas las peliculas

router.get('/:_id',[
    check('_id','Maximo de 30').not().isLength({max:30}),
    check('_id', 'El nombre no puede ir vacío!').not().isEmpty(),
    validarCampos
],peliculaId)//buscar pelicula por id

router.post('/poster',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(), 
    validarCampos
],posterPost)//inertar poster 

router.post('/upload/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersPeliculas.existePeliculaById), 
    validarExistaArchivo,
    validarCampos
],cargarArchivo)

router.put('/:id',[
    check('titulo', 'El titulo es obligatorio!').not().isEmpty(),
    check('titulo').isLength({max:50}),

    check('subtitulo', 'El titulo es obligatorio!').not().isEmpty(),
    check('subtitulo').isLength({max:50}),

    check('sinopsis', 'La sinopsis es obligatoria!').not().isEmpty(),
    check('sinopsis').isLength({max:500}),

    check('duracion', 'La duracion es obligatoria!').not().isEmpty(),
    check('duracion','Duracion debe ser obligatoria').isLength({max:10}),

    check('fechaPublicacion').isLength({max:50}),
    check('fechaPublicacion', 'La fecha de publicación es obligatoria!').not().isEmpty(),

    check('categoria').isLength({max:50}),
    check('categoria', 'La categoria es obligatoria!').not().isEmpty(),

    check('reparto').custom( helpersPeliculas.existeTitulo ),
    check('reparto').isLength({max:50}),
    check('personaje').isLength({max:25}),
    check('rol').isLength({max:15}),
    
    check('creador', 'El nombre del creador es obligatoria!').not().isEmpty(),
    check('creador').isLength({max:25}),
    validarCampos      
],editarPeli)//editar los datos de la pelicula */

router.get('/actor',[
    check('nombre','Maximo de 30').not().isLength({max:30}),
    check('nombre', 'El nombre no puede ir vacío!').not().isEmpty(),
    validarCampos
],buscarActor)

router.get('/titulo',[
    check('titulo','Maximo de 50').not().isLength({max:50}),
    check('titulo', 'El titulo no puede ir vacío!').not().isEmpty(),
    validarCampos
],peliculaTitulo)//buscar por titulo

router.post('/subir', [    
    
    check('titulo', 'El titulo es obligatorio!').not().isEmpty(),
    check('titulo').custom( helpersPeliculas.existeTitulo ),
    check('titulo').isLength({max:50}),

    check('subtitulo', 'El titulo es obligatorio!').not().isEmpty(),
    check('subtitulo').custom( helpersPeliculas.existeSubTitulo ),
    check('subtitulo').isLength({max:50}),

    check('sinopsis', 'La sinopsis es obligatoria!').not().isEmpty(),
    check('sinopsis').isLength({max:500}),

    check('duracion', 'La duracion es obligatoria!').not().isEmpty(),

    check('fechaPublicacion').isLength({max:50}),
    check('fechaPublicacion', 'La fecha de publicación es obligatoria!').not().isEmpty(),

    check('categoria').isLength({max:50}),
    check('categoria', 'La categoria es obligatoria!').not().isEmpty(),

    
    check('reparto').custom( helpersPeliculas.existeTitulo ),
    check('reparto').isLength({max:50}),
    check('personaje').isLength({max:25}),
    check('rol').isLength({max:15}),
    

    check('creador', 'El nombre del creador es obligatoria!').not().isEmpty(),
    check('creador').isLength({max:25}),
 

    validarCampos       
],peliculaPost)

router.post('/upload/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersPeliculas.existePeliculaById), 
    validarExistaArchivo,
    validarCampos
],cargarArchivo)


router.post('/uploadcloud/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersPeliculas.existePeliculaById), 
    validarExistaArchivo,
    validarCampos
],cargarArchivoCloud)


router.get('/uploadcloud/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersPeliculas.existePeliculaById), 
    validarExistaArchivo,
    validarCampos
],mostrarImagenCloud)

router.delete('/eliminar',peliculaDelete)

export default router