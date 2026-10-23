const pool = require("../../../db");

const getAdminStats = async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM users WHERE role = 'user') AS total_users,
        (SELECT COUNT(*) FROM tasks) AS total_tasks,
        (SELECT COUNT(*) FROM tasks WHERE LOWER(status) = 'completed') AS completed_tasks,
        (SELECT COUNT(*) FROM tasks WHERE LOWER(status) = 'pending') AS pending_tasks,
        (SELECT COUNT(*) FROM tasks WHERE LOWER(priority) = 'high' AND LOWER(status) = 'pending') AS high_priority_tasks,
        (SELECT COUNT(*) FROM tasks WHERE due_date < CURRENT_DATE AND LOWER(status) = 'pending') AS overdue_tasks
    `);

        const stats = result.rows[0];

        return res.status(200).json({
            totalUsers: Number(stats.total_users),
            totalTasks: Number(stats.total_tasks),
            completedTasks: Number(stats.completed_tasks),
            pendingTasks: Number(stats.pending_tasks),
            highPriorityTasks: Number(stats.high_priority_tasks),
            overdueTasks: Number(stats.overdue_tasks)
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to fetch admin statistics"
        });
    }
};

const getAdminUsers = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, name, email, role FROM users WHERE role = 'user' ORDER BY name, id"
        );

        return res.status(200).json({ users: result.rows });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to fetch users"
        });
    }
};

const getAdminTasks = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                tasks.id,
                tasks.title,
                tasks.description,
                LOWER(tasks.priority) AS priority,
                TO_CHAR(tasks.due_date, 'YYYY-MM-DD') AS due_date,
                LOWER(tasks.status) AS status,
                tasks.created_at,
                users.name AS user_name,
                users.email AS user_email
            FROM tasks
            JOIN users ON users.id = tasks.user_id
            ORDER BY tasks.created_at DESC, tasks.id DESC
        `);

        return res.status(200).json({ tasks: result.rows });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to fetch tasks"
        });
    }
};

const getRecentActivity = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                tasks.id,
                tasks.title,
                LOWER(tasks.priority) AS priority,
                TO_CHAR(tasks.due_date, 'YYYY-MM-DD') AS due_date,
                LOWER(tasks.status) AS status,
                tasks.created_at,
                users.name AS user_name,
                users.email AS user_email
            FROM tasks
            JOIN users ON users.id = tasks.user_id
            ORDER BY tasks.created_at DESC, tasks.id DESC
            LIMIT 10
        `);

        return res.status(200).json({ activity: result.rows });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to fetch recent activity"
        });
    }
};

module.exports = { getAdminStats, getAdminUsers, getAdminTasks, getRecentActivity };