import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Star,
  Clock,
  Award,
  Target
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { courses, assignments, users } from "@/data/mockData";

export default function TutorAnalytics() {
  const { currentUser } = useAuth();

  // Get courses taught by current tutor
  const tutorCourses = courses.filter(course => course.instructorId === currentUser?.id);
  const tutorCourseIds = tutorCourses.map(course => course.id);

  // Get students enrolled in tutor's courses
  const tutorStudents = users.filter(user => 
    user.role === 'student' && 
    user.enrolledCourses?.some(courseId => tutorCourseIds.includes(courseId))
  );

  // Get assignments for tutor's courses
  const tutorAssignments = assignments.filter(assignment => 
    tutorCourseIds.includes(assignment.courseId)
  );

  // Calculate analytics data
  const totalRevenue = tutorCourses.reduce((sum, course) => sum + (course.price * course.students), 0);
  const totalStudents = tutorStudents.length;
  const averageRating = tutorCourses.length > 0 
    ? (tutorCourses.reduce((sum, course) => sum + course.rating, 0) / tutorCourses.length)
    : 0;
  const completionRate = tutorCourses.length > 0
    ? tutorCourses.reduce((sum, course) => {
        const completed = course.modules.filter(m => m.completed).length;
        return sum + (completed / course.modules.length);
      }, 0) / tutorCourses.length * 100
    : 0;

  // Mock data for charts
  const monthlyData = [
    { month: 'Jan', students: 45, revenue: 2400, completion: 85 },
    { month: 'Feb', students: 52, revenue: 3200, completion: 88 },
    { month: 'Mar', students: 61, revenue: 4100, completion: 92 },
    { month: 'Apr', students: 58, revenue: 3800, completion: 89 },
    { month: 'May', students: 67, revenue: 4800, completion: 94 },
    { month: 'Jun', students: 73, revenue: 5200, completion: 96 },
  ];

  const topCourses = tutorCourses
    .sort((a, b) => b.students - a.students)
    .slice(0, 5);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole={currentUser?.role} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
                <p className="text-muted-foreground">
                  Track your teaching performance and student engagement
                </p>
              </div>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Revenue</p>
                    <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
                    <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>+15% from last month</span>
                    </div>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Students</p>
                    <p className="text-2xl font-bold">{totalStudents}</p>
                    <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>+8% from last month</span>
                    </div>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-muted-foreground text-sm">Average Rating</p>
                    <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
                    <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>+0.2 from last month</span>
                    </div>
                  </div>
                  <Star className="h-8 w-8 text-amber-500" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-muted-foreground text-sm">Completion Rate</p>
                    <p className="text-2xl font-bold">{completionRate.toFixed(1)}%</p>
                    <div className="flex items-center gap-1 text-red-600 text-sm mt-1">
                      <TrendingDown className="h-3 w-3" />
                      <span>-2% from last month</span>
                    </div>
                  </div>
                  <Target className="h-8 w-8 text-purple-500" />
                </CardContent>
              </Card>
            </div>

            {/* Analytics Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="students">Student Analytics</TabsTrigger>
                <TabsTrigger value="courses">Course Performance</TabsTrigger>
                <TabsTrigger value="engagement">Engagement</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Monthly Growth */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80 flex items-center justify-center text-muted-foreground">
                        <div className="text-center">
                          <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                          <p>Monthly Growth Chart</p>
                          <p className="text-sm mt-2">Students: 73 (+12% from last month)</p>
                          <p className="text-sm">Revenue: $5,200 (+18% from last month)</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Top Performing Courses */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Performing Courses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {topCourses.map((course, index) => (
                          <div key={course.id} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{course.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {course.students} students • {course.rating}⭐
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">${(course.price * course.students).toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground">#{index + 1}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Learning Hours</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <Clock className="h-8 w-8 text-blue-500" />
                        <div>
                          <p className="text-2xl font-bold">1,247</p>
                          <p className="text-sm text-muted-foreground">Total hours taught</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Assignments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <Award className="h-8 w-8 text-green-500" />
                        <div>
                          <p className="text-2xl font-bold">{tutorAssignments.length}</p>
                          <p className="text-sm text-muted-foreground">Total assignments</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Courses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <BookOpen className="h-8 w-8 text-purple-500" />
                        <div>
                          <p className="text-2xl font-bold">{tutorCourses.length}</p>
                          <p className="text-sm text-muted-foreground">Active courses</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="students" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Student Progress Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Excellent (90-100%)</span>
                          <span className="text-sm font-medium">23 students</span>
                        </div>
                        <Progress value={31} className="h-2" />
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Good (70-89%)</span>
                          <span className="text-sm font-medium">32 students</span>
                        </div>
                        <Progress value={44} className="h-2" />
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Average (50-69%)</span>
                          <span className="text-sm font-medium">15 students</span>
                        </div>
                        <Progress value={20} className="h-2" />
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Needs Attention (0-49%)</span>
                          <span className="text-sm font-medium">3 students</span>
                        </div>
                        <Progress value={4} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Student Engagement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-green-600">87%</p>
                          <p className="text-sm text-muted-foreground">Average Engagement Rate</p>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm">Weekly Active</span>
                            <span className="text-sm font-medium">64 students</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Daily Active</span>
                            <span className="text-sm font-medium">41 students</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Inactive (7+ days)</span>
                            <span className="text-sm font-medium">9 students</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="courses" className="space-y-6">
                <div className="grid gap-6">
                  {tutorCourses.map((course) => {
                    const completedModules = course.modules.filter(m => m.completed).length;
                    const progressPercent = (completedModules / course.modules.length) * 100;
                    
                    return (
                      <Card key={course.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-semibold">{course.title}</h3>
                              <p className="text-muted-foreground">{course.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold">{course.rating}⭐</p>
                              <p className="text-sm text-muted-foreground">Rating</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <div className="text-center">
                              <p className="text-xl font-bold">{course.students}</p>
                              <p className="text-xs text-muted-foreground">Students</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xl font-bold">${course.price * course.students}</p>
                              <p className="text-xs text-muted-foreground">Revenue</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xl font-bold">{course.modules.length}</p>
                              <p className="text-xs text-muted-foreground">Modules</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xl font-bold">{progressPercent.toFixed(0)}%</p>
                              <p className="text-xs text-muted-foreground">Completion</p>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm text-muted-foreground mb-1">
                              <span>Course Progress</span>
                              <span>{completedModules}/{course.modules.length} modules</span>
                            </div>
                            <Progress value={progressPercent} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="engagement" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Weekly Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center text-muted-foreground">
                        Activity Timeline Chart Placeholder
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Engagement Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">Video Watch Time</span>
                            <span className="text-sm font-medium">78%</span>
                          </div>
                          <Progress value={78} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">Assignment Completion</span>
                            <span className="text-sm font-medium">92%</span>
                          </div>
                          <Progress value={92} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">Discussion Participation</span>
                            <span className="text-sm font-medium">64%</span>
                          </div>
                          <Progress value={64} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">Q&A Engagement</span>
                            <span className="text-sm font-medium">45%</span>
                          </div>
                          <Progress value={45} className="h-2" />
                        </div>
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