import { Router } from 'express'
import * as PostController from './../controllers/admins.controllers'

const router = new Router()


router.route('/admins').get(PostController.login)   

export default router