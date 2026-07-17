import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="bg-light border-end"
      style={{
        width: "250px",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h4>Menu</h4>
      <hr />

      <ul className="nav flex-column">

        <li className="nav-item">
          <Link className="nav-link" to="/">Dashboard</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/students">Students</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/companies">Companies</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/drives">Placement Drives</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/applications">Applications</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/interviews">Interviews</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/offers">Offers</Link>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;