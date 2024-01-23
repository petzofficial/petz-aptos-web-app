import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import "../../../style/tasks/task-edit.scss";
import EditAddTask from "@/components/task/EditAddTask";

const Page = () => {
  return (
    <div>
      <EditAddTask method="edit" />
    </div>
  );
};

export default Page;
