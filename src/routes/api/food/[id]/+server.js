import pool from '$lib/server/database.js';
import { API_USER, API_PASS } from '$env/static/private';

function checkAuth(request) {
    const auth = request.headers.get('Authorization');
    if (!auth?.startsWith('Basic ')) return false;
    const base64 = auth.slice(6);
    const decoded = atob(base64);
    const [user, pass] = decoded.split(':');
    return user === API_USER && pass === API_PASS;
}

// GET single food
export async function GET({ params }) {
    const { id } = params;
    const [rows] = await pool.query('SELECT * FROM foods WHERE id = ?', [id]);
    if (rows.length === 0) {
        return Response.json({ message: 'Food not found' }, { status: 404 });
    }
    return Response.json(rows[0], { status: 200 });
}

// UPDATE food
export async function PUT({ params, request }) {
    if (!checkAuth(request)) {
        return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const { id } = params;
    const { name, region, type, ingredients, description, calories, prep_time_min } = await request.json();
    if (!name || !region || !type || !ingredients || !description) {
        return Response.json({ message: 'Missing required fields' }, { status: 400 });
    }
    const [result] = await pool.query(
        `UPDATE foods SET name=?, region=?, type=?, ingredients=?, description=?, calories=?, prep_time_min=? WHERE id=?`,
        [name, region, type, ingredients, description, calories, prep_time_min, id]
    );
    if (result.affectedRows === 0) {
        return Response.json({ message: 'Food not found' }, { status: 404 });
    }
    return Response.json({ message: 'Food updated' }, { status: 200 });
}

// DELETE food
export async function DELETE({ params, request }) {
    if (!checkAuth(request)) {
        return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const { id } = params;
    const [result] = await pool.query('DELETE FROM foods WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
        return Response.json({ message: 'Food not found' }, { status: 404 });
    }
    return new Response(null, { status: 204 });
}