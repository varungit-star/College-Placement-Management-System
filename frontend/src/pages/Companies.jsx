import { useEffect, useState } from "react";
import api from "../services/api";

function Companies() {

    const [companies, setCompanies] = useState([]);

    const emptyCompany = {
        companyName: "",
        location: "",
        packageOffered: "",
        eligibleCgpa: "",
        description: ""
    };

    const [company, setCompany] = useState(emptyCompany);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadCompanies();
    }, []);

    const loadCompanies = async () => {
        const response = await api.get("/companies");
        setCompanies(response.data);
    };

    const handleChange = (e) => {
        setCompany({
            ...company,
            [e.target.name]: e.target.value
        });
    };

    const saveCompany = async (e) => {
        e.preventDefault();

        if (editingId == null) {
            await api.post("/companies", company);
        } else {
            await api.put(`/companies/${editingId}`, company);
        }

        setCompany(emptyCompany);
        setEditingId(null);

        loadCompanies();
    };

    const editCompany = (company) => {

        setCompany({
            companyName: company.companyName,
            location: company.location,
            packageOffered: company.packageOffered,
            eligibleCgpa: company.eligibleCgpa,
            description: company.description
        });

        setEditingId(company.companyId);
    };

    const deleteCompany = async (id) => {

        if(window.confirm("Delete Company?")){

            await api.delete(`/companies/${id}`);
            loadCompanies();

        }

    };

    return (

        <div className="container-fluid">

            <h2 className="mb-4">Companies</h2>

            <form onSubmit={saveCompany} className="row g-3 mb-4">

                <div className="col-md-3">
                    <input
                        className="form-control"
                        placeholder="Company Name"
                        name="companyName"
                        value={company.companyName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Location"
                        name="location"
                        value={company.location}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Package"
                        name="packageOffered"
                        value={company.packageOffered}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Eligible CGPA"
                        name="eligibleCgpa"
                        value={company.eligibleCgpa}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-3">
                    <input
                        className="form-control"
                        placeholder="Description"
                        name="description"
                        value={company.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-2">

                    <button className="btn btn-primary w-100">

                        {editingId == null ? "Add Company" : "Update Company"}

                    </button>

                </div>

            </form>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                <tr>

                    <th>ID</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Package</th>
                    <th>Eligible CGPA</th>
                    <th>Description</th>
                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {

                    companies.map((company)=>(

                        <tr key={company.companyId}>

                            <td>{company.companyId}</td>
                            <td>{company.companyName}</td>
                            <td>{company.location}</td>
                            <td>{company.packageOffered}</td>
                            <td>{company.eligibleCgpa}</td>
                            <td>{company.description}</td>

                            <td>

                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={()=>editCompany(company)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={()=>deleteCompany(company.companyId)}
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

export default Companies;