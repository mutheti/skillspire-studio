import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

// Generate calendar days for current month
const generateCalendarDays = () => {
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const startingDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  
  const days = [];
  
  // Add empty cells for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  
  // Add days of month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }
  
  return days;
};

const scheduledDays = [12, 13, 14, 15, 16, 17]; // Days with scheduled classes
const today = currentDate.getDate();

export function ScheduleCalendar() {
  const days = generateCalendarDays();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <Card className="skillora-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">My Schedule</CardTitle>
          <p className="text-sm text-muted-foreground">Track the courses time schedule</p>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="text-sm font-medium mb-2">
            {monthNames[currentMonth]} {currentYear}
          </div>
          <div className="grid grid-cols-7 gap-1 text-xs text-muted-foreground mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center p-2 font-medium">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <div
                key={index}
                className={cn(
                  "aspect-square flex items-center justify-center text-sm rounded-lg transition-colors",
                  day === null && "invisible",
                  day === today && "bg-primary text-primary-foreground font-medium",
                  day && day !== today && scheduledDays.includes(day) && "bg-muted text-foreground",
                  day && day !== today && !scheduledDays.includes(day) && "text-muted-foreground hover:bg-muted/50"
                )}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming tasks */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-sm">Onboarding Task</h4>
            <Badge variant="outline" className="text-xs">3/6</Badge>
          </div>
          
          <div className="space-y-3">
            {[
              { title: "English Spoken Practice", time: "06:00 AM - 09:30 AM", completed: true },
              { title: "Design Practice", time: "10:00 AM - 12:30 PM", completed: true },
              { title: "Math", time: "02:00 PM - 03:30 PM", completed: true },
              { title: "Development Practice", time: "05:00 PM - 07:30 PM", completed: false },
              { title: "Physical Education", time: "08:00 PM - 09:30 PM", completed: false },
              { title: "Java script", time: "10:00 PM - 11:30 PM", completed: false },
            ].map((task, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={cn(
                  "w-2 h-2 rounded-full flex-shrink-0",
                  task.completed ? "bg-primary" : "bg-muted"
                )} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{task.title}</div>
                  <div className="text-xs text-muted-foreground">{task.time}</div>
                </div>
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center",
                  task.completed ? "bg-primary" : "bg-muted"
                )}>
                  {task.completed && (
                    <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}