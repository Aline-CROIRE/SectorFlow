"use client"

import { useState } from "react"
import styled from "styled-components"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const SalesChart = ({ sectorColor }) => {
  const [timeRange, setTimeRange] = useState("week")

  // Generate mock data based on time range
  const generateData = () => {
    let labels = []
    let data = []

    switch (timeRange) {
      case "week":
        labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        data = [12000, 19000, 15000, 25000, 22000, 30000, 35000]
        break
      case "month":
        labels = Array.from({ length: 30 }, (_, i) => `${i + 1}`)
        data = Array.from({ length: 30 }, () => Math.floor(Math.random() * 40000) + 10000)
        break
      case "year":
        labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        data = [150000, 180000, 210000, 190000, 220000, 250000, 270000, 260000, 290000, 300000, 340000, 380000]
        break
      default:
        labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        data = [12000, 19000, 15000, 25000, 22000, 30000, 35000]
    }

    return { labels, data }
  }

  const { labels, data } = generateData()

  const chartData = {
    labels,
    datasets: [
      {
        label: "Sales (RWF)",
        data,
        borderColor: sectorColor || "#4B0082",
        backgroundColor: `${sectorColor || "#4B0082"}20`,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: sectorColor || "#4B0082",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
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
        usePointStyle: true,
        callbacks: {
          label: (context) => `RWF ${context.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => {
            if (value >= 1000000) {
              return `${value / 1000000}M`
            } else if (value >= 1000) {
              return `${value / 1000}K`
            }
            return value
          },
        },
      },
    },
  }

  return (
    <ChartContainer>
      <ChartHeader>
        <ChartTitle>Sales Overview</ChartTitle>
        <TimeRangeSelector>
          <TimeRangeButton active={timeRange === "week"} onClick={() => setTimeRange("week")} accentColor={sectorColor}>
            Week
          </TimeRangeButton>
          <TimeRangeButton
            active={timeRange === "month"}
            onClick={() => setTimeRange("month")}
            accentColor={sectorColor}
          >
            Month
          </TimeRangeButton>
          <TimeRangeButton active={timeRange === "year"} onClick={() => setTimeRange("year")} accentColor={sectorColor}>
            Year
          </TimeRangeButton>
        </TimeRangeSelector>
      </ChartHeader>
      <ChartWrapper>
        <Line data={chartData} options={options} />
      </ChartWrapper>
    </ChartContainer>
  )
}

const ChartContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 2rem;
`

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`

const ChartTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
`

const TimeRangeSelector = styled.div`
  display: flex;
  gap: 0.5rem;
`

const TimeRangeButton = styled.button`
  background-color: ${(props) => (props.active ? `${props.accentColor || props.theme.colors.primary}20` : "transparent")};
  color: ${(props) => (props.active ? props.accentColor || props.theme.colors.primary : props.theme.colors.textLight)};
  border: 1px solid ${(props) => (props.active ? props.accentColor || props.theme.colors.primary : props.theme.colors.border)};
  border-radius: 4px;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${(props) => `${props.accentColor || props.theme.colors.primary}10`};
  }
`

const ChartWrapper = styled.div`
  height: 300px;
`

export default SalesChart
