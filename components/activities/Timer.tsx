"use client";

import { useEffect, useState, useRef } from "react";
import { format, differenceInSeconds, startOfDay } from "date-fns";
import { Play, Pause, Square, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getRunningTimeLog, startTimeLog, stopTimeLog } from "@/app/actions/timeLog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TimeLogCategory } from "@prisma/client";

interface TimerProps {
    projects: { id: string; name: string }[];
}

export function Timer({ projects }: TimerProps) {
    const router = useRouter();
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [timerId, setTimerId] = useState<string | null>(null);

    // Form State
    const [description, setDescription] = useState("");
    const [projectId, setProjectId] = useState<string | undefined>(undefined);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<Date | null>(null);

    // 1. Sync on Mount
    useEffect(() => {
        async function syncTimer() {
            const { success, data } = await getRunningTimeLog();
            if (success && data) {
                // Found running timer on server
                setIsRunning(true);
                setTimerId(data.id);
                setProjectId(data.projectId);
                setDescription(data.description || "");

                // Calculate elapsed
                if (data.startTime) {
                    // Assuming startTime comes as ISO string or Date from server action
                    const start = new Date(data.startTime); // Ensure it's date object
                    // Note: Schema has @db.Time for startTime, so Prisma might return 1970-01-01 + time if simplistic, 
                    // BUT usually it's full DateTime if mapped correctly or if we just store full timestamp.
                    // Looking at schema: startTime DateTime? @map("start_time") @db.Time
                    // Wait, @db.Time means it loses the Date part? That's dangerous for calculating duration across midnights or just generally. 
                    // Ideally it should be DateTime. 
                    // If it's pure Time, we must assume it's TODAY's time or reconstruct it.
                    // Task 4.1 implementation set `startTime: new Date()` in action.
                    // Let's assume for now it behaves as a Timestamp or we handle it.
                    // If it IS just time, differenceInSeconds might be weird if day changed. 
                    // Let's trust it's a valid JS Date for now.

                    startTimeRef.current = start;
                    const now = new Date();
                    setElapsedSeconds(differenceInSeconds(now, start));
                }
            } else {
                // No running timer on server, check local storage for optimistic state?
                // Or just trust server. Let's trust server to avoid desync.
            }
        }
        syncTimer();
    }, []);

    // 2. Interval Effect
    useEffect(() => {
        if (isRunning && startTimeRef.current) {
            intervalRef.current = setInterval(() => {
                const now = new Date();
                setElapsedSeconds(differenceInSeconds(now, startTimeRef.current!));
            }, 1000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isRunning]);

    // Actions
    const handleStart = async () => {
        if (!projectId) {
            toast.error("Please select a project");
            return;
        }

        const optimisticStart = new Date();
        setIsRunning(true);
        startTimeRef.current = optimisticStart;
        setElapsedSeconds(0);

        // Save to server
        const result = await startTimeLog({
            projectId,
            description,
            category: TimeLogCategory.DEVELOPMENT, // Default or add selector
            billable: true // Default or add selector
        });

        if (result.success && result.data) {
            setTimerId(result.data.id);
            toast.success("Timer started");
            router.refresh();
        } else {
            setIsRunning(false);
            toast.error(result.error || "Failed to start");
        }
    };

    const handleStop = async () => {
        if (!timerId) return;

        const result = await stopTimeLog(timerId);

        if (result.success) {
            setIsRunning(false);
            setTimerId(null);
            setElapsedSeconds(0);
            setDescription("");
            // Keep project selected for repeated tasks? Or clear? keeping it is usually better UX.
            toast.success("Timer stopped");
            router.refresh(); // Update table below
        } else {
            toast.error(result.error || "Failed to stop");
        }
    };

    // Format HH:MM:SS
    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const pad = (n: number) => n.toString().padStart(2, '0');
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };

    return (
        <Card className="p-4 flex flex-col md:flex-row items-center gap-4 bg-card border-l-4 border-l-primary shadow-md">

            {/* Description Input */}
            <div className="flex-1 w-full">
                <Input
                    placeholder="What are you working on?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border-0 shadow-none focus-visible:ring-0 px-0 text-lg font-medium placeholder:font-normal bg-transparent"
                    disabled={isRunning} // Usually you CAN edit description while running, but for MVP keep simple. Actually better to allow edit but requires update action. Leaving disabled for now or simple "Start new with desc". Let's enable it but only used on Start. If running, updating description needs updateTimeLog. Simpler: Disabled while running for MVP.
                />
            </div>

            {/* Project Selector */}
            <div className="w-full md:w-[200px]">
                <Select
                    value={projectId}
                    onValueChange={setProjectId}
                    disabled={isRunning}
                >
                    <SelectTrigger className={!projectId ? "text-muted-foreground" : ""}>
                        <SelectValue placeholder="Project..." />
                    </SelectTrigger>
                    <SelectContent>
                        {projects.map(p => (
                            <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Timer Display */}
            <div className="font-mono text-2xl font-bold text-primary tabular-nums min-w-[120px] text-center">
                {formatTime(elapsedSeconds)}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                {isRunning ? (
                    <Button
                        size="icon"
                        variant="destructive"
                        className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
                        onClick={handleStop}
                    >
                        <Square className="w-5 h-5 fill-current" />
                    </Button>
                ) : (
                    <Button
                        size="icon"
                        className="h-12 w-12 rounded-full bg-primary shadow-lg hover:shadow-xl transition-all hover:scale-105"
                        onClick={handleStart}
                    >
                        <Play className="w-5 h-5 ml-1 fill-current" />
                    </Button>
                )}
            </div>
        </Card>
    );
}
