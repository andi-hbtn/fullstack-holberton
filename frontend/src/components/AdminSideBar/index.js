import { useLocation } from "react-router-dom";
import { Col } from "react-bootstrap";
const AdminSideBar = () => {

    const location = useLocation();
    const pathName = location.pathname.replace(/^\//, "");
    return (
        <Col md={3} xl={2} className={`sidebar bg-dark text-light p-0 ${pathName === "admin-orders" ? "d-none" : ""}`}>
            <div className="sidebar-sticky pt-4">
                <h4 className="px-3 mb-4">Quick Actions data</h4>
            </div>
        </Col >
    )
}

export default AdminSideBar;
