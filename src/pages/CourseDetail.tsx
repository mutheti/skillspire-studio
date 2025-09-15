import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  CheckCircle, 
  Circle,
  Download,
  MessageCircle
} from "lucide-react";
import { courses, assignments, users } from "@/data/mockData";

export default function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState(0);
  
  const course = courses.find(c => c.id === courseId);
  const instructor = users.find(u => u.id === course?.instructorId);
  const courseAssignments = assignments.filter(a => a.courseId === courseId);
  
  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Course not found</h2>
          <Button onClick={() => navigate('/courses')}>Back to Courses</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="space-y-4">
                    <Badge variant="secondary">{course.category}</Badge>
                    <h1 className="text-4xl font-bold text-foreground">{course.title}</h1>
                    <p className="text-lg text-muted-foreground">{course.description}</p>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {course.students} students
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {course.rating}
                    </div>
                    <Badge variant="outline">{course.level}</Badge>
                  </div>

                  {course.isEnrolled && course.progress && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Course Progress</span>
                        <span className="text-sm text-muted-foreground">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}

                  <div className="flex gap-4">
                    {course.isEnrolled ? (
                      <Button className="skillora-button-primary">
                        <Play className="h-4 w-4 mr-2" />
                        Continue Learning
                      </Button>
                    ) : (
                      <Button className="skillora-button-primary">
                        Enroll Now - ${course.price}
                      </Button>
                    )}
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download Syllabus
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content Tabs */}
          <div className="max-w-7xl mx-auto p-8">
            <Tabs defaultValue="modules" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="modules">Modules</TabsTrigger>
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
              </TabsList>

              <TabsContent value="modules" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    {course.modules.map((module, index) => (
                      <Card 
                        key={module.id} 
                        className={`cursor-pointer transition-all duration-200 ${
                          activeModule === index ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setActiveModule(index)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            {module.completed ? (
                              <CheckCircle className="h-5 w-5 text-success" />
                            ) : (
                              <Circle className="h-5 w-5 text-muted-foreground" />
                            )}
                            <div className="flex-1">
                              <h3 className="font-medium">{module.title}</h3>
                              <p className="text-sm text-muted-foreground">{module.duration}</p>
                            </div>
                            <Badge variant={module.type === 'assignment' ? 'destructive' : 'secondary'}>
                              {module.type}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="lg:col-span-1">
                    <Card className="skillora-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Play className="h-5 w-5" />
                          {course.modules[activeModule]?.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                          <Play className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">
                            Duration: {course.modules[activeModule]?.duration}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Type: {course.modules[activeModule]?.type}
                          </p>
                        </div>
                        {course.isEnrolled && (
                          <Button className="w-full">
                            <Play className="h-4 w-4 mr-2" />
                            Start Module
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="assignments" className="space-y-4">
                {courseAssignments.map((assignment) => (
                  <Card key={assignment.id} className="skillora-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{assignment.title}</CardTitle>
                        <Badge variant={
                          assignment.status === 'graded' ? 'default' : 
                          assignment.status === 'submitted' ? 'secondary' : 'outline'
                        }>
                          {assignment.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{assignment.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                        <span>Points: {assignment.maxPoints}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        View Assignment
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="instructor" className="space-y-6">
                {instructor && (
                  <Card className="skillora-card">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-6">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={instructor.avatar} />
                          <AvatarFallback>{instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-xl font-semibold">{instructor.name}</h3>
                            <p className="text-muted-foreground">Course Instructor</p>
                          </div>
                          <p className="text-muted-foreground max-w-2xl">
                            Experienced educator with over 10 years in the industry. Passionate about sharing knowledge 
                            and helping students achieve their learning goals through practical, hands-on instruction.
                          </p>
                          <div className="flex gap-3">
                            <Button variant="outline" size="sm">
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Message Instructor
                            </Button>
                            <Button variant="outline" size="sm">
                              View Profile
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="discussions" className="space-y-4">
                <Card className="skillora-card">
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Course Discussions</h3>
                      <p className="text-muted-foreground">
                        Connect with fellow students and instructors in course discussions.
                      </p>
                      <Button className="mt-4">Start a Discussion</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}