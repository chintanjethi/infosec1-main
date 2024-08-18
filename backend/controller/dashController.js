import Dash from "../model/dashModel.js"

export const createReport = async(req, res)=>{
    try {

        const dashData = new Dash(req.body);

        if(!dashData){
            return res.status(404).json({msg: "dash data not found"});
        }

        await dashData.save();
        res.status(200).json({msg: "report created successfully"});

    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const getAllapi = async(req, res) =>{
    try {

        const dashData = await Dash.find();
        if(!dashData){
            return res.status(404).json({msg:"Dash data not found"});
        }
        res.status(200).json(dashData);
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}