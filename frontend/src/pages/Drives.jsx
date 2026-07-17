import { useEffect, useState } from "react";
import api from "../services/api";

function Drives() {

    const [drives, setDrives] = useState([]);

    const emptyDrive = {
        jobRole: "",
        driveDate: "",
        lastDateToApply: "",
        vacancies: "",
        companyId: ""
    };

    const [drive, setDrive] = useState(emptyDrive);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadDrives();
    }, []);

    const loadDrives = async () => {
        const response = await api.get("/drives");
        setDrives(response.data);
    };

    const handleChange = (e) => {
        setDrive({
            ...drive,
            [e.target.name]: e.target.value
        });
    };

    const saveDrive = async (e) => {

        e.preventDefault();

        const payload = {
            jobRole: drive.jobRole,
            driveDate: drive.driveDate,
            lastDateToApply: drive.lastDateToApply,
            vacancies: Number(drive.vacancies),
            company: {
                companyId: Number(drive.companyId)
            }
        };

        if (editingId == null) {
            await api.post("/drives", payload);
        } else {
            await api.put(`/drives/${editingId}`, payload);
        }

        setDrive(emptyDrive);
        setEditingId(null);
        loadDrives();
    };

    const editDrive = (d) => {

        setDrive({
            jobRole: d.jobRole,
            driveDate: d.driveDate,
            lastDateToApply: d.lastDateToApply,
            vacancies: d.vacancies,
            companyId: d.company?.companyId || ""
        });

        setEditingId(d.driveId);
    };

    const deleteDrive = async (id) => {

        if(window.confirm("Delete Drive?")){

            await api.delete(`/drives/${id}`);
            loadDrives();

        }

    };

    return (

        <div className="container-fluid">

            <h2 className="mb-4">Placement Drives</h2>

            <form className="row g-3 mb-4" onSubmit={saveDrive}>

                <div className="col-md-3">
                    <input
                        className="form-control"
                        placeholder="Job Role"
                        name="jobRole"
                        value={drive.jobRole}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="col-md-2">
                    <input
                        type="date"
                        className="form-control"
                        name="driveDate"
                        value={drive.driveDate}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-2">
                    <input
                        type="date"
                        className="form-control"
                        name="lastDateToApply"
                        value={drive.lastDateToApply}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-1">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Vacancies"
                        name="vacancies"
                        value={drive.vacancies}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-2">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Company ID"
                        name="companyId"
                        value={drive.companyId}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="col-md-2">

                    <button className="btn btn-primary w-100">

                        {editingId == null
                            ? "Add Drive"
                            : "Update Drive"}

                    </button>

                </div>

            </form>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                <tr>

                    <th>ID</th>
                    <th>Job Role</th>
                    <th>Drive Date</th>
                    <th>Last Date</th>
                    <th>Vacancies</th>
                    <th>Company</th>
                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {

                    drives.map((d)=>(

                        <tr key={d.driveId}>

                            <td>{d.driveId}</td>
                            <td>{d.jobRole}</td>
                            <td>{d.driveDate}</td>
                            <td>{d.lastDateToApply}</td>
                            <td>{d.vacancies}</td>
                            <td>{d.company?.companyName}</td>

                            <td>

                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={()=>editDrive(d)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={()=>deleteDrive(d.driveId)}
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

export default Drives;