import "./sidebar.css";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbUsers } from "react-icons/tb";
import { SlSocialDropbox } from "react-icons/sl";
import { LuClipboardEdit } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";

const Sidebar = (): JSX.Element => {
  let location: any = useLocation();

  return (
    <aside className="sidebarAdmin">
      <div className="informationAdmin">
        <img
          src="../../../asset/img/41DD5264-F270-4222-9A09-68079B3D5719_1_105_c.jpeg"
          alt=""
        />
        <div className="nameAdmin">
          <p>Hi, Nhat Tien!</p>
          <button className="btnLogout">Logout</button>
        </div>
      </div>
      <ul className="menuAdmin">
        <Link
          to={"/"}
          className={
            location.pathname === "/" ? "menuAdminItem activeAdmin" : "menuAdminItem"
          }
        >
          <LuLayoutDashboard className="iconMenuAdmin" />
          <span className="menuAdminTitle">Dashboard</span>
        </Link>
        <Link
          to={"/user"}
          className={
            location.pathname === "/user"
              ? "menuAdminItem activeAdmin"
              : "menuAdminItem"
          }
        >
          <TbUsers className="iconMenuAdmin" />
          <span className="menuAdminTitle">Users</span>
        </Link>
        <Link
          to={"/product"}
          className={
            location.pathname === "/product"
              ? "menuAdminItem activeAdmin"
              : "menuAdminItem"
          }
        >
          <SlSocialDropbox className="iconMenuAdmin" />
          <span className="menuAdminTitle">Products</span>
        </Link>
        <Link
          to={"/order"}
          className={
            location.pathname === "/order"
              ? "menuAdminItem activeAdmin"
              : "menuAdminItem"
          }
        >
          <LuClipboardEdit className="iconMenuAdmin" />
          <span className="menuAdminTitle">Orders</span>
        </Link>
      </ul>
    </aside>
  );
};

export default Sidebar;
