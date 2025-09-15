import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const weeklyData = [
  { day: "Sun", progress: 2, lessons: 1 },
  { day: "Mon", progress: 5, lessons: 3 },
  { day: "Tue", progress: 7, lessons: 4 },
  { day: "Wed", progress: 3, lessons: 2 },
  { day: "Thu", progress: 6, lessons: 3 },
  { day: "Fri", progress: 4, lessons: 2 },
  { day: "Sat", progress: 1, lessons: 1 },
];

export function ProgressChart() {
  return (
    <Card className="skillora-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">Analytics Statistic</CardTitle>
          <p className="text-sm text-muted-foreground">Time you spend you daily for learning</p>
        </div>
        <Badge variant="outline" className="text-xs">
          Last Week
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">25%</span>
            <span className="text-sm text-success font-medium">+5%</span>
          </div>
          <p className="text-sm text-muted-foreground">
            This week learning time tracking is higher than last week's
          </p>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                className="text-xs text-muted-foreground"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                className="text-xs text-muted-foreground"
              />
              <Bar 
                dataKey="progress" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
                className="fill-primary"
              />
              <Bar 
                dataKey="lessons" 
                fill="hsl(var(--secondary-dark))" 
                radius={[4, 4, 0, 0]}
                className="fill-secondary-dark"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-muted-foreground">Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-secondary-dark rounded-full"></div>
            <span className="text-sm text-muted-foreground">Lessons</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}