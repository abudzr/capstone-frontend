import { Typography } from "@mui/material";
import React, {} from "react";
import { PieChart, Pie, Legend, Label,Tooltip } from "recharts";
import '../dashboard.css'


const data = [
  { name: "IT", value: 5, fill: "#7259FB" },
  { name: "Finance", value: 3, fill: "#F2AB56" },
];

const renderColorfulLegendText = (value) => {
    console.log(value,"value");
  return (
    <span style={{ color: "#596579", fontWeight: 500, padding: "10px" }}>
      {value}
    </span>
  );
};

export default function ChartUser() {
    return (
        <div className="chart-dashboard">
        <Typography className="title">Jumlah User</Typography>
        <PieChart width={800} height={300}>
        <Legend
            height={36}
            iconType="circle"
            layout="vertical"
            verticalAlign="middle"
            iconSize={10}
            padding={5}
            formatter={renderColorfulLegendText}
            />
        <Pie 
            data={data}
            cx={120}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
        >
        <Label 
            value="8" position="center"  className='label-chart'
            />
        </Pie>
        <Tooltip/>
        </PieChart>
        <Typography className="subtitle">Grafik jumlah User berdasarkan per departemen.</Typography>

        </div>
    );
}
