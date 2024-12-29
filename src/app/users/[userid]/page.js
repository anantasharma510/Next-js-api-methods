async function getUser(id) {
    try {
        const res = await fetch(`http://localhost:3000/api/users/${id}`, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error(`Error fetching user: ${res.status}`);
        }
        const data = await res.json();
        console.log("Fetched User Data:", data); // Debug log
        return data.result || data; // Adjust based on API structure
    } catch (error) {
        console.error(`Failed to fetch user with ID ${id}:`, error.message);
        return null;
    }
}

export default async function Page({ params }) {
    const user = await getUser(params.userid);

    if (!user) {
        return (
            <div>
                <h1>User Not Found</h1>
                <p>We  find the user you were looking for. Please check the URL or try again later.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>User Details</h1>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {/* Render more fields if available */}
        </div>
    );
}
