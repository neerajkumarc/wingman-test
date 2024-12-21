"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { PiChartBarFill } from "react-icons/pi";

const data = [
  {
    period: "This week",
    consultations: 20,
    orders: 15,
  },
  {
    period: "Last week",
    consultations: 15,
    orders: 10,
  },
];

export default function ComparisonChart() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-base font-medium text-muted-foreground">
          <p className="flex gap-2 items-center">
            <PiChartBarFill />
            VS PAST PERIOD
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            consultations: {
              label: "Consultations",
              color: "hsl(165, 100%, 95%)",
            },
            orders: {
              label: "Orders closed",
              color: "hsl(165, 100%, 15%)",
            },
          }}
          className="h-[300px] w-[200px]"
        >
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5,
            }}
          >
            <XAxis
              dataKey="period"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              domain={[0, 25]}
            />
            <Bar
              dataKey="consultations"
              fill="var(--color-consultations)"
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
            <Bar
              dataKey="orders"
              fill="var(--color-orders)"
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
