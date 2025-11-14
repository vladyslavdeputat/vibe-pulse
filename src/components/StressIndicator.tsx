import { Smile, Meh, Frown } from "lucide-react";
import { cn } from "@/lib/utils";

export const StressStatus = ({
  stressLevel,
  mood,
}: {
  stressLevel: number;
  mood: string;
}) => {
  if (stressLevel <= 3) {
    return (
      <div className="flex items-center gap-2 text-emerald-500">
        <Smile className="h-5 w-5" />
        <span className="text-sm capitalize">{mood}</span>
      </div>
    );
  } else if (stressLevel <= 6) {
    return (
      <div className="flex items-center gap-2 text-yellow-500">
        <Meh className="h-5 w-5" />
        <span className="text-sm capitalize">{mood}</span>
      </div>
    );
  } else {
    return (
      <div className="flex items-center gap-2 text-red-500">
        <Frown className="h-5 w-5" />
        <span className="text-sm capitalize">{mood}</span>
      </div>
    );
  }
};

export const StressLevelBar = ({ stressLevel }: { stressLevel: number }) => {
  const stressPercentage = (stressLevel / 10) * 100;
  const stressColor =
    stressLevel <= 3
      ? "bg-emerald-500"
      : stressLevel <= 6
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-foreground">
          {stressLevel}/10
        </span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", stressColor)}
          style={{ width: `${stressPercentage}%` }}
        />
      </div>
    </div>
  );
};
