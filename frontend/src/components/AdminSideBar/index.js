import { useOrderContext } from "../../context/OrderContext";
import { Nav } from 'react-bootstrap';
import { IoIosTimer } from "react-icons/io";
import { LuPackageCheck } from "react-icons/lu";
import { MdOutlineLocalShipping } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";

const AdminSideBar = () => {

    const { getOrdersByStatus } = useOrderContext();

    const statusOptions = [
        { key: "pending", label: "Pending", icon: <IoIosTimer size={20} /> },
        { key: "shipped", label: "Shipped", icon: <MdOutlineLocalShipping size={20} /> },
        { key: "delivered", label: "Delivered", icon: <LuPackageCheck size={20} /> },
        { key: "cancelled", label: "Cancelled", icon: <FaRegTrashCan size={20} /> },
    ];

    return (
        <div className="sidebar-sticky pt-4">
            <h4 className="px-3 mb-4">Quick Actions</h4>
            <Nav className="flex-column">
                <Nav.Link className="nav-link text-light" >
                    All Orders
                </Nav.Link>
                {statusOptions.map((status) => (
                    <Nav.Link
                        key={status.key}
                        className="nav-link text-light d-flex align-items-center gap-2"
                        onClick={() => getOrdersByStatus(status.key)}
                    >
                        {status.icon}
                        <span>{status.label}</span>
                    </Nav.Link>
                ))}
            </Nav>
        </div>
    )
}

export default AdminSideBar;
