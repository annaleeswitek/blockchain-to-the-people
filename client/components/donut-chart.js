import React from 'react';
import {PieChart, Pie, Legend, Tooltip} from 'recharts'

const DonutChart = (props) => {

  return (
    <PieChart width={1000} height={1000}>
      <Pie isAnimationActive={true} data={props.data} dataKey="value" nameKey="name" cx={700} cy={300} innerRadius={150} outerRadius={200} fill="#82ca9d" label />
      <Tooltip />
    </PieChart>
  )
}

export default DonutChart
