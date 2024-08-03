import { MdOutlinePostAdd } from "react-icons/md";
import { BsPostcard } from "react-icons/bs";
import { LuInspect } from "react-icons/lu";
import { MdPeopleOutline } from "react-icons/md";


// Define styles for the icon
const iconStyle = { fontSize: "24px", marginRight: "10px" };

// adminLinks.js
export const adminLinks = [
  {
    to: "/admin/approve-post",
    label: "Approve Posts",
    icon: <MdOutlinePostAdd style={iconStyle} />,
  },
  {
    to: "/admin/all-post",
    label: "All Posts",
    icon: <BsPostcard style={iconStyle} />,
  },
  {
    to: "/admin/career",
    label: "Career",
    icon: <MdPeopleOutline style={iconStyle} />,
  },
  {
    to: "/admin/inspection-request",
    label: "Inspection Request",
    icon: <BsPostcard style={iconStyle} />,
  },
];

// adminLinks.js
export const inspectorLinks = [
  {
    to: "/inspector/inspect-post",
    label: "Inspect Posts",
    icon: <LuInspect style={iconStyle} />,
  },
  {
    to: "/inspector/inspect-request",
    label: "Inspection Requests",
    icon: <LuInspect style={iconStyle} />,
  },
];
