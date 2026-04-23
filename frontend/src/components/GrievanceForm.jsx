import { useState } from "react";
import API from "../services/api";

export default function GrievanceForm({ refresh }) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "Academic",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await API.post("/grievances", form);
        refresh();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <input placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <select onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option>Academic</option>
                <option>Hostel</option>
                <option>Transport</option>
                <option>Other</option>
            </select>
            <button>Submit</button>
        </form>
    );
}