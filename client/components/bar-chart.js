import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

const BarGraph = (props) => {
  return (
    <BarChart
          width={600} height={300} data={props.data}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
     <CartesianGrid strokeDasharray="3 3" />
     <XAxis dataKey="name" />
     <YAxis />
     <Tooltip />
     <Legend />
     <Bar dataKey="value" />
    </BarChart>
  );
}

export default BarGraph
