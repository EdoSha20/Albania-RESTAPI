import pool from '$lib/server/database.js';


function checkAuth(request) {
    const auth = request.headers.get('authorization');
    if (!auth || !auth.startsWith('Basic ')) return false;

    const [user, pass] = atob(auth.split(' ')[1]).split(':');
    return user === process.env.API_USER && pass === process.env.API_PASS;
}