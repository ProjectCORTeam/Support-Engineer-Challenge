const express = require('express');
const { get, all } = require('../db/connection');

const router = express.Router();

/**
 * GET /api/v1/users/:userId/tasks
 * 
 * Returns a list of tasks assigned to a specific user.
 * 
 * Query Parameters:
 *   - status (optional, string): Filter by status. Values: pending, in_progress, completed
 *   - due_date_before (optional, date YYYY-MM-DD): Returns tasks with due date before or equal to this date
 */
router.get('/users/:userId/tasks', (req, res) => {
  try {
    const { userId } = req.params;
    const { status, due_date_before } = req.query;

    // Validate userId
    const userIdNum = parseInt(userId, 10);
    if (isNaN(userIdNum)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    // Check if user exists
    const user = get('SELECT id, name FROM users WHERE id = ?', [userIdNum]);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Build the query
    let query = 'SELECT * FROM tasks WHERE assignee_id = ?';
    const params = [userIdNum];

    // ============================================================
    // BUG: When status is not provided, default to 'pending'
    // instead of not filtering by status at all.
    // The API documentation says status is "optional", implying
    // that when not provided, all statuses should be returned.
    // ============================================================
  
    // Exclude soft deletes
    query += ' AND is_deleted = 0';

    // Only apply status filter if provided
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    // Filter by due_date_before if provided
    if (due_date_before) {
      // Add time component to include the entire day
      query += ' AND due_date <= ?';
      params.push(`${due_date_before} 23:59:59`);
    }

    // Order by due date
    query += ' ORDER BY due_date ASC';

    const tasks = all(query, params);

    res.json({
      user_id: userIdNum,
      user_name: user.name,
      count: tasks.length,
      tasks: tasks.map(task => ({
        id: task.id,
        title: task.title,
        status: task.status,
        due_date: task.due_date,
        is_deleted: Boolean(task.is_deleted)
      }))
    });

  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

module.exports = router;
