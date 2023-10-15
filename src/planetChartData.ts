const data1 = [1, 2, 3, 4, 5]
const data2 = [1, 2, 3, 4, 5]
export const planetChartData = {
    type: "line",
    data: {
        labels: ["1", "2", "3", "4", "5", "6", "7"],
        datasets: [
            {
                label: "Transactions",
                data: data1,
                backgroundColor: "rgba(54,73,93,.5)",
                borderColor: "#36495d",
                borderWidth: 3,
                tension: 1
            },
            {
                label: "Blockchain Production",
                data: data2,
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
