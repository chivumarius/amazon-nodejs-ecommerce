// IMPORTS:
/* eslint-disable no-new */
import Chartist from "chartist";
import DashboardMenu from "../components/DashboardMenu";
import { getSummary } from "../api";

// DEFINE OBJECT "SUMMARY":
let summary = {};

// OBJECT ""DASHBOARD SCREEN:
const DashboardScreen = {
  // METHOD "AFTER_RENDER"
  // IN WITCH WE USE THE "CHARTIST" LYBRARY:
  after_render: () => {
    // CREATING "LINEAR CHART":
    new Chartist.Line(
      ".ct-chart-line",
      {
        labels: summary.dailyOrders.map((x) => x._id),
        series: [summary.dailyOrders.map((x) => x.sales)],
      },
      {
        showArea: true,
      }
    );

    // CREATING "PIE CHART":
    new Chartist.Pie(
      ".ct-chart-pie",
      {
        labels: summary.productCategories.map((x) => x._id),
        series: summary.productCategories.map((x) => x.count),
      },
      {
        donut: true,
        donutWidth: 60,
        startAngle: 270,
        showLabel: true,
        donutSolid: true,
      }
    );
  },

  // METHOD "RENDER":
  render: async () => {
    // GETTING "SUMMARY":
    summary = await getSummary();

    // METHOD "RENDER":
    return `
      <div class="dashboard">
        ${DashboardMenu.render({ selected: "dashboard" })}
        
        <div class="dashboard-content">
          <h1>Dashboard</h1>
         
          <!-- LIST -->
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


          <!-- CHARTS -->
          <div class="charts">

            <!-- SALES (LINE CHART) -->
            <div>
              <h2>Sales</h2>
              <div class="ct-perfect-fourth ct-chart-line"></div>
            </div>

            <!-- CATEGORIES (PIE CHART) -->
            <div>
              <h2>Categories</h2>
              <div class="ct-perfect-fourth ct-chart-pie"></div>
            </div>
          </div>   
        
        </div>
      </div>
    `;
  },
};

// EXPORT:
export default DashboardScreen;
