export const planetChartData = {
    type: "line",
    data: {
        labels: ["1", "2", "3", "4", "5", "6", "7"],
        datasets: [
            {
                label: "Transactions",
                data: [0, 0, 1, 2, 379, 482, 227],
                backgroundColor: "rgba(54,73,93,.5)",
                borderColor: "#36495d",
                borderWidth: 3,
                tension: 1
            },
            {
                label: "Blockchain Production",
                data: [0.166, 2.081, 3.003, 0.323, 954.792, 285.886, 51.514],
                backgroundColor: "rgba(71, 183,132,.5)",
                borderColor: "#47b784",
                borderWidth: 3,
                tension: 1
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    padding: 25,
                }
            }
        }
    }
};
