"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface ProductivityReportProps {
    trends: {
        date: string;
        hours: number;
    }[];
    topProjects: {
        name: string;
        hours: number;
    }[];
    clientBreakdown?: {
        name: string;
        hours: number;
    }[];
    categoryBreakdown?: {
        name: string;
        value: number; // In action it was 'value', let's stick to 'hours' or 'value'. ActivityDashboard used value.
    }[];
}

export function ProductivityReport({ trends, topProjects, clientBreakdown, categoryBreakdown }: ProductivityReportProps) {

    const handleExportPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Productivity Report", 14, 22);

        doc.setFontSize(11);
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 30);

        // Projects Table
        const projectData = topProjects.map(p => [p.name, p.hours.toFixed(2)]);
        autoTable(doc, {
            head: [['Project', 'Hours']],
            body: projectData,
            startY: 40,
        });

        // Client Table
        if (clientBreakdown && clientBreakdown.length > 0) {
            const clientData = clientBreakdown.map(c => [c.name, c.hours.toFixed(2)]);
            autoTable(doc, {
                head: [['Client', 'Hours']],
                body: clientData,
                // @ts-ignore
                startY: doc.lastAutoTable.finalY + 10,
            });
        }

        // Category Table
        if (categoryBreakdown && categoryBreakdown.length > 0) {
            const categoryData = categoryBreakdown.map(c => [c.name, c.value.toFixed(2)]);
            autoTable(doc, {
                head: [['Activity Type', 'Hours']],
                body: categoryData,
                // @ts-ignore
                startY: doc.lastAutoTable.finalY + 10,
            });
        }

        doc.save("productivity-report.pdf");
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Button variant="outline" onClick={handleExportPDF}>
                    <Download className="mr-2 h-4 w-4" /> Export PDF
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

                {/* Bar Chart - Daily Trends */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Daily Productivity</CardTitle>
                        <CardDescription>Hours worked per day (Last 7 days)</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px] w-full">
                            {trends.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={trends}>
                                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                        <XAxis
                                            dataKey="date"
                                            stroke="#888888"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            stroke="#888888"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value) => `${value}h`}
                                        />
                                        <Tooltip
                                            cursor={{ fill: 'transparent' }}
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        />
                                        <Bar dataKey="hours" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex items-center justify-center h-full text-muted-foreground">
                                    No data available
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Top Projects List */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Top Projects</CardTitle>
                        <CardDescription>
                            Where you spent the most time this month
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topProjects.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No data available.</p>
                            ) : (
                                topProjects.map((project, i) => (
                                    <div key={i} className="flex items-center">
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium leading-none">{project.name}</p>
                                            {/* Progress bar visual could go here */}
                                            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden mt-1">
                                                <div
                                                    className="bg-primary h-full"
                                                    style={{ width: `${(project.hours / (topProjects[0].hours || 1)) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                        <div className="ml-4 font-mono font-medium text-sm">
                                            {project.hours.toFixed(1)}h
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Additional Breakdowns Grid */}
            {(clientBreakdown && clientBreakdown.length > 0) && (
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Hours by Client</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {clientBreakdown.map((client, i) => (
                                    <div key={i} className="flex justify-between items-center text-sm border-b pb-2 last:border-0">
                                        <span>{client.name}</span>
                                        <span className="font-mono">{client.hours.toFixed(1)}h</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Hours By Activity Type</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {categoryBreakdown?.map((cat, i) => (
                                    <div key={i} className="flex justify-between items-center text-sm border-b pb-2 last:border-0">
                                        <span className="capitalize">{cat.name.toLowerCase()}</span>
                                        <span className="font-mono">{cat.value.toFixed(1)}h</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}

import { Skeleton } from "@/components/ui/skeleton";

export function ProductivityReportSkeleton() {
    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Skeleton className="h-10 w-[120px]" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <Skeleton className="h-6 w-[150px] mb-2" />
                        <Skeleton className="h-4 w-[200px]" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[300px] w-full" />
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <Skeleton className="h-6 w-[150px] mb-2" />
                        <Skeleton className="h-4 w-[200px]" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center">
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-[70%]" />
                                        <Skeleton className="h-2 w-full" />
                                    </div>
                                    <Skeleton className="h-4 w-[40px] ml-4" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {[1, 2].map((i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className="h-6 w-[150px]" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[1, 2, 3].map((j) => (
                                    <div key={j} className="flex justify-between">
                                        <Skeleton className="h-4 w-[100px]" />
                                        <Skeleton className="h-4 w-[40px]" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
