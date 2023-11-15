import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
const Analytics = () => {
  const { seller } = useSelector((state) => state.seller);
  const [appMode, setAppMode] = useState(null);
  const [comparisonType, setComparisonType] = useState("");
  // const [showMonthComparison, setShowMonthComparison] = useState(false);
  // const [showDayComparison, setShowDayComparison] = useState(false);

  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");
  const [data, setData] = useState([]);

  const switchMode = (mode) => {
    if (appMode === mode) {
      // Nếu đã chọn rồi thì không làm gì cả
      return;
    }
    setTime1("");
    setTime2("");
    setData([]);
    setAppMode(mode);
  };

  const handleOptionChange = (event) => {
    setComparisonType(event.target.value);
    setTime1("");
    setTime2("");
    setData([]);
  };

  // const handleOptionChange = (option) => {
  //   if (option === "month") {
  //     setShowMonthComparison(true);
  //     setShowDayComparison(false);
  //   } else if (option === "day") {
  //     setShowMonthComparison(false);
  //     setShowDayComparison(true);
  //   }
  // };

  const getDataDay = async () => {
    try {
      const response = await axios.get(
        `${server}/analytics/invoices-two-days?shopId=${seller._id}&time1=${time1}&time2=2024-01-01`,
        {
          withCredentials: true,
        }
      );
      // Xử lý response nếu cần
      setData(response.data);
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error saving data:", error);
    }
  };

  const getDataMonth = async () => {
    try {
      const response = await axios.get(
        `${server}/analytics/invoices-two-months?shopId=${seller._id}&time1=${time1}&time2=2024-01-01`,
        {
          withCredentials: true,
        }
      );
      // Xử lý response nếu cần
      setData(response.data);
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error saving data:", error);
    }
  };

  const getDataBetweenMonths = async () => {
    try {
      const response = await axios.get(
        `${server}/analytics/invoices-two-months?shopId=${seller._id}&time1=${time1}&time2=${time2}`,
        {
          withCredentials: true,
        }
      );
      // Xử lý response nếu cần
      setData(response.data);
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error saving data:", error);
    }
  };

  const processDataForPieChart = (data) => {
    const totalValue1 = data.totalValue1;
    const totalValue2 = data.totalValue2;

    // Tạo một mảng dữ liệu phù hợp cho Pie Chart
    const pieChartData = [
      {
        name: "Ngày thứ nhất",
        value: totalValue1,
        fill: "#0bb4ff",
      },
      {
        name: "Ngày thứ hai",
        value: totalValue2,
        fill: "#e6d800",
      },
    ];

    return pieChartData;
  };

  const getDataBetweenDays = async () => {
    try {
      const response = await axios.get(
        `${server}/analytics/invoices-two-days?shopId=${seller._id}&time1=${time1}&time2=${time2}`,
        {
          withCredentials: true,
        }
      );

      // Xử lý dữ liệu và cập nhật trạng thái của component
      const processedData = processDataForPieChart(response.data);
      setData(processedData);
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className="bg-white w-full">
      <div className="flex w-full">
        <button
          className="btn btn-outline btn-info w-1/2 m-2 text-white font-bold "
          onClick={() => switchMode("search")}
        >
          Tìm kiếm
        </button>
        <button
          className="btn btn-outline btn-success w-1/2 m-2 text-white font-bold"
          onClick={() => switchMode("stats")}
        >
          Thống kê
        </button>
      </div>
      {appMode === "stats" && (
        <>
          <div className="m-2">
            <select
              value={comparisonType}
              onChange={(value) => handleOptionChange(value)}
              className="select select-success w-full max-w-xs font-bold text-success"
            >
              <option disabled selected>
                Pick your choice
              </option>

              <option value="day">Xem doanh thu của ngày cụ thể</option>
              <option value="month">Xem doanh thu của tháng cụ thể</option>
              <option value="dayComparison">
                So sánh doanh thu giữa 2 ngày
              </option>
              <option value="monthComparison">
                So sánh doanh thu giữa 2 tháng
              </option>
            </select>
          </div>
          {comparisonType === "day" && (
            <div className="flex flex-col m-2">
              <label htmlFor="time1">
                <span className="font-bold">Ngày:</span>
                <input
                  type="date"
                  value={time1}
                  onChange={(e) => setTime1(e.target.value)}
                  className="border rounded p-2 ml-0.5 mb-4"
                />
              </label>
              <label htmlFor="time2" className="invisible">
                <span className="font-bold">Tháng thứ hai:</span>
                <input
                  type="date"
                  value={time2}
                  onChange={(e) => setTime2(e.target.value)}
                  className="border rounded p-2 ml-3 mb-4"
                />
              </label>
              <button
                className="btn btn-success text-white font-bold"
                onClick={getDataDay}
              >
                Gửi dữ liệu
              </button>
            </div>
          )}
          {comparisonType === "month" && (
            <div className="flex flex-col m-2">
              <label htmlFor="time1">
                <span className="font-bold">Tháng:</span>
                <input
                  type="date"
                  value={time1}
                  onChange={(e) => setTime1(e.target.value)}
                  className="border rounded p-2 ml-0.5 mb-4"
                />
              </label>
              <label htmlFor="time2" className="invisible">
                <span className="font-bold">Tháng thứ hai:</span>
                <input
                  type="date"
                  value={time2}
                  onChange={(e) => setTime2(e.target.value)}
                  className="border rounded p-2 ml-3 mb-4"
                />
              </label>
              <button
                className="btn btn-success text-white font-bold"
                onClick={getDataMonth}
              >
                Gửi dữ liệu
              </button>
            </div>
          )}
          {comparisonType === "monthComparison" && (
            <div className="flex flex-col m-2">
              <label htmlFor="time1">
                <span className="font-bold">Tháng thứ nhất:</span>
                <input
                  type="date"
                  value={time1}
                  onChange={(e) => setTime1(e.target.value)}
                  className="border rounded p-2 ml-0.5 mb-4"
                />
              </label>
              <label htmlFor="time2">
                <span className="font-bold">Tháng thứ hai:</span>
                <input
                  type="date"
                  value={time2}
                  onChange={(e) => setTime2(e.target.value)}
                  className="border rounded p-2 ml-3 mb-4"
                />
              </label>
              <button
                className="btn btn-success text-white font-bold"
                onClick={getDataBetweenMonths}
              >
                Gửi dữ liệu
              </button>
            </div>
          )}
          {/* {showDayComparison && ( */}
          {comparisonType === "dayComparison" && (
            <div className="flex flex-col m-2">
              <label htmlFor="time1">
                <span className="font-bold">Ngày thứ nhất:</span>
                <input
                  type="date"
                  value={time1}
                  onChange={(e) => setTime1(e.target.value)}
                  className="border rounded p-2 ml-0.5 mb-4"
                />
              </label>
              <label htmlFor="time2">
                <span className="font-bold">Ngày thứ hai:</span>
                <input
                  type="date"
                  value={time2}
                  onChange={(e) => setTime2(e.target.value)}
                  className="border rounded p-2 ml-3 mb-4"
                />
              </label>
              <button
                className="btn btn-success text-white font-bold"
                onClick={getDataBetweenDays}
              >
                Gửi dữ liệu
              </button>
            </div>
          )}
          <div className="m-2">
            {comparisonType === "day" && data && data.totalValue1 && (
              <div className="text-success font-bold">
                Doanh thu của ngày {time1.slice(-2)} tháng {time1.slice(5, 7)} năm {time1.slice(0,4)} là: {data.totalValue1}
              </div>
            )}
            {comparisonType === "month" &&
              // showMonthComparison &&
              data &&
              data.dailyRevenueData &&
              data.dailyRevenueData.length > 0 && (
                <LineChart
                  width={730}
                  height={250}
                  data={data.dailyRevenueData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" name="Ngày" />
                  <YAxis name="Doanh thu" />
                  <Tooltip />
                  {/* <Legend /> */}
                  <Line
                    type="monotone"
                    dataKey="time1"
                    stroke="#e60049"
                    name="Doanh thu"
                  />
                  {/* <Line
                    type="monotone"
                    dataKey="time2"
                    stroke="#0bb4ff"
                    name="Tháng thứ hai"
                  /> */}
                </LineChart>
              )}
            {comparisonType === "monthComparison" &&
              // showMonthComparison &&
              data &&
              data.dailyRevenueData &&
              data.dailyRevenueData.length > 0 && (
                <LineChart
                  width={730}
                  height={250}
                  data={data.dailyRevenueData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="time1"
                    stroke="#e60049"
                    name="Tháng thứ nhất"
                  />
                  <Line
                    type="monotone"
                    dataKey="time2"
                    stroke="#0bb4ff"
                    name="Tháng thứ hai"
                  />
                </LineChart>
              )}

            {comparisonType === "dayComparison" && data && (
              <div>
                <PieChart width={730} height={250}>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {data &&
                      data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;
