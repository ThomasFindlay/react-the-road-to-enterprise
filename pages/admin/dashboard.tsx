import { NextPage } from "next";

type DashboardProps = {};

const Dashboard: NextPage<DashboardProps> = props => {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h1>Dashboard</h1>
      <br />
      <p>This page is accessible only to admins</p>
    </div>
  );
};

export default Dashboard;
