"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { type ClassItem } from "./actions";

export function ClassCard({ classItem }: { classItem: ClassItem }) {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
                <CardTitle>{classItem.name}</CardTitle>
                <CardDescription>{classItem.description || "No description"}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                    <Calendar className="h-4 w-4" />
                    <span>{classItem.schedule || "TBD"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Users className="h-4 w-4" />
                    <span>{classItem.student_count} Students</span>
                </div>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full" variant="secondary">
                    <Link href={`/classes/${classItem.id}`}>
                        Manage Class <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
