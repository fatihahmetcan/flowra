import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <aside
        style={{
          width: "220px",
          background: "#1e293b",
          color: "white",
          padding: "20px"
        }}
      >
        <h2>Flowra</h2>
        <p>Navigation</p>
      </aside>

      <main style={{ flex: 1, padding: "40px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;