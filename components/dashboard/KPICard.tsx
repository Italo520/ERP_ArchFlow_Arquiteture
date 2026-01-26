import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: number;
    trendLabel?: string;
    intent?: "positive" | "negative" | "neutral";
}

export function KPICard({
    title,
    value,
    icon: Icon,
    trend,
    trendLabel,
    intent = "neutral",
}: KPICardProps) {
    const isPositive = trend !== undefined && trend > 0;

    // Determine color based on intent and direction
    let trendColor = "text-muted-foreground";

    // Logic: 
    // if intent is positive (e.g. Revenue): Up is Good (Green), Down is Bad (Red)
    // if intent is negative (e.g. Churn): Up is Bad (Red), Down is Good (Green)
    // if intent is neutral: standard text color

    if (intent === "positive") {
        trendColor = isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400";
    } else if (intent === "negative") {
        trendColor = isPositive ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400";
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {(trend !== undefined || trendLabel) && (
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        {trend !== undefined && (
                            <span className={cn("font-medium", trendColor)}>
                                {trend > 0 ? "+" : ""}{trend}%
                            </span>
                        )}
                        {trendLabel && <span>{trendLabel}</span>}
                    </p>
                )}
            </CardContent>
        </Card>
    )
}
