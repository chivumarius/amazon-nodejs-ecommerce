// IMPORTS:
import DashboardMenu from "../components/DashboardMenu";
import { getSummary } from "../api";

// DEFINE OBJECT "SUMMARY":
let summary = {};

// OBJECT ""DASHBOARD SCREEN:
const DashboardScreen = {
  // METHOD "AFTER_RENDER":
  after_render: () => {},

  // METHOD "RENDER":
  render: async () => {
    summary = await getSummary();

    // METHOD "RENDER":
    return `
      <div class="dashboard">
        ${DashboardMenu.render({ selected: "dashboard" })}
        
        <div class="dashboard-content">
          <h1>Dashboard</h1>
         
          <ul class="summary-items">
            <!-- USERS -->
            <li>
              <div class="summary-title color1">
                <span><i class="fa fa-users"></i> Users</span>
              </div>
              
              <div class="summary-body">${summary.users[0].numUsers}</div>
            </li>

            <!-- NUMBER OF ORDERS   -->
            <li>
              <div class="summary-title color2">
                <span><i class="fa fa-users"></i> Orders</span>
              </div>

              <div class="summary-body">${summary.orders[0].numOrders}</div>
            </li>

            <!-- TOTAL SALES -->
            <li>
              <div class="summary-title color3">
                <span><i class="fa fa-users"></i> Sales</span>
              </div>
              <div class="summary-body">$${summary.orders[0].totalSales}</div>
            </li>
          </ul>
        
        </div>
      </div>
    `;
  },
};

// EXPORT:
export default DashboardScreen;
