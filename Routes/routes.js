const express=require('express')
const { register, login, editProfile } = require('../Controllers/userControle')
const upload = require('../middlewares/multermiddleware')
const { addProject, getHomeProjects, allProjects, getUserProjects, editProject, deleteProject } = require('../Controllers/projectControle')
const { jwtMiddleware } = require('../middlewares/jwtMiddleware')


// create an object for router
const router=new express.Router()

// register
router.post('/user/register',register)

// login
router.post('/user/login',login)

// add project                         //key of file in bodyData
router.post('/user/add-project',jwtMiddleware,upload.single('coverImg'),addProject)

// get project

// get 3 projects for home page
router.get('/home-projects',getHomeProjects)
// all projects
router.get('/all-projects',allProjects)
// user project
router.get('/user-projects',jwtMiddleware,getUserProjects)

// edit projects
router.put('/user/:_id/edit-project',jwtMiddleware,upload.single('coverImg'),editProject)

// delete project
router.delete('/user/delete-project/:_id',jwtMiddleware,deleteProject)

// edit profile
router.put('/user/:_id/edit-profile',jwtMiddleware,upload.single('profile'),editProfile)


module.exports=router