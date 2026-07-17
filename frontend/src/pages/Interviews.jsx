import { useEffect, useState } from "react";
import api from "../services/api";

function Interviews() {

    const [interviews, setInterviews] = useState([]);

    const emptyInterview = {
        applicationId: "",
        round: "",
        interviewDate: "",
        interviewTime: "",
        remarks: ""
    };

    const [interview, setInterview] = useState(emptyInterview);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadInterviews();
    }, []);

    const loadInterviews = async () => {
        const response = await api.get("/interviews");
        setInterviews(response.data);
    };

    const handleChange = (e) => {
        setInterview({
            ...interview,
            [e.target.name]: e.target.value
        });
    };

    const saveInterview = async (e) => {

        e.preventDefault();

        const payload = {
            application: {
                applicationId: Number(interview.applicationId)
            },
            round: interview.round,
            interviewDate: interview.interviewDate,
            interviewTime: interview.interviewTime,
            remarks: interview.remarks
        };

        if (editingId == null)
            await api.post("/interviews", payload);
        else
            await api.put(`/interviews/${editingId}`, payload);

        setInterview(emptyInterview);
        setEditingId(null);
        loadInterviews();
    };

    const editInterview = (i) => {

        setInterview({
            applicationId: i.application?.applicationId || "",
            round: i.round,
            interviewDate: i.interviewDate,
            interviewTime: i.interviewTime,
            remarks: i.remarks
        });

        setEditingId(i.interviewId);
    };

    const deleteInterview = async (id) => {

        if (window.confirm("Delete Interview?")) {

            await api.delete(`/interviews/${id}`);
            loadInterviews();

        }

    };

    return (

        <div className="container-fluid">

            <h2 className="mb-4">Interviews</h2>

            <form className="row g-3 mb-4" onSubmit={saveInterview}>

                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Application ID"
                        name="applicationId"
                        value={interview.applicationId}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Round"
                        name="round"
                        value={interview.round}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-2">
                    <input
                        type="date"
                        className="form-control"
                        name="interviewDate"
                        value={interview.interviewDate}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-2">
                    <input
                        type="time"
                        className="form-control"
                        name="interviewTime"
                        value={interview.interviewTime}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Remarks"
                        name="remarks"
                        value={interview.remarks}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-2">
                    <button className="btn btn-primary w-100">
                        {editingId == null ? "Add Interview" : "Update Interview"}
                    </button>
                </div>

            </form>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Application</th>
                        <th>Round</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Remarks</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {interviews.map((i) => (

                        <tr key={i.interviewId}>

                            <td>{i.interviewId}</td>
                            <td>{i.application?.applicationId}</td>
                            <td>{i.round}</td>
                            <td>{i.interviewDate}</td>
                            <td>{i.interviewTime}</td>
                            <td>{i.remarks}</td>

                            <td>

                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => editInterview(i)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteInterview(i.interviewId)}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );
}

export default Interviews;