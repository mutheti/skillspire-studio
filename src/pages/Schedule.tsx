import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const upcomingClasses = [
  {
    id: '1',
    title: 'JavaScript Fundamentals - Live Session',
    course: 'Complete Web Development Bootcamp',
    time: '2:00 PM - 3:30 PM',
    date: 'Today',
    instructor: 'Sarah Wilson',
    type: 'Live Class',
    students: 24,
    location: 'Virtual Room A'
  },
  {
    id: '2',
    title: 'Data Visualization Workshop',
    course: 'Data Science with Python',
    time: '10:00 AM - 11:30 AM',
    date: 'Tomorrow',
    instructor: 'Dr. Michael Chen',
    type: 'Workshop',
    students: 18,
    location: 'Virtual Room B'
  }
];

const todaySchedule = [
  { time: '9:00 AM', event: 'Study Time - React Hooks', type: 'study' },
  { time: '11:00 AM', event: 'Assignment Due: Portfolio Project', type: 'deadline' },
  { time: '2:00 PM', event: 'JavaScript Fundamentals - Live Session', type: 'class' },
  { time: '4:00 PM', event: 'Study Group - Web Development', type: 'group' }
];

export default function Schedule() {
  const { currentUser } = useAuth();

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole={currentUser?.role} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Schedule</h1>
              <p className="text-muted-foreground">
                Manage your classes, assignments, and study sessions
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Today's Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Today's Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {todaySchedule.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg border">
                      <div className="text-sm font-mono w-20 text-muted-foreground">
                        {item.time}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.event}</p>
                        <Badge variant={
                          item.type === 'class' ? 'default' :
                          item.type === 'deadline' ? 'destructive' :
                          item.type === 'group' ? 'secondary' : 'outline'
                        } className="text-xs mt-1">
                          {item.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Classes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Upcoming Classes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingClasses.map((classItem) => (
                    <div key={classItem.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{classItem.title}</h3>
                        <Badge>{classItem.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{classItem.course}</p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{classItem.date} • {classItem.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{classItem.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{classItem.students} students enrolled</span>
                        </div>
                      </div>

                      <Button className="w-full mt-3" size="sm">
                        Join Class
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Weekly Calendar Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 text-center">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <div key={day} className="space-y-2">
                      <div className="font-medium text-sm">{day}</div>
                      <div className="h-20 bg-muted/30 rounded p-2 text-xs">
                        {index === 0 && <div className="bg-primary/20 p-1 rounded mb-1">JS Class</div>}
                        {index === 2 && <div className="bg-info/20 p-1 rounded mb-1">Workshop</div>}
                        {index === 4 && <div className="bg-destructive/20 p-1 rounded mb-1">Deadline</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}