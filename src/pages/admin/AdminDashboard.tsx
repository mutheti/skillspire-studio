import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  DollarSign,
  Search,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  UserPlus,
  Settings
} from "lucide-react";
import { users, courses, assignments } from "@/data/mockData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const totalStudents = users.filter(u => u.role === 'student').length;
  const totalTutors = users.filter(u => u.role === 'tutor').length;
  const totalCourses = courses.length;
  const totalRevenue = courses.reduce((sum, course) => sum + (course.price * course.students), 0);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'tutor': return 'default';
      case 'student': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage users, courses, and platform settings</p>
              </div>
              
              <div className="flex items-center gap-4">
                <Button className="skillora-button-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Students"
              value={totalStudents.toString()}
              icon={<Users className="h-5 w-5" />}
              trend={{ value: 12, isPositive: true }}
              description="vs last month"
            />
            <StatsCard
              title="Active Tutors"
              value={totalTutors.toString()}
              icon={<GraduationCap className="h-5 w-5" />}
              trend={{ value: 3, isPositive: true }}
              description="vs last month"
            />
            <StatsCard
              title="Total Courses"
              value={totalCourses.toString()}
              icon={<BookOpen className="h-5 w-5" />}
              trend={{ value: 8, isPositive: true }}
              description="vs last month"
            />
            <StatsCard
              title="Revenue"
              value={`$${totalRevenue.toLocaleString()}`}
              icon={<DollarSign className="h-5 w-5" />}
              trend={{ value: 15, isPositive: true }}
              description="vs last month"
            />
            </div>

            {/* Management Tabs */}
            <Tabs defaultValue="users" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="users">User Management</TabsTrigger>
                <TabsTrigger value="courses">Course Management</TabsTrigger>
                <TabsTrigger value="assignments">Assignment Oversight</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              {/* User Management */}
              <TabsContent value="users" className="space-y-6">
                <Card className="skillora-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>User Management</CardTitle>
                      <div className="flex items-center gap-4">
                        <div className="relative w-80">
                          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                        <Button size="sm">
                          <UserPlus className="h-4 w-4 mr-2" />
                          Add User
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredUsers.map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{user.name}</h3>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <Badge variant={getRoleBadgeVariant(user.role)}>
                              {user.role}
                            </Badge>
                            
                            {user.role === 'student' && user.enrolledCourses && (
                              <span className="text-sm text-muted-foreground">
                                {user.enrolledCourses.length} courses
                              </span>
                            )}
                            
                            {user.role === 'tutor' && user.taughtCourses && (
                              <span className="text-sm text-muted-foreground">
                                {user.taughtCourses.length} courses taught
                              </span>
                            )}

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit User
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Settings className="h-4 w-4 mr-2" />
                                  Manage Permissions
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Course Management */}
              <TabsContent value="courses" className="space-y-6">
                <Card className="skillora-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Course Management</CardTitle>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Course
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {courses.map((course) => (
                        <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="w-16 h-12 object-cover rounded"
                            />
                            <div>
                              <h3 className="font-medium">{course.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                by {course.instructor} • {course.students} students
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <Badge variant="outline">{course.level}</Badge>
                            <span className="font-medium">${course.price}</span>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Course
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Users className="h-4 w-4 mr-2" />
                                  Manage Students
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete Course
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Assignment Oversight */}
              <TabsContent value="assignments" className="space-y-6">
                <Card className="skillora-card">
                  <CardHeader>
                    <CardTitle>Assignment Oversight</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {assignments.map((assignment) => {
                        const course = courses.find(c => c.id === assignment.courseId);
                        return (
                          <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <h3 className="font-medium">{assignment.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {course?.title} • Due: {new Date(assignment.dueDate).toLocaleDateString()}
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <Badge variant={
                                assignment.status === 'graded' ? 'default' : 
                                assignment.status === 'submitted' ? 'secondary' : 'destructive'
                              }>
                                {assignment.status}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {assignment.submissions?.length || 0} submissions
                              </span>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analytics */}
              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="skillora-card">
                    <CardHeader>
                      <CardTitle>User Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center text-muted-foreground">
                        Analytics Chart Placeholder
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="skillora-card">
                    <CardHeader>
                      <CardTitle>Revenue Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center text-muted-foreground">
                        Revenue Chart Placeholder
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}