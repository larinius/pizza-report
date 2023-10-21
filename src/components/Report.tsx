import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "./Report.css";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { getOrders } from "../redux/features/report/reportSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";

const Report = () => {
  const dispatch: ThunkDispatch<any, any, any> = useDispatch();
  const pizzaData = useSelector((state: RootState) => state.report.orders);
  const status = useSelector((state: RootState) => state.report.status);
  const error = useSelector((state: RootState) => state.report.error);

  useEffect(() => {
    console.log(status);
  }, [status, dispatch]);

  const handleGetReport = () => {
    dispatch(getOrders());
    console.log("Fetching report");
  };

  const toTitleCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const toppingsTemplate = (rowData: { toppings: any[] }) =>
    rowData.toppings.map(toTitleCase).join(", ");

  return (
    <div className="report-container">
      <div className="report-header">
        <h1>PIZZA REPORT</h1>
        <Button
          label="Get Report"
          icon="pi pi-file-pdf"
          onClick={handleGetReport}
        />
      </div>
      <div className="report-table-container">
        {status === "loading" && <div>Loading...</div>}
        {status === "succeeded" && (
          <DataTable value={pizzaData}>
            <Column
              field="toppings"
              header="Toppings"
              body={toppingsTemplate}
            />
            <Column
              field="count"
              header="Orders"
              style={{ textAlign: "right" }}
            />
            <Column field="rank" header="Rank" style={{ textAlign: "right" }} />
          </DataTable>
        )}
        {status === "failed" && <div>Error: {error}</div>}
      </div>
    </div>
  );
};

export default Report;
