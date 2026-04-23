import { useEffect, useState } from "react";
import API from "../services/api";
import GrievanceForm from "../components/GrievanceForm";

export default function Dashboard() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");

    const fetchData = async () => {
        const res = await API.get("/grievances");
        setData(res.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        await API.delete(`/grievances/${id}`);
        fetchData();
    };

    const handleUpdate = async (id) => {
        await API.put(`/grievances/${id}`, { status: "Resolved" });
        fetchData();
    };

    const handleSearch = async () => {
        const res = await API.get(`/grievances/search?title=${search}`);
        setData(res.data);
    };

    const logout = () => {
        localStorage.removeItem("token");
        location.reload();
    };

    return (
        <div>
            <h2>Dashboard</h2>

            <button onClick={logout}>Logout</button>

            <GrievanceForm refresh={fetchData} />

            <input placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
            <button onClick={handleSearch}>Search</button>

            {data.map((g) => (
                <div key={g._id}>
                    <h3>{g.title}</h3>
                    <p>{g.description}</p>
                    <p>{g.status}</p>
                    <button onClick={() => handleUpdate(g._id)}>Resolve</button>
                    <button onClick={() => handleDelete(g._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}