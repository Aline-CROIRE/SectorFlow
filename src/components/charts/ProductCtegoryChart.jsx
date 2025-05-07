"use client"

import styled from "styled-components"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend)

const ProductCategoryChart = ({ sectorColor }) => {
  // Mock data for product categories
  const data = {
    labels: ["Electronics", "Clothing", "Food & Beverages", "Home & Kitchen", "Beauty & Health"],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          sectorColor || "#4B0082",
          `${sectorColor || "#4B0082"}CC`,
          `${sectorColor || "#4B0082"}99`,
          `${sectorColor || "#4B0082"}66`,
          `${sectorColor || "#4B0082"}33`,
        ],
        borderColor: "#FFFFFF",
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 15,
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#2D2D2D",
        bodyColor: "#2D2D2D",
        borderColor: "#DEE2E6",
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}%`,
        },
      },
    },
  }

  return (
    <ChartContainer>
      <ChartTitle>Product Categories</ChartTitle>
      <ChartWrapper>
        <Pie data={data} options={options} />
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
  position: relative;
`

export default ProductCategoryChart
