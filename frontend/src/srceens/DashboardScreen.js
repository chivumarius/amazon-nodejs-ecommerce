// IMPORT
import DashboardMenu from "../components/DashboardMenu";

// OBJECT ""DASHBOARD SCREEN:
const DashboardScreen = {
  // METHOD "AFTER_RENDER":
  after_render: () => {},

  // METHOD "RENDER":
  render: () => `
    <div class="dashboard">
      ${DashboardMenu.render({ selected: "dashboard" })}
      <div class="dashboard-content">
        <h1>Dashboard</h1>
        <div>
          Info and Charts will be added here
        </div>
      </div>
    </div>
    `,
};

// EXPORT:
export default DashboardScreen;
