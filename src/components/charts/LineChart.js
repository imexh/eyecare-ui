import React from 'react'
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

export default function LineChart(props) {
    const openSansFont = "'Open Sans', sans-serif";

    return (
        <div>
            <Line
                data={{
                    labels: props.chartLabels,
                    datasets: [
                        {
                            label: props.yLabel1,
                            data: props.chartData1
                        },
                        {
                            label: props.yLabel2,
                            data: props.chartData2
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
