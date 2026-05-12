"use client";

import { format } from "date-fns";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { cn } from "@/shared/utils";
import { StatusBadge } from "./status-badge";
import type { OrderHistoryEntry, OrderStatus } from "@/types/order";

interface OrderTimelineProps {
  history?: OrderHistoryEntry[];
  currentStatus: OrderStatus;
}

const statusOrder: OrderStatus[] = ["pending", "processing", "shipped", "delivered"];

export function OrderTimeline({ history, currentStatus }: OrderTimelineProps) {
  // If no history, generate default timeline based on current status
  const timeline = history || generateDefaultTimeline(currentStatus);

  if (timeline.length === 0) {
    return <div className="text-sm text-muted-foreground">No timeline available</div>;
  }

  return (
    <div className="space-y-4">
      {timeline.map((entry, index) => {
        const isLast = index === timeline.length - 1;
        const isCurrent = entry.status === currentStatus;
        const isCancelled = entry.status === "cancelled";

        return (
          <div key={entry.id} className="relative flex gap-4">
            {/* Timeline line */}
            {!isLast && (
              <div
                className={cn(
                  "absolute left-[11px] top-6 h-full w-0.5",
                  isCancelled ? "bg-destructive/20" : isCurrent ? "bg-primary/20" : "bg-muted"
                )}
              />
            )}

            {/* Status icon */}
            <div className="relative z-10 flex-shrink-0">
              {isCancelled ? (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive">
                  <Circle className="h-3 w-3 text-destructive-foreground" />
                </div>
              ) : isCurrent ? (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                  <Clock className="h-3 w-3 text-primary-foreground" />
                </div>
              ) : (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                  <CheckCircle2 className="h-3 w-3 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 space-y-1 pb-4">
              <div className="flex items-center justify-between">
                <StatusBadge status={entry.status} />
                <span className="text-xs text-muted-foreground">
                  {format(new Date(entry.timestamp), "PPp")}
                </span>
              </div>

              {entry.user && (
                <p className="text-sm text-muted-foreground">
                  Updated by <span className="font-medium">{entry.user}</span>
                </p>
              )}

              {entry.note && <p className="text-sm text-muted-foreground italic">{entry.note}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Generate default timeline if no history exists
function generateDefaultTimeline(currentStatus: OrderStatus): OrderHistoryEntry[] {
  const now = new Date();
  const timeline: OrderHistoryEntry[] = [];

  // Add current status
  timeline.push({
    id: "current",
    status: currentStatus,
    timestamp: now.toISOString(),
    user: "System",
  });

  // If cancelled, only show that
  if (currentStatus === "cancelled") {
    return timeline;
  }

  // Add previous statuses based on order
  const currentIndex = statusOrder.indexOf(currentStatus);
  for (let i = currentIndex - 1; i >= 0; i--) {
    const pastDate = new Date(now);
    pastDate.setHours(now.getHours() - (currentIndex - i) * 24);

    timeline.push({
      id: `past-${i}`,
      status: statusOrder[i],
      timestamp: pastDate.toISOString(),
      user: "System",
    });
  }

  return timeline.reverse();
}
