import { useEffect, useState } from "react";
import api from "../services/api";

function Students() {
  const [students, setStudents] = useState([]);

  const emptyStudent = {
    name: "",
    email: "",
    phone: "",
    branch: "",
    cgpa: "",
    graduationYear: "",
    skills: "",
  };

  const [student, setStudent] = useState(emptyStudent);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await api.get("/students");
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const saveStudent = async (e) => {
    e.preventDefault();

    try {
      if (editingId === null) {
        await api.post("/students", student);
      } else {
        await api.put(`/students/${editingId}`, student);
      }

      setStudent(emptyStudent);
      setEditingId(null);
      loadStudents();
    } catch (error) {
      console.error(error);
    }
  };

  const editStudent = (selectedStudent) => {
    setStudent({
      name: selectedStudent.name,
      email: selectedStudent.email,
      phone: selectedStudent.phone,
      branch: selectedStudent.branch,
      cgpa: selectedStudent.cgpa,
      graduationYear: selectedStudent.graduationYear,
      skills: selectedStudent.skills,
    });

    setEditingId(selectedStudent.studentId);
  };

  const deleteStudent = async (id) => {
    if (window.confirm("Delete this student?")) {
      await api.delete(`/students/${id}`);
      loadStudents();
    }
  };

  return (
    <div className="container-fluid">

      <h2 className="mb-4">Students</h2>

      <form onSubmit={saveStudent} className="row g-3 mb-4">

        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Name"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Email"
            name="email"
            value={student.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-2">
          <input
            className="form-control"
            placeholder="Phone"
            name="phone"
            value={student.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-2">
          <input
            className="form-control"
            placeholder="Branch"
            name="branch"
            value={student.branch}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-2">
          <input
            type="number"
            step="0.01"
            className="form-control"
            placeholder="CGPA"
            name="cgpa"
            value={student.cgpa}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Graduation Year"
            name="graduationYear"
            value={student.graduationYear}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-5">
          <input
            className="form-control"
            placeholder="Skills"
            name="skills"
            value={student.skills}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">
          <button className="btn btn-primary w-100">
            {editingId === null ? "Add Student" : "Update Student"}
          </button>
        </div>

      </form>

      <table className="table table-bordered table-hover">

        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Branch</th>
            <th>CGPA</th>
            <th>Graduation Year</th>
            <th>Skills</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {students.map((student) => (
            <tr key={student.studentId}>
              <td>{student.studentId}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>{student.branch}</td>
              <td>{student.cgpa}</td>
              <td>{student.graduationYear}</td>
              <td>{student.skills}</td>

              <td>

                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editStudent(student)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteStudent(student.studentId)}
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

export default Students;