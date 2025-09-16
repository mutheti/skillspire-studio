import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Users, Clock, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const liveClasses = [
  {
    id: '1',
    title: 'JavaScript Advanced Concepts',
    instructor: 'Sarah Wilson',
    instructorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b662?w=150&h=150&fit=crop&crop=face',
    course: 'Complete Web Development Bootcamp',
    time: '2:00 PM - 3:30 PM',
    duration: '90 min',
    students: 24,
    isLive: true,
    description: 'Deep dive into closures, async/await, and ES6+ features'
  },
  {
    id: '2',
    title: 'Machine Learning Basics',
    instructor: 'Dr. Michael Chen',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    course: 'Data Science with Python',
    time: '4:00 PM - 5:30 PM',
    duration: '90 min',
    students: 18,
    isLive: false,
    description: 'Introduction to supervised and unsupervised learning'
  }
];

const upcomingClasses = [
  {
    id: '3',
    title: 'React State Management',
    instructor: 'Sarah Wilson',
    course: 'Complete Web Development Bootcamp',
    date: 'Tomorrow',
    time: '10:00 AM - 11:30 AM',
    students: 20
  },
  {
    id: '4',
    title: 'Data Visualization with Matplotlib',
    instructor: 'Dr. Michael Chen',
    course: 'Data Science with Python',
    date: 'Wednesday',
    time: '2:00 PM - 3:30 PM',
    students: 15
  }
];

const recordings = [
  {
    id: '1',
    title: 'HTML & CSS Fundamentals',
    instructor: 'Sarah Wilson',
    course: 'Complete Web Development Bootcamp',
    duration: '85 min',
    views: 156,
    date: '2 days ago'
  },
  {
    id: '2',
    title: 'Python Basics for Data Science',
    instructor: 'Dr. Michael Chen',
    course: 'Data Science with Python',
    duration: '92 min',
    views: 89,
    date: '1 week ago'
  }
];

export default function LiveClasses() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('live');

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole={currentUser?.role} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Live Classes</h1>
              <p className="text-muted-foreground">
                Join live sessions and access recorded classes
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="live">Live Now</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="recordings">Recordings</TabsTrigger>
              </TabsList>

              <TabsContent value="live" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {liveClasses.map((classItem) => (
                    <Card key={classItem.id} className="relative">
                      {classItem.isLive && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-red-500 text-white animate-pulse">
                            LIVE
                          </Badge>
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="text-xl">{classItem.title}</CardTitle>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={classItem.instructorAvatar} />
                            <AvatarFallback>{classItem.instructor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{classItem.instructor}</p>
                            <p className="text-xs text-muted-foreground">{classItem.course}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          {classItem.description}
                        </p>
                        
                        <div className="space-y-2 mb-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{classItem.time} ({classItem.duration})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{classItem.students} students joined</span>
                          </div>
                        </div>

                        <Button 
                          className="w-full" 
                          disabled={!classItem.isLive}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          {classItem.isLive ? 'Join Live Class' : 'Starting Soon'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="upcoming" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingClasses.map((classItem) => (
                    <Card key={classItem.id}>
                      <CardHeader>
                        <CardTitle className="text-xl">{classItem.title}</CardTitle>
                        <p className="text-muted-foreground">{classItem.course}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 mb-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{classItem.date} • {classItem.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{classItem.students} students enrolled</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-4">
                          Instructor: {classItem.instructor}
                        </p>

                        <Button className="w-full" variant="outline">
                          Set Reminder
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recordings" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recordings.map((recording) => (
                    <Card key={recording.id}>
                      <CardHeader>
                        <CardTitle className="text-xl">{recording.title}</CardTitle>
                        <p className="text-muted-foreground">{recording.course}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 mb-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>Duration: {recording.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Play className="h-4 w-4 text-muted-foreground" />
                            <span>{recording.views} views • {recording.date}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-4">
                          Instructor: {recording.instructor}
                        </p>

                        <Button className="w-full">
                          <Play className="h-4 w-4 mr-2" />
                          Watch Recording
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}