import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div>

      {/* Top Navbar */}
      <Navbar />

      {/* Sidebar + Main Content */}
      <div style={{ display: "flex" }}>

        <Sidebar />

        <div
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "#f8f9fa",
            minHeight: "100vh",
          }}
        >
          {children}
        </div>

      </div>

    </div>
  );
}

export default Layout;