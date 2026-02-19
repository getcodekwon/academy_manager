"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, TooltipProps } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
    {
        name: "Week 1",
        score: 82,
    },
    {
        name: "Week 2",
        score: 85,
    },
    {
        name: "Week 3",
        score: 78,
    },
    {
        name: "Week 4",
        score: 90,
    },
    {
        name: "Week 5",
        score: 88,
    },
    {
        name: "Week 6",
        score: 95,
    },
]

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg border bg-background p-2 shadow-sm">
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Week
                        </span>
                        <span className="font-bold text-muted-foreground">
                            {label}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Avg. Score
                        </span>
                        <span className="font-bold">
                            {payload[0].value}
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    return null
}

export function StudentPerformanceChart() {
    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Average Performance Trend</CardTitle>
                <CardDescription>
                    Weekly average scores for all active classes over the last 6 weeks.
                </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={data}>
                        <XAxis
                            dataKey="name"
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
                            tickFormatter={(value) => `${value}`}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                        <Bar
                            dataKey="score"
                            fill="currentColor"
                            radius={[4, 4, 0, 0]}
                            className="fill-indigo-600"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
