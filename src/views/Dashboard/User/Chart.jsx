import React from "react";
import { render } from "react-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

const options = {
  chart: {
    type: "column",
  },
  title: {
    text: "Coupon Purchases",
  },
  subtitle: {
    text: "",
  },
  accessibility: {
    announceNewData: {
      enabled: true,
    },
  },
  xAxis: [
    {
      type: "category",
    },
  ],
  yAxis: {
    title: {
      text: "Total percent",
    },
  },
  legend: {
    enabled: true,
  },
  plotOptions: {
    series: {
      borderWidth: 0,
      dataLabels: {
        enabled: true,
        format: "{point.y:.1f}%",
      },
    },
  },

  tooltip: {
    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    pointFormat:
      '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
  },

  series: [
    {
      name: "All ",
      colorByPoint: true,
      data: [
        {
          name: "TryNew",
          y: 62.74,
          drilldown: "Confidence",
        },
        {
          name: "TrendingNew",
          y: 64.57,
          drilldown: "posture",
        },
        {
          name: "APluSCoupon",
          y: 37.23,
          drilldown: "Pitch",
        },
        {
          name: "SaverThings",
          y: 78.12,
          drilldown: "Tone",
        },
        {
          name: "CoatsDiscounts ",
          y: 67.02,
          drilldown: "Gestures",
        },
      ],
    },
  ],
  drilldown: {
    breadcrumbs: {
      position: {
        align: "right",
      },
    },
    series: [
      {
        name: "Confidence",
        id: "Confidence",
        data: [
          ["v65.0", 0.1],
          ["v64.0", 1.3],
          ["v63.0", 53.02],
          ["v62.0", 1.4],
          ["v61.0", 0.88],
          ["v60.0", 0.56],
          ["v59.0", 0.45],
          ["v58.0", 0.49],
          ["v57.0", 0.32],
          ["v56.0", 0.29],
          ["v55.0", 0.79],
          ["v54.0", 0.18],
          ["v51.0", 0.13],
          ["v49.0", 2.16],
          ["v48.0", 0.13],
          ["v47.0", 0.11],
          ["v43.0", 0.17],
          ["v29.0", 0.26],
        ],
      },
      {
        name: "posture",
        id: "posture",
        data: [
          ["v58.0", 1.02],
          ["v57.0", 7.36],
          ["v56.0", 0.35],
          ["v55.0", 0.11],
          ["v54.0", 0.1],
          ["v52.0", 0.95],
          ["v51.0", 0.15],
          ["v50.0", 0.1],
          ["v48.0", 0.31],
          ["v47.0", 0.12],
        ],
      },
      {
        name: "Pitch",
        id: "Pitch",
        data: [
          ["v11.0", 6.2],
          ["v10.0", 0.29],
          ["v9.0", 0.27],
          ["v8.0", 0.47],
        ],
      },
      {
        name: "Tone",
        id: "Tone",
        data: [
          ["v11.0", 3.39],
          ["v10.1", 0.96],
          ["v10.0", 0.36],
          ["v9.1", 0.54],
          ["v9.0", 0.13],
          ["v5.1", 0.2],
        ],
      },
      {
        name: "Gestures",
        id: "Gestures",
        data: [
          ["v16", 2.6],
          ["v15", 0.92],
          ["v14", 0.4],
          ["v13", 0.1],
        ],
      },
      {
        name: "Eye contact",
        id: "Eye contact",
        data: [
          ["v50.0", 0.96],
          ["v49.0", 0.82],
          ["v12.1", 0.14],
        ],
      },
    ],
  },
};

const Chart = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "85%" }}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};

export default Chart;
