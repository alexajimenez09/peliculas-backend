import {Router} from "express"
import { usuarioGet, usuarioId, usuarioNombre, usuarioPut,usuarioEmail, usuarioLogin, usuarioPost,usuarioDelete,PutActivate,PutDeActivate} from "../controllers/persona.js"
import {validarCampos} from "../middlewares/middlewares.js"
import { check } from "express-validator"
import helpersUsuarios from "../helper/helperPersona.js"
import { validarJWT } from "../middlewares/validarToken.js"

const router=new Router()

router.get('/',[
    

], usuarioGet)

router.get('/',[
    validarJWT,
    check('id', 'ingrese el id').not().isEmpty(),
    validarCampos
], usuarioId)

router.get('/nombre',[
    validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('nombre', 'el nombre debe tener maximo 25 caracteres').isLength({ max: 25}),
    validarCampos
], usuarioNombre)

router.get('/', [
    validarJWT,
    check('email').custom( helpersUsuarios.existeEmail ),
],usuarioEmail)

router.put('/modificar/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio!').not().isEmpty(),
    check('nombre', 'el nombre debe tener maximo 25 caracteres').isLength({ max: 25}),

    check('apellido', 'El apellido es obligatorio!').not().isEmpty(),
    check('apellido', 'El apellido debe tener 25 caracteres').isLength({ max: 25}),

    check('edad', 'Ingrese el campo edad ').not().isEmpty(),

    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( helpersUsuarios.existeEmail ),

    check('password', 'llene el campo de contraseña').not().isEmpty(),
    check('password', 'Password no es válido').isLength({ min: 8}),
    validarCampos
], usuarioPut)

router.post('/login',[
    
    check('email', 'El correo no es válido').isEmail(),
    check('password').not().isEmpty(),
    validarCampos
], usuarioLogin)

router.post('/', [    
    
    check('nombre', 'El nombre es obligatorio!').not().isEmpty(),
    check('nombre', 'El nombre debe tener como máximo 25 caracteres ').isLength({ max: 25}),

    check('apellido', 'El apellido es obligatorio!').not().isEmpty(),
    check('apellido', 'El apellido debe tener como máximo 25 caracteres ').isLength({ max: 25}),

    check('email', 'El email es obligatorio!').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( helpersUsuarios.existeEmail),

    check('password', 'Password no es válido').isLength({ min: 6}),
    check('password', 'La contraseña es obligatoria!').not().isEmpty(),


    validarCampos       
],  usuarioPost)

router.delete('/delete',[
    validarJWT,
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( helpersUsuarios.existeEmail ),
], usuarioDelete)

router.put('/activo/:id', [
    validarJWT,
    check('id', 'ingrese el id').not().isEmpty(),
    check('id').custom( helpersUsuarios.existeUsuarioById ),
    validarCampos
], PutActivate)

router.put('/inactivo/:id',[
    validarJWT,
    check('id', 'ingrese el id').not().isEmpty(),
    check('id').custom( helpersUsuarios.existeUsuarioById ),
    validarCampos
], PutDeActivate)

export default router