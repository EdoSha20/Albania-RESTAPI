// Import database connection pool
import pool from '$lib/server/database.js';
// Import Basic Auth credentials from environment variables
import { API_USER, API_PASS } from '$env/static/private';

// Function to check Basic Authentication
function checkAuth(request) {
    // Get Authorization header from request
    const auth = request.headers.get('Authorization');

    // Check if header exists and starts with "Basic "
    if (!auth?.startsWith('Basic ')) return false;

    // Remove "Basic " prefix and decode base64 string
    const base64 = auth.slice(6);
    const decoded = atob(base64);

    // Split username and password
    const [user, pass] = decoded.split(':');

    // Compare with stored credentials
    return user === API_USER && pass === API_PASS;
}


// GET /api/food/:id
// Returns a single food item by ID (public endpoint)
export async function GET({ params }) {
    const { id } = params;

    // Query food item by ID
    const [rows] = await pool.query('SELECT * FROM foods WHERE id = ?', [id]);

    // If no food found, return 404
    if (rows.length === 0) {
        return Response.json({ message: 'Food not found' }, { status: 404 });
    }

    // Return the found food item
    return Response.json(rows[0], { status: 200 });
}


// PUT /api/food/:id
// Updates an existing food item (protected with Basic Auth)
export async function PUT({ params, request }) {
    // Check authentication
    if (!checkAuth(request)) {
        return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const { name, region, type, ingredients, description, calories, prep_time_min } = await request.json();

    // Validate required fields
    if (!name || !region || !type || !ingredients || !description) {
        return Response.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Update the food in the database
    const [result] = await pool.query(
        `UPDATE foods SET name=?, region=?, type=?, ingredients=?, description=?, calories=?, prep_time_min=? WHERE id=?`,
        [name, region, type, ingredients, description, calories, prep_time_min, id]
    );

    // If no rows affected, the ID does not exist
    if (result.affectedRows === 0) {
        return Response.json({ message: 'Food not found' }, { status: 404 });
    }

    // Return success message
    return Response.json({ message: 'Food updated' }, { status: 200 });
}


// DELETE /api/food/:id
// Deletes a food item (protected with Basic Auth)
export async function DELETE({ params, request }) {
    // Check authentication
    if (!checkAuth(request)) {
        return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    // Delete the food from the database
    const [result] = await pool.query('DELETE FROM foods WHERE id = ?', [id]);

    // If no rows affected, the ID does not exist
    if (result.affectedRows === 0) {
        return Response.json({ message: 'Food not found' }, { status: 404 });
    }

    // Return 204 No Content on successful deletion
    return new Response(null, { status: 204 });
}