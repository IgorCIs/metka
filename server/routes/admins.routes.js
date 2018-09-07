import { Router } from 'express'
import * as PostController from '../controllers/admins.controllers'

const router = new Router()


router.route('/admins/login').get(PostController.login)   

router.route('/admins/logout').get(PostController.logout)   

export default router