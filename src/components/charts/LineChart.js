import React from 'react'
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

export default function LineChart() {
    return (
        <div>
            <Line
                data={{
                    labels: ["A", "B", "C"],
                    datasets: [
                        {
                            label: "Revenue",
                            data: [200, 300, 400],
                        },
                        {
                            label: "Loss",
                            data: [90, 80, 70],
                        }
                    ]
                }}
                options={{
                    plugins: {
                      title: {
                        display: true,
                        text: 'Distances used this week',
                      },
                    },
                  }}
            />
        </div>
    )
}
