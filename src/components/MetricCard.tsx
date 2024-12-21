import { TrendingDown, TrendingUp } from "lucide-react";
import { Card } from "./ui/card";
import NumberTicker from "./ui/number-ticker";

const MetricCard = ({
  icon,
  title,
  value,
  trend,
  trendValue,
  isPercentage = false,
  isCurrency = false,
}: any) => (
  <Card className="p-4 bg-white">
    <div className="space-y-2">
      <div className="text-xs text-gray-500 flex gap-2 items-center">
        <span>{icon}</span>
        {title}
      </div>
      <div className="text-2xl font-bold">
        {isCurrency && "$"}
        <NumberTicker value={value} />
        {isPercentage && "%"}
      </div>
      <div
        className={`flex items-center text-sm ${
          trend === "up" ? "text-green-500" : "text-red-500"
        }`}
      >
        {trend === "up" ? (
          <TrendingUp className="w-4 h-4 mr-1" />
        ) : (
          <TrendingDown className="w-4 h-4 mr-1" />
        )}
        <NumberTicker
          value={trendValue}
          className={trend === "up" ? "text-green-500" : "text-red-500"}
        />
        %{trend === "up" ? "increase" : "decrease"}
      </div>
    </div>
  </Card>
);

export default MetricCard;
