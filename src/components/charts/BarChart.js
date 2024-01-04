import React from 'react'
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function DailyBarChart(props) {
    const openSansFont = "'Open Sans', sans-serif";
    
    return (
        <div>
            <Bar
                data={{
                    labels: props.chartLabels,
                    datasets: [
                        {
                            label: props.yLabel,
                            data: props.chartData,
                        }
                    ]
                }}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: props.title,
                            font: {
                                family: openSansFont,
                                weight: 'bold',
                                size: 20
                            },
                            color: 'black'
                        },
                    },
                }}
            />
        </div>
    )
}
