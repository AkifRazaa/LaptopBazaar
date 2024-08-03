import React from "react";
import Sidebar from "../Admin/Sidebar/Sidebar";
import { inspectorLinks } from "../Assets/sidebar_links";

const Inspector = () => {
  return (
    <div>
      <Sidebar links={inspectorLinks} isAdmin={false} />
    </div>
  );
};

export default Inspector;
