import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  Users,
  DollarSign,
  Star,
  Eye,
  EyeOff,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react";
import { courses, users } from "@/data/mockData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminCourses() {
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add status to courses (mock data)
  const coursesWithStatus = courses.map(course => ({
    ...course,
    status: Math.random() > 0.1 ? 'published' : Math.random() > 0.5 ? 'draft' : 'under_review',
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    lastUpdated: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
  }));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="outline" className="text-green-600"><Eye className="h-3 w-3 mr-1" />Published</Badge>;
      case 'draft':
        return <Badge variant="secondary"><EyeOff className="h-3 w-3 mr-1" />Draft</Badge>;
      case 'under_review':
        return <Badge variant="outline" className="text-amber-600"><Clock className="h-3 w-3 mr-1" />Under Review</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: courses.length,
    published: coursesWithStatus.filter(c => c.status === 'published').length,
    draft: coursesWithStatus.filter(c => c.status === 'draft').length,
    underReview: coursesWithStatus.filter(c => c.status === 'under_review').length,
    totalRevenue: courses.reduce((sum, course) => sum + (course.price * course.students), 0),
    totalStudents: courses.reduce((sum, course) => sum + course.students, 0)
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
                <h1 className="text-3xl font-bold">Course Management</h1>
                <p className="text-muted-foreground">
                  Manage all courses on the platform
                </p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Course
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Courses</p>
                    <p className="text-2xl font-bold">{stats.total}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-primary" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-muted-foreground text-sm">Published</p>
                    <p className="text-2xl font-bold">{stats.published}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Students</p>
                    <p className="text-2xl font-bold">{stats.totalStudents}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Revenue</p>
                    <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </CardContent>
              </Card>
            </div>

            {/* Search */}
            <Card className="mb-6">
              <CardContent className="flex items-center justify-between pt-6">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Export Courses</Button>
                  <Button variant="outline">Import Courses</Button>
                </div>
              </CardContent>
            </Card>

            {/* Course Tabs */}
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Courses ({stats.total})</TabsTrigger>
                <TabsTrigger value="published">Published ({stats.published})</TabsTrigger>
                <TabsTrigger value="draft">Draft ({stats.draft})</TabsTrigger>
                <TabsTrigger value="review">Under Review ({stats.underReview})</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <div className="grid gap-6">
                  {coursesWithStatus.filter(course => 
                    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
                  ).map((course) => {
                    const completedModules = course.modules.filter(m => m.completed).length;
                    const progressPercent = (completedModules / course.modules.length) * 100;
                    
                    return (
                      <Card key={course.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                            />
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold truncate">{course.title}</h3>
                                  <p className="text-muted-foreground text-sm">by {course.instructor}</p>
                                </div>
                                
                                <div className="flex items-center gap-2 ml-4">
                                  {getStatusBadge(course.status)}
                                  <Badge variant="outline" className={getLevelColor(course.level)}>
                                    {course.level}
                                  </Badge>
                                </div>
                              </div>
                              
                              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                {course.description}
                              </p>
                              
                              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-4">
                                <div>
                                  <p className="text-muted-foreground">Students</p>
                                  <p className="font-medium">{course.students}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Price</p>
                                  <p className="font-medium">${course.price}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Rating</p>
                                  <p className="font-medium flex items-center gap-1">
                                    {course.rating} <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  </p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Revenue</p>
                                  <p className="font-medium">${(course.price * course.students).toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Created</p>
                                  <p className="font-medium">{course.createdAt}</p>
                                </div>
                              </div>
                              
                              <div className="mb-4">
                                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                  <span>Course Progress</span>
                                  <span>{completedModules}/{course.modules.length} modules</span>
                                </div>
                                <Progress value={progressPercent} className="h-2" />
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Course
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Users className="h-4 w-4 mr-2" />
                                    Manage Students
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Star className="h-4 w-4 mr-2" />
                                    View Reviews
                                  </DropdownMenuItem>
                                  {course.status === 'draft' && (
                                    <DropdownMenuItem>
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Publish Course
                                    </DropdownMenuItem>
                                  )}
                                  {course.status === 'published' && (
                                    <DropdownMenuItem>
                                      <EyeOff className="h-4 w-4 mr-2" />
                                      Unpublish Course
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Course
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="published" className="space-y-4">
                <div className="grid gap-6">
                  {coursesWithStatus.filter(course => course.status === 'published').map((course) => (
                    <Card key={course.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="w-16 h-12 object-cover rounded"
                            />
                            <div>
                              <h3 className="font-semibold">{course.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                by {course.instructor} • {course.students} students
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge variant="outline" className="text-green-600">
                              <Eye className="h-3 w-3 mr-1" />
                              Published
                            </Badge>
                            <span className="font-medium">${course.price}</span>
                            <Button variant="outline" size="sm">Manage</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="draft" className="space-y-4">
                <div className="grid gap-6">
                  {coursesWithStatus.filter(course => course.status === 'draft').map((course) => (
                    <Card key={course.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="w-16 h-12 object-cover rounded opacity-60"
                            />
                            <div>
                              <h3 className="font-semibold">{course.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                by {course.instructor} • Draft
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge variant="secondary">
                              <EyeOff className="h-3 w-3 mr-1" />
                              Draft
                            </Badge>
                            <div className="flex gap-2">
                              <Button size="sm">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Publish
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="review" className="space-y-4">
                <div className="grid gap-6">
                  {coursesWithStatus.filter(course => course.status === 'under_review').map((course) => (
                    <Card key={course.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="w-16 h-12 object-cover rounded"
                            />
                            <div>
                              <h3 className="font-semibold">{course.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                by {course.instructor} • Pending review
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge variant="outline" className="text-amber-600">
                              <Clock className="h-3 w-3 mr-1" />
                              Under Review
                            </Badge>
                            <div className="flex gap-2">
                              <Button size="sm">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                              </Button>
                              <Button variant="outline" size="sm">
                                <AlertTriangle className="h-4 w-4 mr-2" />
                                Request Changes
                              </Button>
                            </div>
                          </div>
                        </div>
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