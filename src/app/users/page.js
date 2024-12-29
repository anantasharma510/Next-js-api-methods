import Link from "next/link";

async function getUsers() {
    try {
        const res = await fetch("http://localhost:3000/api/users", { cache: 'no-store' });
        if (!res.ok) {
            throw new Error("Failed to fetch users");
        }
        const data = await res.json();
        console.log("Fetched Users:", data); // Debug log
        return data;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}

export default async function Page() {
    const users = await getUsers();

    return (
        <div className="page">
            <h1>User List</h1>
            {users.length > 0 ? (
                users.map((item) => (
                    <div key={item.id}>
                        <Link href={`/user/${item.id}`}>{item.name}</Link>
                    </div>
                ))
            ) : (
                <p>No users found or failed to fetch users.</p>
            )}
        </div>
    );
}
