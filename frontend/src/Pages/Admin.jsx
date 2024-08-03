import React from "react";
import Sidebar from "../Admin/Sidebar/Sidebar";
import { adminLinks } from "../Assets/sidebar_links";

const Admin = () => {
  return (
    <div>
      <Sidebar links={adminLinks} isAdmin={true} />
    </div>
  );
};

export default Admin;
