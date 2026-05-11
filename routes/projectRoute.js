const express=require("express");
const { createProject, projectList, addTeamMemberToProject, addTaskToProject, addSubTasks } = require("../controllers/projectController");
const router=express.Router();

router.post("/create",createProject)
router.get("/list",projectList)
router.post("/:projectId/addmember",addTeamMemberToProject)
router.post("/:projectId/addTaskToProject",addTaskToProject)
router.post("/:projectId/tasks/:taskId/addTaskToProject",addSubTasks)

module.exports=router