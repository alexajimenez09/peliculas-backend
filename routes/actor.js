import {Router} from "express"
import { actorGet,actorNombre,actorPost,actorDelete,fotoPost,actorID,editarActor} from "../controllers/actor.js"

const router=new Router()

router.get('/buscar',actorGet)

router.get('/nombre/:nombre',actorNombre)

router.post('/foto',fotoPost)

router.get('/:_id',actorID)

router.get('/')

router.put('/editar/_id',editarActor)

router.post('/',/* [
    check('nombre').not().isEmpty,
    check('nombre').isLength({min:7,max:12}),
    check('foto').isLength({min:7,max:12}),
], */ actorPost)

router.delete('/eliminar',actorDelete)

export default router