const { slugify } = require("../helpers/utils");
const user = require("../models/authSchema");
const projectSchema = require("../models/projectSchema");

const createProject = async (req, res) => {
  const { title, description } = req.body;
  try {
    const slug = slugify(title);
    const project = await new projectSchema({
      title,
      description,
      slug,
      author: req.user._id,
    });
    await project.save();
    res.status(200).send({ message: "Project Created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server Error");
  }
};

const projectList = async (req, res) => {
  const { search } = req.query;
  console.log(search);
  const projects = await projectSchema
    .find({
      $or: [
        {
          author: req.user._id,
        },
        {
          members: req.user._id,
        },
      ],
      title: { $regex: search || " ", $options: "i" },
    })
    .populate("author", "fullname avatar");
  try {
    if (!projects) {
      return res.status(400).send({ message: "Project not found " });
    }
    res.status(200).send({ projects });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server Error");
  }
};

const addTeamMemberToProject = async (req, res) => {
  const { email, projectId } = req.body;
  try {
    const existemail = await user.findOne({ email });
    if (!existemail)
      return res.status(400).send({ message: "Email not exist" });
    const existmember = await projectSchema.findOne({
      _id:projectId,
      $or: [
        {
          author: existemail._id,
        },
        {
          members: existemail._id,
        },
      ],
    });
    if (existmember)
      return res.status(400).send({ message: "This member already exist" });
    const project = await projectSchema.findOneAndUpdate(
      { _id: projectId },
      { members: existemail._id },
      { return: true },
    );
    if (!project)
      return res.status(400).send({ message: "Invalidate Request" });
    return res.status(200).send({ message: "Team member added successfully" });
  } catch (err) {
    console.log(err);
  }
};

const addTaskToProject = async (req, res) => {
  const { title, description, priority, assignedTo, projectId } = req.body;

  try {
    if (!title)
      return res.status(400).send({ message: "Task title is required" });

    if (!description)
      return res.status(400).send({ message: "Task description is required" });

    if (!priority)
      return res.status(400).send({ message: "Task priority is required" });

    if (!["mid", "low", "high"].includes(priority))
      return res.status(400).send({ message: "Invalid priority value" });


    if(assignedTo && !Array.isArray(assignedTo)) return res.status(400).send({message:"Invalid assigned data"})

    if(assignedTo) {
       for(let userId of assignedTo){
         const existmember=await projectSchema.findOne({
           _id:projectId,
           $or:[{author:userId},{members:userId}],
         }) ;
         if(!existmember) return res.status(400).send({message:"Inavlid user"});
       }
    }  

    const projectData = await projectSchema.findOneAndUpdate(
      { _id: projectId },
      {tasks:{ title, description, priority, assignedTo, projectId }},
      {members:assignedTo},
      { return: true },
    );

    if (!projectId)
      return res.status(400).send({ message: "Project not found" });

    return res.status(200).send({message:"Task created successfully",projectData})

  } catch (err) {
     console.log(err)
 
  }
};

module.exports = { createProject, projectList, addTeamMemberToProject,addTaskToProject };
