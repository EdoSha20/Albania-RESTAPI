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


// GET /api/food
// Returns all food items from the database (public endpoint)
export async function GET() {
    // Execute SQL query to get all foods
    const [rows] = await pool.query('SELECT * FROM foods');

    // Return data as JSON with status 200 (OK)
    return Response.json(rows, { status: 200 });
}


// POST /api/food
// Creates a new food item (protected with Basic Auth)
export async function POST({ request }) {

    // Check authentication
    if (!checkAuth(request)) {
        return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Parse JSON body from request
    const { name, region, type, ingredients, description, calories, prep_time_min } = await request.json();

    // Validate required fields
    if (!name || !region || !type || !ingredients || !description) {
        return Response.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Insert new food into database
    const [result] = await pool.query(
        `INSERT INTO foods 
         (name, region, type, ingredients, description, calories, prep_time_min)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, region, type, ingredients, description, calories, prep_time_min]
    );

    // Return success message with new ID
    return Response.json({ message: 'Food created', id: result.insertId }, { status: 201 });
}