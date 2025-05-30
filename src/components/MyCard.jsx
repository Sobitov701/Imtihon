import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StatusBadge from "./StatusBages";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

function MyCard({
  invoicesId = "RT3080",
  createdAt = "Due 19 Aug 2021",
  clientName = "Jensen Huang",
  total = "1,800.90",
  status = "paid",
  id = " ",
}) {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/${id}`)}
      className="w-full max-w-[730px] h-[72px] pt-[16px] px-[32px] mb-[16px] border-2 border-transparent hover:border-[#7C5DFA] transition-colors duration-200 cursor-pointer bg-white dark:bg-[#1E2139]"
    >
      <CardHeader className="p-0">
        <div className="flex items-center justify-between">
          <CardTitle className="font-bold text-xs tracking-[-0.25px] min-w-[80px] text-[#0C0E16] dark:text-white">
            <span className="text-[#7C5DFA]">#</span>
            {invoicesId}
          </CardTitle>
          <CardDescription className="text-[#888EB0] dark:text-[#DFE3FA] text-xs min-w-[100px]">
            {createdAt}
          </CardDescription>
          <span className="font-medium text-xs text-[#858BB2] dark:text-[#DFE3FA] min-w-[120px]">
            {clientName}
          </span>
          <span className="font-bold text-base tracking-[-0.8px] text-right min-w-[100px] text-[#0C0E16] dark:text-white">
            £{total}
          </span>
          <StatusBadge status={status} />
          <ArrowRight className="text-[#7C5DFA]" />
        </div>
      </CardHeader>
    </Card>
  );
}

export default MyCard;
