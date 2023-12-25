import React from "react";
import "./dashboard.css";
import { FaUserFriends } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { LuClipboardEdit } from "react-icons/lu";
import { SlSocialDropbox } from "react-icons/sl";
import StackedAreaChart from "../charts/chart";

const Dashboard = (): JSX.Element => {
  return (
    <section className="dashboard">
      <div className="dashboardGrid">
        <div className="dashboardUsers">
          <div className="dashboardUsersInfo">
            <div className="text">
              <p>Total Users</p>
              <span>9999K</span>
            </div>
            <FaUserFriends className="iconDashboard" />
          </div>
          <div className="mountain"></div>
        </div>
        <div className="dashboardRevenue">
        <div className="dashboardRevenueInfo">
            <div className="text">
              <p>Total Revenue</p>
              <span>9999K</span>
            </div>
            <GiTakeMyMoney className="iconDashboard" />
          </div>
          <div className="mountain"></div>
        </div>
        <div className="dashboardProducts">
        <div className="dashboardProductsInfo">
            <div className="text">
              <p>Total Products</p>
              <span>9999K</span>
            </div>
            <SlSocialDropbox className="iconDashboard" />
          </div>
          <div className="mountain"></div>
        </div>
        <div className="dashboardOrders">
        <div className="dashboardOrdersInfo">
            <div className="text">
              <p>Total Orders</p>
              <span>9999K</span>
            </div>
            <LuClipboardEdit className="iconDashboard" />
          </div>
          <div className="mountain"></div>
        </div>
        <div className="dashboardChart">
            <StackedAreaChart/>
        </div>
        <div className="dashboardNotices"></div>
      </div>
    </section>
  );
};

export default Dashboard;
