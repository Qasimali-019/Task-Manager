const pool = require("../../../db");
const createTask = async (req, res) => {
    try {
        const { title, description, priority = "medium", due_date = null } = req.body;
        const userId = req.user.id
        if (!title || typeof title !== "string" || !title.trim()) {
            return res.status(400).json({
                message: "title is required"
            });
        }

        const result = await pool.query(
            `INSERT INTO tasks (user_id, title, description, priority, due_date) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [userId, title.trim(), description || "", priority, due_date || null]
        )

        return res.status(201).json({
            message: "task created successfully",
            task: result.rows[0]
        })
    }
    catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "server error"
        })
    }
}


const getTasks = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await pool.query(
            `SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC`,
            [userId]
        )
        res.status(200).json({
            message: " tasks fetched successfully",
            tasks: result.rows
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "server error"
        })
    }
}



const updateTask = async (req, res) => {

    try {
        const taskId = req.params.id
        const user_Id = req.user.id
        const { title, description, priority, due_date, status } = req.body

        if (typeof title !== "string" || !title.trim()) {
            return res.status(400).json({
                message: "valid task is required"
            })
        }


        if (priority !== undefined && !["low", "medium", "high"].includes(priority)) {
            return res.status(400).json({
                message: "priority must be one of 'low', 'medium', or 'high'"
            })
        }


        if (status !== undefined && !["pending", "completed"].includes(status)) {
            return res.status(400).json({
                message: "status must be one of 'pending' or 'completed'"
            })
        }
        if (description !== undefined && description !== null && typeof description !== "string") {
            return res.status(400).json({
                message: "description must be a string"
            })
        }


        if (due_date !== undefined && due_date !== null && (
            typeof due_date !== "string" ||
            !/^\d{4}-\d{2}-\d{2}$/.test(due_date) ||
            Number.isNaN(Date.parse(`${due_date}T00:00:00.000Z`)) ||
            new Date(`${due_date}T00:00:00.000Z`).toISOString().slice(0, 10) !== due_date
        )) {
            return res.status(400).json({
                message: "due_date must be a valid date in the format YYYY-MM-DD"
            })
        }

        const updates = ["title = $1"];
        const values = [title.trim()];

        if (description !== undefined) {
            values.push(description ?? null);
            updates.push(`description = $${values.length}`);
        }
        if (priority !== undefined) {
            values.push(priority);
            updates.push(`priority = $${values.length}`);
        }
        if (due_date !== undefined) {
            values.push(due_date);
            updates.push(`due_date = $${values.length}`);
        }
        if (status !== undefined) {
            values.push(status);
            updates.push(`status = $${values.length}`);
        }

        values.push(taskId, user_Id);
        const result = await pool.query(
            `UPDATE tasks SET ${updates.join(", ")} WHERE id = $${values.length - 1} AND user_id = $${values.length} RETURNING *`,
            values
        )
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "task not found or you are not authorized to update this task"
            })
        }
        else {
            res.status(200).json({
                message: "task updated successfully",
                task: result.rows[0]
            })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "server error"
        })
    }

}

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id
        const user_Id = req.user.id
        const result = await pool.query(
            `DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *`,
            [taskId, user_Id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "task not found "
            })
        }
        else {
            res.status(200).json({
                message: "task deleted successfully",

            })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "server error"
        })
    }
}

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
}