import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
const options = {
  title: {
    text: "Past Analysis of Trending Coupons",
  },

  subtitle: {
    text: "",
  },

  yAxis: {
    title: {
      text: "Percentages",
    },
  },

  xAxis: {
    accessibility: {
      // rangeDescription: 'Range: 2010 to 2017'
    },
  },

  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "middle",
  },

  plotOptions: {
    series: {
      label: {
        connectorAllowed: false,
      },
      pointStart: 2018,
    },
  },

  series: [
    {
      name: "TryNew",
      data: [43, 52, 57, 58, 97, 11, 13, 41],
    },
    {
      name: "TrendingNew",
      data: [24, 24, 29, 51, 90, 82, 21, 34],
    },
    {
      name: "APluSCoupon",
      data: [43, 52, 87, 68, 27, 11, 14, 90],
    },
    {
      name: "SaverThings",
      data: [13, 22, 57, 59, 17, 12, 13, 45],
    },
    {
      name: "CoatsDiscounts",
      data: [24, 24, 29, 51, 90, 82, 21, 34],
    },
  ],

  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          legend: {
            layout: "horizontal",
            align: "center",
            verticalAlign: "bottom",
          },
        },
      },
    ],
  },
};
const Line = () => {
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Line;
