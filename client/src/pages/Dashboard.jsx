import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

import { useSelector } from "react-redux";
import StatusCard from "../components/AppAdminDashboard/status-card/StatusCard";



const Dashboard = () => {
  const [productsNumber, setProductsNumber] = useState(0);
  const [marchandiseurNumber, setMarchandiseurNumber] = useState(0);
  const [tacheNumber, setTacheNumber] = useState(0);
  const [rapportNumber, setRapportNumber] = useState(0);
  const [rapportConcurrentNumber, setRapportConcurrentNumber] = useState(0);
  const [produitConcurrentNumber, setProduitConcurrentNumber] = useState(0);

  const themeReducer = useSelector((state) => state.ThemeReducer.mode);
  useEffect(() => {
    GetProductsNumber();
    GetMarchandiseurNumber();
    GetTachesNumber();
    GetRapportNumber();
    GetRapportConcurrentNumber();
    GetproductsConcurrentNumber();
  }, []);

  const chartOptions = {
    series: [productsNumber,marchandiseurNumber,tacheNumber,rapportNumber+rapportConcurrentNumber,produitConcurrentNumber ],
    options: {
      chart: {
        width: 380,
        type: "polarArea",
      },
      labels: ["Produit", "Marchandiseur", "Tache", "Rapport"
      , "Produits concurrent"],
      fill: {
        opacity: 1,
      },
      stroke: {
        width: 1,
        colors: undefined,
      },
      yaxis: {
        show: false,
      },
      legend: {
        position: "bottom",
      },
      plotOptions: {
        polarArea: {
          rings: {
            strokeWidth: 0,
          },
          spokes: {
            strokeWidth: 0,
          },
        },
      },
      theme: {
        monochrome: {
          enabled: true,
          shadeTo: "light",
          shadeIntensity: 0.6,
        },
      },
    },
  };

  const GetProductsNumber = async () => {
    const url =
      "http://localhost:5000/products/dashboard/" + localStorage.getItem("id");
    await axios.get(url).then((res) => {
      setProductsNumber(res.data.result);
    });
  };
  const GetMarchandiseurNumber = async () => {
    const url =
      "http://localhost:5000/marchandiseurs/dashboard/" +
      localStorage.getItem("id");
    await axios.get(url).then((res) => {
      setMarchandiseurNumber(res.data.result);
    });
  };
  const GetTachesNumber = async () => {
    const url =
      "http://localhost:5000/Tache/dashboard/" + localStorage.getItem("id");
    await axios.get(url).then((res) => {
      setTacheNumber(res.data.result);
    });
  };
  const GetRapportNumber = async () => {
    const url =
      "http://localhost:5000/rapports/dashboard/" + localStorage.getItem("id");
    await axios.get(url).then((res) => {
      setRapportNumber(res.data.result);
    });
  };
    const GetRapportConcurrentNumber = async () => {
      const url =
      "http://localhost:5000/rapportConcurrent/dashboard/" + localStorage.getItem("id");
    await axios.get(url).then((res) => {
      setRapportConcurrentNumber(res.data.result);
    });
  };
  const GetproductsConcurrentNumber = async () => {
    const url =
    "http://localhost:5000/products-concurrent/dashboard/" + localStorage.getItem("id");
  await axios.get(url).then((res) => {
    setProduitConcurrentNumber(res.data.result);
  });
};
  

  return (
    <div>
      <div className="row">
        <div className="col-6">
          <div className="row">
            <div className="col-6">
              <StatusCard
                icon="bx bx-shopping-bag"
                count={productsNumber}
                title="Produits"
              />
            </div>
            <div className="col-6">
              <StatusCard
                icon="bx bx-user-pin"
                count={marchandiseurNumber}
                title="Marchandiseurs"
              />
            </div>
            <div className="col-6">
              <StatusCard
                icon="bx bx-task"
                count={tacheNumber}
                title="Tâches"
              />
            </div>
            <div className="col-6">
              <StatusCard
                icon="bx bx-receipt"
                count={rapportNumber + rapportConcurrentNumber}
                title="Rapports"
              />
            </div>
            <div className="col-6">
              <StatusCard
                icon="bx bx-receipt"
                count={produitConcurrentNumber}
                title="produits concurrents"
              />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card full-height">
            {/* chart */}
            <div id="chart">
              <ReactApexChart
                options={
                  themeReducer === "theme-mode-dark"
                    ? {
                        ...chartOptions.options,
                        theme: { mode: "dark" },
                      }
                    : {
                        ...chartOptions.options,
                        theme: { mode: "light" },
                      }
                }
                series={chartOptions.series}
                type="polarArea"
                width={550}
               
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
