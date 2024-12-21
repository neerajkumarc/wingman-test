import { BiSolidMessageSquare } from "react-icons/bi";
import { Card } from "./ui/card";
import { TrendingUp } from "lucide-react";

const ForecastCard = () => (
  <Card className="p-4 bg-[#109f8c] text-white relative overflow-hidden z-50 py-6 px-8">
    <div className="w-72 h-72 bg-[#27bba5] rounded-full absolute top-[-80px] left-[-60px] z-20"></div>
    <div className="w-[400px] h-[400px] bg-[#16b09b] rounded-full absolute top-[-100px] left-[-80px] z-10"></div>
    <div className="space-y-8 relative z-30">
      <div className="text-md flex gap-2 items-center">
        <BiSolidMessageSquare />
        FORECASTS
      </div>
      <div>
        <div className="flex items-center justify-between">
          <span className="text-5xl font-bold">+15%</span>
          <TrendingUp className="w-8 h-8" />
        </div>
        <p className="text-sm mt-2">
          forecasted increase in your sales closed by the end of the current
          month
        </p>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <span className="text-5xl font-bold">+20%</span>
          <TrendingUp className="w-8 h-8" />
        </div>
        <p className="text-sm mt-2">
          forecasted increase in consultations by the end of the current month
        </p>
      </div>
    </div>
  </Card>
);

export default ForecastCard;
