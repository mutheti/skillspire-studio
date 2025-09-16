import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Users, Clock, BookOpen, Plus, MoreVertical } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { courses } from "@/data/mockData";

export default function TutorCourses() {
  const { currentUser } = useAuth();

  // Filter courses taught by current tutor
  const tutorCourses = courses.filter(course => course.instructorId === currentUser?.id);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole={currentUser?.role} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold">My Courses</h1>
                <p className="text-muted-foreground">
                  Manage and track your teaching courses
                </p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New Course
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Courses</p>
                    <p className="text-2xl font-bold">{tutorCourses.length}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-primary" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Students</p>
                    <p className="text-2xl font-bold">
                      {tutorCourses.reduce((sum, course) => sum + course.students, 0)}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-green-500" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-muted-foreground text-sm">Avg Rating</p>
                    <p className="text-2xl font-bold">
                      {(tutorCourses.reduce((sum, course) => sum + course.rating, 0) / tutorCourses.length).toFixed(1)}
                    </p>
                  </div>
                  <Badge className="h-8 w-8 p-0 rounded-full">⭐</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-muted-foreground text-sm">Revenue</p>
                    <p className="text-2xl font-bold">
                      ${tutorCourses.reduce((sum, course) => sum + (course.price * course.students), 0).toLocaleString()}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-amber-500" />
                </CardContent>
              </Card>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Button variant="ghost" size="icon" className="bg-black/50 text-white hover:bg-black/70">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                      <Badge>{course.level}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Students</span>
                        <span className="font-medium">{course.students}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Rating</span>
                        <span className="font-medium">{course.rating} ⭐</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Revenue</span>
                        <span className="font-medium">${(course.price * course.students).toLocaleString()}</span>
                      </div>
                      
                      {/* Course Progress */}
                      <div>
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Modules Completed</span>
                          <span>{course.modules.filter(m => m.completed).length}/{course.modules.length}</span>
                        </div>
                        <Progress 
                          value={(course.modules.filter(m => m.completed).length / course.modules.length) * 100} 
                          className="h-2"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1" size="sm">
                        Manage Course
                      </Button>
                      <Button variant="outline" size="sm">
                        View Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {tutorCourses.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No courses yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start creating your first course to share knowledge with students.
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Course
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}