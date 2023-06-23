
const employee = require('../model/Employee');


const getAllEmployeees = async(req,res)=>{
    const foundEmp = await employee.find();
    if(!foundEmp)return res.status(400).json({'message':'Couldnt find employees'});
    res.json(foundEmp);
};

const createNewEmployee =async (req,res)=>{
 if(!req?.body?.firstname|| !req?.body?.lastname) {
 return res.status(400).json({'message':'First and last name are required'});
 }

 try{
    const result = await employee.create({
        firstname:req.body.firstname,
        lastname:req.body.lastname
});
res.status(201).json(result);
 } 
    
  catch(err){
    console.error(err)
}
 
};

const updateEmployee = async(req,res)=>{
if(!req?.body?.id){
return res.status(400).json({'message':'ID is required!'});
}
const Employee = await employee.findOne({_id: req.body.id}).exec();
    if(!Employee){
        return res.status(204).json({
            'message':`Employee ID ${req.body.id} does not match the ID`
        });
    };
    if (req.body?.firstname) Employee.firstname = req.body.firstname;
    if (req.body?.lastname) Employee.lastname = req.body.lastname;
    
    const result= await  Employee.save();
    res.json(result);
    

   };

const deleteEmployee = async(req,res)=>{

    if(!req?.body?.id)return res.status(400).json({
        'message':'ID is required!'
    });

   const Employee =await employee.findOne({_id:req.body.id}).exec();
   if(!Employee){
    return res.status(204).json({'message':`Employee ID ${req.body.id} did not match`});
   };
   
   const result = await employee.deleteOne({_id:req.body.id});
   res.json(result);
 };

 const getEmployee = async(req,res)=>{
    if(!req?.params?.id) return res.status(400).json({
        'message':'ID is required'
    });

    const Employee =await employee.findOne({_id:req.params.id}).exec();
    if(!Employee){
     return res.status(400).json({'message':`Employee ID ${req.params.id} not found`});
    }
    res.json(employee);
 };

 module.exports = {
    getAllEmployeees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
 }