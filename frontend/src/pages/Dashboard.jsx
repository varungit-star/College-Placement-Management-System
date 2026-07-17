function Dashboard() {
  return (
    <div className="container-fluid py-4">

      {/* Welcome Section */}
      <div className="bg-primary text-white rounded-4 p-5 shadow mb-5">
        <h1 className="fw-bold">
          🎓 College Placement Management System
        </h1>

        <p className="fs-5 mt-3 mb-0">
          Welcome to the Placement Management Dashboard.
          Manage students, companies, placement drives,
          interviews, applications and offers from one place.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="row g-4">

        <div className="col-md-4">
          <div className="card shadow border-0 rounded-4 h-100">
            <div className="card-body text-center">
              <h1>👨‍🎓</h1>
              <h4 className="mt-3">Students</h4>
              <h2 className="text-primary fw-bold">--</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow border-0 rounded-4 h-100">
            <div className="card-body text-center">
              <h1>🏢</h1>
              <h4 className="mt-3">Companies</h4>
              <h2 className="text-success fw-bold">--</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow border-0 rounded-4 h-100">
            <div className="card-body text-center">
              <h1>📅</h1>
              <h4 className="mt-3">Placement Drives</h4>
              <h2 className="text-warning fw-bold">--</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow border-0 rounded-4 h-100">
            <div className="card-body text-center">
              <h1>📄</h1>
              <h4 className="mt-3">Applications</h4>
              <h2 className="text-info fw-bold">--</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow border-0 rounded-4 h-100">
            <div className="card-body text-center">
              <h1>🎤</h1>
              <h4 className="mt-3">Interviews</h4>
              <h2 className="text-danger fw-bold">--</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow border-0 rounded-4 h-100">
            <div className="card-body text-center">
              <h1>🎁</h1>
              <h4 className="mt-3">Offers</h4>
              <h2 className="text-secondary fw-bold">--</h2>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="card shadow border-0 rounded-4 mt-5">
        <div className="card-body p-4">

          <h3 className="text-primary">
            📌 Quick Overview
          </h3>

          <p className="mt-3">
            This application helps placement coordinators manage the
            complete recruitment process. You can add students,
            register companies, create placement drives, manage
            applications, schedule interviews and record final offers
            through a single unified system.
          </p>

        </div>
      </div>

    </div>
  );
}

export default Dashboard;