import { useEffect, useState } from "react";
import api from "../services/api";

function Offers() {

    const [offers, setOffers] = useState([]);

    const emptyOffer = {
        studentId: "",
        companyId: "",
        salary: "",
        joiningDate: "",
        status: ""
    };

    const [offer, setOffer] = useState(emptyOffer);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadOffers();
    }, []);

    const loadOffers = async () => {
        const response = await api.get("/offers");
        setOffers(response.data);
    };

    const handleChange = (e) => {
        setOffer({
            ...offer,
            [e.target.name]: e.target.value
        });
    };

    const saveOffer = async (e) => {

        e.preventDefault();

        const payload = {

            student: {
                studentId: Number(offer.studentId)
            },

            company: {
                companyId: Number(offer.companyId)
            },

            salary: Number(offer.salary),

            joiningDate: offer.joiningDate,

            status: offer.status

        };

        if(editingId==null){

            await api.post("/offers",payload);

        }else{

            await api.put(`/offers/${editingId}`,payload);

        }

        setOffer(emptyOffer);
        setEditingId(null);

        loadOffers();

    };

    const editOffer=(o)=>{

        setOffer({

            studentId:o.student?.studentId||"",
            companyId:o.company?.companyId||"",
            salary:o.salary,
            joiningDate:o.joiningDate,
            status:o.status

        });

        setEditingId(o.offerId);

    };

    const deleteOffer=async(id)=>{

        if(window.confirm("Delete Offer?")){

            await api.delete(`/offers/${id}`);

            loadOffers();

        }

    };

    return(

        <div className="container-fluid">

            <h2 className="mb-4">Offers</h2>

            <form className="row g-3 mb-4" onSubmit={saveOffer}>

                <div className="col-md-2">

                    <input
                    className="form-control"
                    placeholder="Student ID"
                    name="studentId"
                    value={offer.studentId}
                    onChange={handleChange}
                    required
                    />

                </div>

                <div className="col-md-2">

                    <input
                    className="form-control"
                    placeholder="Company ID"
                    name="companyId"
                    value={offer.companyId}
                    onChange={handleChange}
                    required
                    />

                </div>

                <div className="col-md-2">

                    <input
                    className="form-control"
                    type="number"
                    placeholder="Salary"
                    name="salary"
                    value={offer.salary}
                    onChange={handleChange}
                    />

                </div>

                <div className="col-md-2">

                    <input
                    className="form-control"
                    type="date"
                    name="joiningDate"
                    value={offer.joiningDate}
                    onChange={handleChange}
                    />

                </div>

                <div className="col-md-2">

                    <input
                    className="form-control"
                    placeholder="Status"
                    name="status"
                    value={offer.status}
                    onChange={handleChange}
                    />

                </div>

                <div className="col-md-2">

                    <button className="btn btn-primary w-100">

                        {editingId==null?"Add Offer":"Update Offer"}

                    </button>

                </div>

            </form>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                <tr>

                    <th>ID</th>
                    <th>Student</th>
                    <th>Company</th>
                    <th>Salary</th>
                    <th>Joining Date</th>
                    <th>Status</th>
                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {

                    offers.map((o)=>(

                        <tr key={o.offerId}>

                            <td>{o.offerId}</td>
                            <td>{o.student?.name}</td>
                            <td>{o.company?.companyName}</td>
                            <td>{o.salary}</td>
                            <td>{o.joiningDate}</td>
                            <td>{o.status}</td>

                            <td>

                                <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={()=>editOffer(o)}
                                >
                                    Edit
                                </button>

                                <button
                                className="btn btn-danger btn-sm"
                                onClick={()=>deleteOffer(o.offerId)}
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

export default Offers;