"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tag, TrendingDown, TrendingUp } from "lucide-react";
import {
  BiSolidMessageSquare,
  BiSolidMessageSquareDetail,
} from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";
import {
  PiChartPieSliceFill,
  PiCoinFill,
  PiCoinsFill,
  PiPiggyBankFill,
  PiTagFill,
} from "react-icons/pi";
import Image from "next/image";
import { fetchDashboardData, DashboardData } from "@/lib/api";
import MetricCard from "./MetricCard";
import ForecastCard from "./ForecastCard";

const ConsultationsChart = dynamic(() => import("./charts/consultant-chart"), {
  ssr: false,
  loading: () => <p>Loading chart...</p>,
});
const ComparisonChart = dynamic(() => import("./charts/comparison-chart"), {
  ssr: false,
  loading: () => <p>Loading chart...</p>,
});
const DashboardContent = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchDashboardData();
      setData(result);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        <Tabs defaultValue="summary">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger
                value="summary"
                className="data-[state=active]:bg-[#CCFBEF] data-[state=active]:black p-4 rounded-full px-6 flex items-center gap-2"
              >
                <PiChartPieSliceFill />
                Summary
              </TabsTrigger>
              <TabsTrigger
                value="sales"
                className="data-[state=active]:bg-[#CCFBEF] data-[state=active]:black p-4 rounded-full px-6 flex items-center gap-2"
              >
                <PiTagFill />
                Sales
              </TabsTrigger>
              <TabsTrigger
                value="chats"
                className="data-[state=active]:bg-[#CCFBEF] data-[state=active]:black p-4 rounded-full px-6 flex items-center gap-2"
              >
                <BiSolidMessageSquareDetail />
                Chats
              </TabsTrigger>
            </TabsList>
            <select className="p-2 border rounded-md bg-white">
              <option>7 days</option>
              <option>30 days</option>
              <option>90 days</option>
            </select>
          </div>

          <div className="rounded-lg shadow-sm border bg-white px-6 py-8">
            <TabsContent value="summary">
              <h1 className="text-2xl font-medium">At a glance</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8">
                <MetricCard
                  icon={<BiSolidMessageSquare />}
                  title="CONSULTATIONS"
                  value={data?.consultations || 0}
                  trend="up"
                  trendValue={15}
                />
                <MetricCard
                  icon={<Tag size={12} />}
                  title="ORDERS PLACED"
                  value={data?.ordersPlaced || 0}
                  trend="down"
                  trendValue={15}
                />
                <MetricCard
                  icon={<FaCheck />}
                  title="CONVERSION"
                  value={data?.conversion || 0}
                  trend="down"
                  trendValue={15}
                  isPercentage
                />
                <MetricCard
                  icon={<PiCoinsFill />}
                  title="TOTAL SALES VALUE"
                  value={data?.totalSalesValue || 0}
                  trend="up"
                  trendValue={15}
                  isCurrency
                />
                <MetricCard
                  icon={<PiCoinFill />}
                  title="AVG ORDER VALUE"
                  value={data?.avgOrderValue || 0}
                  trend="up"
                  trendValue={15}
                  isCurrency
                />
                <MetricCard
                  icon={<PiPiggyBankFill />}
                  title="COMMISSION PAID"
                  value={data?.commissionPaid || 0}
                  trend="up"
                  trendValue={15}
                  isCurrency
                />
              </div>

              <div className="mt-8 space-y-8">
                <h1 className="text-2xl font-medium">Insights</h1>
                <div className="grid grid-cols-4 gap-4">
                  <Card className="col-span-2 bg-white">
                    <ConsultationsChart />
                  </Card>
                  <Card className="col-span-1">
                    <ComparisonChart />
                  </Card>
                  <ForecastCard />
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Orders</h2>
                <Card className="bg-white">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4">Product</th>
                          <th className="text-left p-4">Date</th>
                          <th className="text-left p-4">Time spent</th>
                          <th className="text-left p-4">Order Value</th>
                          <th className="text-left p-4">Commission</th>
                          <th className="text-right p-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.orders.map((order) => (
                          <tr key={order.id} className="border-b last:border-0">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-100 rounded-full">
                                  <Image
                                    src="/buds.jpg"
                                    width={40}
                                    height={40}
                                    alt="buds"
                                  />
                                </div>
                                <span>{order.productName}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <div>
                                <p className="text-medium">{order.date}</p>
                                <p className="text-xs">{order.time}</p>
                              </div>
                            </td>
                            <td className="p-4">{order.timeSpent}</td>
                            <td className="p-4">
                              ${order.orderValue.toFixed(2)}
                            </td>
                            <td className="p-4 font-bold">
                              ${order.commission.toFixed(2)}
                            </td>
                            <td className="p-4 text-right">
                              <button className="text-sm text-blue-500">
                                View Chat
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="sales">
              <h1 className="text-2xl font-medium">Sales</h1>
            </TabsContent>

            <TabsContent value="chats">
              <h1 className="text-2xl font-medium">Chats</h1>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardContent;
