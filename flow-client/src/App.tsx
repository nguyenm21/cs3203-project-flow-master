import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { DataGrid, GridRowsProp } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "identifier", width: 90 },
  {
    field: "clicked",
    headerName: "Clicked",
    width: 150,
    editable: false,
  },
  {
    field: "mouseover",
    headerName: "Over",
    width: 150,
    editable: false,
  },
];
const data = JSON.parse(
  `{"grid-1":{"clicked":1,"mouseover":2},"grid-2":{"clicked":0,"mouseover":1},"grid-3":{"clicked":0,"mouseover":1},"grid-4":{"clicked":0,"mouseover":1},"grid-5":{"clicked":0,"mouseover":0},"grid-6":{"clicked":1,"mouseover":4},"grid-7":{"clicked":1,"mouseover":9},"grid-8":{"clicked":6,"mouseover":10},"grid-9":{"clicked":1,"mouseover":5},"grid-10":{"clicked":1,"mouseover":1},"grid-11":{"clicked":1,"mouseover":1},"grid-12":{"clicked":1,"mouseover":5},"grid-13":{"clicked":2,"mouseover":15},"grid-14":{"clicked":5,"mouseover":10},"grid-15":{"clicked":1,"mouseover":1},"grid-16":{"clicked":0,"mouseover":1},"grid-17":{"clicked":0,"mouseover":2},"grid-18":{"clicked":5,"mouseover":5},"grid-19":{"clicked":3,"mouseover":5},"grid-20":{"clicked":1,"mouseover":1},"grid-21":{"clicked":0,"mouseover":0},"grid-22":{"clicked":1,"mouseover":1},"grid-23":{"clicked":0,"mouseover":1},"grid-24":{"clicked":2,"mouseover":1},"grid-25":{"clicked":0,"mouseover":0}}`
);
const rows = Object.keys(data).map((flow: any) => {
  return { ...data[flow], id: flow };
});

function App() {
  const [_rows, set_rows] = useState<[[GridRowsProp]]>();
  const [_positions, set_positions] = useState<{
    data: any
  }>();

  useEffect(() => {
    (async () => {
      let x = await fetch(`http://localhost:3030/get`, {
        method: "GET",
        mode: "cors",
      });
      let data = (await x.json()).data;
      let r = Object.keys(data.analytics).map((flow: any) => {
        return { ...data.analytics[flow], id: flow };
      });
      set_rows(r as unknown as [[GridRowsProp]]);
      console.log(data.positions)
      set_positions(data.positions);
    })();
  }, []);

  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <div style={{ backgroundColor: "red", flex: 1, height: "100vh" }}></div>
        <div style={{ backgroundColor: "green", flex: 2, height: "100vh" }}>
          <div
            style={{
              backgroundColor: "gray",
              flex: 2,
              height: "400px",
              width: "600px",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            {_positions?.data.map((position: any) => {
              console.log(window.innerHeight);
              return (
                <div
                  style={{
                    background: "red",
                    borderRadius: "50%",
                    width: "5px",
                    height: "5px",
                    position: "absolute",
                    left: `${(600.0 * position.x) / window.innerWidth}px`,
                    top: `${(400.0 * position.y) / window.innerHeight}px`,
                  }}
                ></div>
              );
            })}
          </div>
          <div style={{ backgroundColor: "pink", flex: 1, height: "50vh" }}>
            <DataGrid
              style={{ height: "100%", width: "100%" }}
              columns={columns}
              rows={_rows!}
            />
          </div>
        </div>
        <div
          style={{ backgroundColor: "blue", flex: 1, height: "100vh" }}
        ></div>
      </div>
    </div>
  );
}

export default App;
