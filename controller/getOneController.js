import { getOne } from "../model/db.js";

const getOneController = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ status: false, message: "Send user ID through request params" })
        return
    }

    const { result, error } = await getOne(id)
    if (error) {
        res.status(500).json({ status: false, message: error })
        return
    }

    res.status(200).json({ status: true, message: result })
};

export default getOneController;