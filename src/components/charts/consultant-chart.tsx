"use client";

import {
  Bar,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { BiSolidMessageSquare } from "react-icons/bi";

const data = [
  { day: "Mon", incoming: 32, answered: 28, expertsOnline: 25 },
  { day: "Tue", incoming: 35, answered: 27, expertsOnline: 24 },
  { day: "Wed", incoming: 42, answered: 32, expertsOnline: 30 },
  { day: "Thu", incoming: 48, answered: 45, expertsOnline: 35 },
  { day: "Fri", incoming: 45, answered: 35, expertsOnline: 28 },
  { day: "Sat", incoming: 48, answered: 35, expertsOnline: 30 },
  { day: "Sun", incoming: 52, answered: 38, expertsOnline: 32 },
];

export default function ConsultationsChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base font-medium text-muted-foreground">
          <p className="flex gap-2 items-center">
            <BiSolidMessageSquare />
            CONSULTATIONS
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            incoming: {
              label: "Incoming",
              color: "hsl(220, 9%, 46%)",
            },
            answered: {
              label: "Answered",
              color: "hsl(172, 67%, 45%)",
            },
            expertsOnline: {
              label: "Experts online",
              color: "hsl(44, 100%, 77%)",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                yAxisId="left"
                orientation="left"
                domain={[0, 60]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, 20]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
              <Bar
                dataKey="expertsOnline"
                fill="var(--color-expertsOnline)"
                yAxisId="left"
                opacity={0.2}
                barSize={40}
              />
              <Line
                type="monotone"
                dataKey="incoming"
                stroke="var(--color-incoming)"
                strokeDasharray="3 3"
                dot={false}
                yAxisId="left"
              />
              <Line
                type="monotone"
                dataKey="answered"
                stroke="var(--color-answered)"
                yAxisId="left"
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
