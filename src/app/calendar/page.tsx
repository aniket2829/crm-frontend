"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 0-11

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const leadingEmptyDays = Array.from({ length: firstDayOfMonth });

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const handleToday = () => {
        setCurrentDate(new Date());
    }

    return (
        <div className="flex flex-col h-full bg-background text-foreground">
            <header className="flex items-center justify-between px-6 py-4 border-b">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={handlePrevMonth}>
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <h2 className="text-xl font-semibold">{currentDate.toLocaleString('default', { month: 'long' })} {year}</h2>
                    <Button variant="outline" size="icon" onClick={handleNextMonth}>
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
                <Button onClick={handleToday}>Today</Button>
            </header>
            <div className="grid grid-cols-7">
                {daysOfWeek.map(day => (
                    <div key={day} className="text-center p-2 text-sm font-medium text-muted-foreground border-r border-b bg-muted/40">
                        {day}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 grid-rows-6 flex-1">
                 {leadingEmptyDays.map((_, index) => (
                    <div key={`empty-${index}`} className="border-r border-b"></div>
                ))}
                {days.map(day => (
                    <div key={day} className="p-2 border-r border-b flex flex-col min-h-[6rem] sm:min-h-[7rem] md:min-h-[8rem] lg:min-h-[9rem] xl:min-h-[10rem]">
                        <span className="self-start">{day}</span>
                        {/* Events for the day can be added here */}
                    </div>
                ))}
            </div>
        </div>
    );
}