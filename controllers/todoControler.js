const data = require("../model/Todo");
require("dotenv").config();

const allData = async (req, res) => {
    const d = await data.find();
    if (!d) return res.status(204), json({ "message": "No data" });
    res.status(200).json(d);
}

const addData = async (req, res) => {
    const { work, status, priority } = req.body;
    if (!work || !status) return res.status(400).json({ "Message": "Incomplete Data" });
    if (!['To Do', 'Doing', 'Done'].includes(status)) return res.status(400).json({ "Message": "Invalid Status" });
    try {
        const result = await data.create({
            work,
            status,
            priority,
            date: new Date(Date.now()).toISOString(),
        })
        res.status(201).json(result);
    }
    catch (e) {
        console.log(e);
    }

}

const updateData = async (req, res) => {
    const { work, status, priority, _id } = req.body;

    if (!_id) {
        return res.status(400).json({ "message": "ID required" })
    }

    const d = await data.findOne({ _id: _id });
    if (!d) {
        res.status(204).json({ "message": "Data not found" }
        )
    }

    if (work)
        d.work = work;

    if (status) {
        if (!['To Do', 'Doing', 'Done'].includes(status)) return res.status(400).json({ "Message": "Invalid Status" });
        else
            d.status = status;
    }

    if (priority)
        d.priority = priority;
    d.date=new Date(Date.now()).toISOString();

    const result = await d.save();
    res.json(result)
}

const deleteData = async (req, res) => {
    const { _id } = req.body;
    if (!_id) {
        return res.status(400).json({ "message": "ID required" })
    }

    const d = await data.findOne({ _id: _id });
    if (!d) {
        res.status(204).json({ "message": "Data not found" }
        )
    }
    const result = await d.deleteOne({ _id: _id });

    res.json({"Message":"deleted item","Result":result});
}
module.exports = {
    allData,
    addData,
    updateData,
    deleteData
}