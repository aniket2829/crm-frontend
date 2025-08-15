"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback, useMemo } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const { year, month, firstDayOfMonth, daysInMonth, monthName } = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        return {
            year,
            month,
            firstDayOfMonth: new Date(year, month, 1).getDay(),
            daysInMonth: new Date(year, month + 1, 0).getDate(),
            monthName: currentDate.toLocaleString('default', { month: 'long' })
        };
    }, [currentDate]);

    const days = useMemo(() => 
        Array.from({ length: daysInMonth }, (_, i) => i + 1),
        [daysInMonth]
    );

    const leadingEmptyDays = useMemo(
        () => Array.from({ length: firstDayOfMonth }),
        [firstDayOfMonth]
    );

    const handlePrevMonth = useCallback(() => {
        setCurrentDate(prev => new Date(year, month - 1, 1));
    }, [year, month]);

    const handleNextMonth = useCallback(() => {
        setCurrentDate(prev => new Date(year, month + 1, 1));
    }, [year, month]);

    const handleToday = useCallback(() => {
        const today = new Date();
        setCurrentDate(today);
        setSelectedDate(today);
    }, []);

    const isCurrentDay = useCallback((day: number) => {
        const today = new Date();
        return day === today.getDate() && 
               month === today.getMonth() && 
               year === today.getFullYear();
    }, [month, year]);

    const isSelectedDay = useCallback((day: number) => {
        return day === selectedDate.getDate() && 
               month === selectedDate.getMonth() && 
               year === selectedDate.getFullYear();
    }, [selectedDate, month, year]);

    const handleDateClick = useCallback((day: number) => {
        setSelectedDate(new Date(year, month, day));
    }, [year, month]);

    return (
        <div className="flex flex-col h-full bg-background text-foreground p-2 sm:p-4 md:p-6">
            <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 p-4 rounded-lg bg-card shadow-sm">
                <div className="flex items-center gap-2">
                    <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={handlePrevMonth}
                        className="hover:bg-primary/10 transition-colors duration-200"
                        aria-label="Previous month"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <h2 className="text-lg sm:text-xl font-semibold whitespace-nowrap">
                        {monthName} {year}
                    </h2>
                    <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={handleNextMonth}
                        className="hover:bg-primary/10 transition-colors duration-200"
                        aria-label="Next month"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
                <Button 
                    onClick={handleToday}
                    variant="secondary"
                    className="w-full sm:w-auto transition-colors duration-200"
                >
                    Today
                </Button>
            </header>
            
            <div className="flex flex-col flex-1">
                <div className="grid grid-cols-7 divide-x divide-border border border-border rounded-t-lg bg-muted/50">
                    {daysOfWeek.map(day => (
                        <div key={day} className="p-2 text-sm font-medium text-center text-muted-foreground">
                            <span className="hidden sm:inline">{day}</span>
                            <span className="sm:hidden">{day[0]}</span>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-border border-x border-b border-border rounded-b-lg flex-1">
                    {leadingEmptyDays.map((_, index) => (
                        <div key={`empty-${index}`} className="aspect-square bg-card" />
                    ))}
                    {days.map(day => {
                        const today = isCurrentDay(day);
                        const selected = isSelectedDay(day);
                        
                        return (
                            <div 
                                key={day} 
                                onClick={() => handleDateClick(day)}
                                className={`
                                    relative p-1 sm:p-2 
                                    bg-card hover:bg-muted/30 transition-colors duration-200 cursor-pointer
                                    flex flex-col items-center overflow-hidden
                                    ${today ? 'ring-1 ring-primary z-10' : ''}
                                    ${selected ? 'bg-primary/5' : ''}
                                `}
                                aria-selected={selected}
                                role="gridcell"
                            >
                                <span className={`
                                    w-6 h-6 flex items-center justify-center rounded-full text-sm
                                    transition-colors duration-200
                                    ${today ? 'bg-primary text-primary-foreground' : ''}
                                    ${selected && !today ? 'text-primary font-medium' : ''}
                                `}>
                                    {day}
                                </span>
                                <div className="w-full mt-1 space-y-1 overflow-y-auto">
                                    {/* Events will go here */}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}