import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  PlayCircle, 
  Calendar, 
  Clock, 
  Users, 
  Plus,
  Video,
  Mic,
  Share,
  Settings,
  MoreVertical
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { courses } from "@/data/mockData";

export default function TutorLiveClasses() {
  const { currentUser } = useAuth();

  // Mock live classes data
  const liveClasses = [
    {
      id: 1,
      title: "Advanced React Patterns - Hooks Deep Dive",
      courseTitle: "Complete React Development",
      scheduledTime: "2024-01-15T14:00:00",
      duration: 90,
      participants: 23,
      maxParticipants: 50,
      status: "upcoming",
      description: "Deep dive into React hooks, custom hooks, and advanced patterns."
    },
    {
      id: 2,
      title: "JavaScript Fundamentals - Q&A Session",
      courseTitle: "JavaScript Mastery",
      scheduledTime: "2024-01-14T10:00:00",
      duration: 60,
      participants: 45,
      maxParticipants: 50,
      status: "live",
      description: "Open Q&A session for JavaScript fundamentals."
    },
    {
      id: 3,
      title: "Web Design Principles Workshop",
      courseTitle: "Modern Web Design",
      scheduledTime: "2024-01-12T16:00:00",
      duration: 120,
      participants: 18,
      maxParticipants: 30,
      status: "completed",
      description: "Interactive workshop on modern web design principles."
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'destructive';
      case 'upcoming': return 'default';
      case 'completed': return 'secondary';
      default: return 'outline';
    }
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole={currentUser?.role} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold">Live Classes</h1>
                <p className="text-muted-foreground">
                  Manage your live teaching sessions
                </p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Schedule New Class
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Classes</p>
                    <p className="text-2xl font-bold">{liveClasses.length}</p>
                  </div>
                  <PlayCircle className="h-8 w-8 text-primary" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-muted-foreground text-sm">Live Now</p>
                    <p className="text-2xl font-bold">
                      {liveClasses.filter(c => c.status === 'live').length}
                    </p>
                  </div>
                  <Video className="h-8 w-8 text-red-500" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-muted-foreground text-sm">Upcoming</p>
                    <p className="text-2xl font-bold">
                      {liveClasses.filter(c => c.status === 'upcoming').length}
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-500" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Participants</p>
                    <p className="text-2xl font-bold">
                      {liveClasses.reduce((sum, c) => sum + c.participants, 0)}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-green-500" />
                </CardContent>
              </Card>
            </div>

            {/* Live Classes List */}
            <div className="space-y-6">
              {liveClasses.map((liveClass) => {
                const { date, time } = formatDateTime(liveClass.scheduledTime);
                
                return (
                  <Card key={liveClass.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold">{liveClass.title}</h3>
                            <Badge variant={getStatusColor(liveClass.status)}>
                              {liveClass.status}
                            </Badge>
                            {liveClass.status === 'live' && (
                              <Badge variant="destructive" className="animate-pulse">
                                LIVE
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-muted-foreground mb-3">
                            Course: {liveClass.courseTitle}
                          </p>
                          
                          <p className="text-sm text-muted-foreground mb-4">
                            {liveClass.description}
                          </p>
                          
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{time} ({liveClass.duration} min)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>{liveClass.participants}/{liveClass.maxParticipants} participants</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 ml-4">
                          {liveClass.status === 'live' && (
                            <>
                              <Button>
                                <Video className="h-4 w-4 mr-2" />
                                Join Class
                              </Button>
                              <Button variant="outline" size="icon">
                                <Mic className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon">
                                <Share className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          
                          {liveClass.status === 'upcoming' && (
                            <>
                              <Button>
                                <PlayCircle className="h-4 w-4 mr-2" />
                                Start Class
                              </Button>
                              <Button variant="outline">
                                <Settings className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                            </>
                          )}
                          
                          {liveClass.status === 'completed' && (
                            <Button variant="outline">
                              View Recording
                            </Button>
                          )}
                          
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <PlayCircle className="h-6 w-6" />
                    <span>Start Instant Class</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Calendar className="h-6 w-6" />
                    <span>Schedule Class</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Settings className="h-6 w-6" />
                    <span>Class Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}