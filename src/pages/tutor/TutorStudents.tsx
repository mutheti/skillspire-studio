import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Search, 
  MessageSquare, 
  Mail, 
  Award,
  BookOpen,
  Clock,
  Filter
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { users, courses } from "@/data/mockData";
import { useState } from "react";

export default function TutorStudents() {
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  // Get courses taught by current tutor
  const tutorCourses = courses.filter(course => course.instructorId === currentUser?.id);
  const tutorCourseIds = tutorCourses.map(course => course.id);

  // Get students enrolled in tutor's courses
  const tutorStudents = users.filter(user => 
    user.role === 'student' && 
    user.enrolledCourses?.some(courseId => tutorCourseIds.includes(courseId))
  );

  const filteredStudents = tutorStudents.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStudentProgress = (studentId: string) => {
    const studentCourses = courses.filter(course => 
      tutorCourseIds.includes(course.id) && 
      users.find(u => u.id === studentId)?.enrolledCourses?.includes(course.id)
    );
    
    if (studentCourses.length === 0) return 0;
    
    const totalModules = studentCourses.reduce((sum, course) => sum + course.modules.length, 0);
    const completedModules = studentCourses.reduce((sum, course) => 
      sum + course.modules.filter(m => m.completed).length, 0
    );
    
    return totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
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
                <h1 className="text-3xl font-bold">My Students</h1>
                <p className="text-muted-foreground">
                  Manage and track your students' progress
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Email All
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Students</p>
                    <p className="text-2xl font-bold">{tutorStudents.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-primary" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-muted-foreground text-sm">Active Students</p>
                    <p className="text-2xl font-bold">{Math.floor(tutorStudents.length * 0.8)}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-green-500" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-muted-foreground text-sm">Avg Progress</p>
                    <p className="text-2xl font-bold">
                      {tutorStudents.length > 0 
                        ? Math.round(tutorStudents.reduce((sum, student) => sum + getStudentProgress(student.id), 0) / tutorStudents.length)
                        : 0}%
                    </p>
                  </div>
                  <Award className="h-8 w-8 text-amber-500" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-muted-foreground text-sm">This Week</p>
                    <p className="text-2xl font-bold">{Math.floor(tutorStudents.length * 0.6)}</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-500" />
                </CardContent>
              </Card>
            </div>

            {/* Search */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Students List */}
            <div className="grid gap-6">
              {filteredStudents.map((student) => {
                const progress = getStudentProgress(student.id);
                const studentCourses = courses.filter(course => 
                  tutorCourseIds.includes(course.id) && 
                  student.enrolledCourses?.includes(course.id)
                );

                return (
                  <Card key={student.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={student.avatar} />
                            <AvatarFallback>
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold">{student.name}</h3>
                            <p className="text-muted-foreground">{student.email}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-sm text-muted-foreground">
                                {studentCourses.length} courses enrolled
                              </span>
                              <Badge variant="outline">
                                {progress}% complete
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                          <Button size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>

                      <div className="mt-6">
                        <div className="flex justify-between text-sm text-muted-foreground mb-2">
                          <span>Overall Progress</span>
                          <span>{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>

                      {studentCourses.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">Enrolled Courses:</h4>
                          <div className="flex flex-wrap gap-2">
                            {studentCourses.map((course) => (
                              <Badge key={course.id} variant="secondary">
                                {course.title}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}

              {filteredStudents.length === 0 && (
                <Card className="text-center py-12">
                  <CardContent>
                    <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No students found</h3>
                    <p className="text-muted-foreground">
                      {searchQuery ? 'Try adjusting your search terms.' : 'Students will appear here once they enroll in your courses.'}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}