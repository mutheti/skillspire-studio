import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";

const data = [
  { name: "Completed", value: 65, color: "hsl(var(--primary))" },
  { name: "Pending", value: 25, color: "hsl(var(--muted))" },
  { name: "Overdue", value: 10, color: "hsl(var(--secondary-dark))" },
];

export function CompletionDonut() {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const completedPercentage = Math.round((data[0].value / total) * 100);

  return (
    <Card className="skillora-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">Completion</CardTitle>
          <p className="text-sm text-muted-foreground">Overall assignment</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Total</div>
          <div className="text-lg font-semibold">Summary</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold">{completedPercentage}%</div>
              <div className="text-xs text-muted-foreground">Complete</div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Download Course</span>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              8
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}