import { useEffect, useState } from "react";
import api from "../services/api";

function Applications() {

    const [applications, setApplications] = useState([]);

    const emptyApplication = {
        studentId: "",
        driveId: "",
        status: ""
    };

    const [application, setApplication] = useState(emptyApplication);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {
        try {
            const response = await api.get("/applications");
            setApplications(response.data || []);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setApplication({
            ...application,
            [e.target.name]: e.target.value
        });
    };

    const saveApplication = async (e) => {

        e.preventDefault();

        const payload = {
            studentId: Number(application.studentId),
            driveId: Number(application.driveId),
            status: application.status
        };

        console.log(payload);

        try {

            if (editingId == null) {

                await api.post("/applications", payload);

            } else {

                await api.put(`/applications/${editingId}`, payload);

            }

            setApplication(emptyApplication);
            setEditingId(null);

            loadApplications();

        } catch (error) {

            console.error(error);

            if (error.response) {
                console.log(error.response.data);
                alert("Error : " + JSON.stringify(error.response.data));
            }

        }

    };

    const editApplication = (a) => {

        setApplication({

            studentId: a.student?.studentId || "",
            driveId: a.placementDrive?.driveId || "",
            status: a.status

        });

        setEditingId(a.applicationId);

    };

    const deleteApplication = async (id) => {

        if (window.confirm("Delete Application?")) {

            await api.delete(`/applications/${id}`);

            loadApplications();

        }

    };

    return (

        <div className="container-fluid">

            <h2 className="mb-4">Applications</h2>

            <form className="row g-3 mb-4" onSubmit={saveApplication}>

                <div className="col-md-3">

                    <input
                        type="number"
                        className="form-control"
                        placeholder="Student ID"
                        name="studentId"
                        value={application.studentId}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="col-md-3">

                    <input
                        type="number"
                        className="form-control"
                        placeholder="Drive ID"
                        name="driveId"
                        value={application.driveId}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="col-md-3">

                    <input
                        className="form-control"
                        placeholder="Status"
                        name="status"
                        value={application.status}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="col-md-3">

                    <button className="btn btn-primary w-100">

                        {editingId == null
                            ? "Add Application"
                            : "Update Application"}

                    </button>

                </div>

            </form>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>
                        <th>Student</th>
                        <th>Drive</th>
                        <th>Status</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        applications.map((a) => (

                            <tr key={a.applicationId}>

                                <td>{a.applicationId}</td>

                                <td>{a.student?.name}</td>

                                <td>{a.placementDrive?.jobRole}</td>

                                <td>{a.status}</td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => editApplication(a)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteApplication(a.applicationId)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default Applications;