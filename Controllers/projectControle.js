const projects = require("../Models/projectmodel")


exports.addProject = async (req, res) => {

    const { title, description, technologies, website, gitHub } = req.body

    // image access from multer
    const coverImg = req.file?.filename

    // access userId from request payload bcz this logic contain jwtmiddleware
    const userId = req.payload

    try {
        const existingProject = await projects.findOne({ gitHub })
        if (existingProject) {
            res.status(400).json(`${existingProject.title} is already exist! add new one`)
        }
        else {
            const newProject = new projects({
                title, description, technologies, website, gitHub, userId, coverImg
            })
            newProject.save()
            res.status(201).json(newProject)
        }
    }
    catch {
        res.status(400).json("add project api failed")

    }
}

exports.getHomeProjects = async (req, res) => {
    try {
        const homeProjects = await projects.find().limit(3)
        if (homeProjects) {
            res.status(200).json(homeProjects)
        }
    }
    catch {
        res.status(400).json("get home projects api failed")
    }

}

exports.allProjects = async (req, res) => {

    // access query param from api
    const searchData = req.query.search

    try {
        const allProjects = await projects.find({ technologies: { $regex: searchData, $options: "i" } })
        // i= case insensitive
        if (allProjects) {
            res.status(200).json(allProjects)
        }
    }
    catch {
        res.status(400).json("get all projects api failed")
    }

}


exports.getUserProjects = async (req, res) => {
    const userId = req.payload

    try {
        const userProjects = await projects.find({ userId })
        if (userProjects) {
            res.status(200).json(userProjects)
        }
    }
    catch (error) {
        res.status(400).json(error)
    }

}


exports.editProject = async (req, res) => {

    const { _id } = req.params
    const { title, description, technologies, website, gitHub, coverImg } = req.body
    const newCoverImg = req.file ? req.file.filename : coverImg
    const userId = req.payload

    try {
        const updatedProject = await projects.findByIdAndUpdate({ _id },
            { title, description, technologies, coverImg: newCoverImg, website, gitHub, userId },
            { new: true }
        )
        await updatedProject.save()
        res.status(200).json(updatedProject)
    }
    catch (error) {
        res.status(400).json(error)
    }

}

exports.deleteProject = async (req, res) => {

    const { _id } = req.params

    try {
        const deletedProject = await projects.findByIdAndDelete({ _id })
        res.status(200).json(deletedProject)
    }
    catch (error) {
        res.status(400).json(error)
    }

}