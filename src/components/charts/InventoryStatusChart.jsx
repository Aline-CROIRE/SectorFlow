"use client"

import styled from "styled-components"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const InventoryStatusChart = ({ sectorColor }) => {
  // Mock data for inventory status
  const data = {
    labels: ["In Stock", "Low Stock", "Out of Stock", "On Order"],
    datasets: [
      {
        label: "Number of Products",
        data: [120, 15, 8, 25],
        backgroundColor: [`${sectorColor || "#4B0082"}99`, "#FFC107", "#DC3545", `${sectorColor || "#4B0082"}55`],
        borderColor: [`${sectorColor || "#4B0082"}`, "#FFC107", "#DC3545", `${sectorColor || "#4B0082"}`],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#2D2D2D",
        bodyColor: "#2D2D2D",
        borderColor: "#DEE2E6",
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <ChartContainer>
      <ChartTitle>Inventory Status</ChartTitle>
      <ChartWrapper>
        <Bar data={data} options={options} />
      </ChartWrapper>
    </ChartContainer>
  )
}

const ChartContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  height: 100%;
`

const ChartTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`

const ChartWrapper = styled.div`
  height: 250px;
`

export default InventoryStatusChart
