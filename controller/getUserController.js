import { getOne } from "../model/db.js";

const getUserController = async (req,res) =>{
    const {id} = req.params
   
        getOne({id:id}, (err)=>{
            if(err){
                return res.status(500).json({ status: false, message: `Error Finding user: ${err}` });
            }
            
                return res.status(200).json({ status: true, message: "User Found", id:id});
           
        })



    
}
export default getUserController;