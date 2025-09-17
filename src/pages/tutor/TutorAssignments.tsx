import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Plus, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Users,
  Calendar,
  Edit,
  Trash2,
  Download,
  MessageSquare
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { assignments, courses } from "@/data/mockData";

export default function TutorAssignments() {
  const { currentUser } = useAuth();

  // Get courses taught by current tutor
  const tutorCourses = courses.filter(course => course.instructorId === currentUser?.id);
  const tutorCourseIds = tutorCourses.map(course => course.id);

  // Get assignments for tutor's courses
  const tutorAssignments = assignments.filter(assignment => 
    tutorCourseIds.includes(assignment.courseId)
  );

  const getAssignmentStats = () => {
    const total = tutorAssignments.length;
    const active = tutorAssignments.filter(a => a.status === 'pending').length;
    const grading = tutorAssignments.filter(a => a.status === 'submitted').length;
    const completed = tutorAssignments.filter(a => a.status === 'graded').length;
    
    return { total, active, grading, completed };
  };

  const stats = getAssignmentStats();

  const getSubmissionStats = (assignmentId: string) => {
    const assignment = tutorAssignments.find(a => a.id === assignmentId);
    const totalSubmissions = assignment?.submissions?.length || 0;
    const gradedSubmissions = assignment?.submissions?.filter(s => s.grade !== undefined).length || 0;
    
    return { total: totalSubmissions, graded: gradedSubmissions };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'default';
      case 'submitted': return 'secondary';
      case 'graded': return 'outline';
      case 'overdue': return 'destructive';
      default: return 'outline';
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && tutorAssignments.find(a => a.dueDate === dueDate)?.status !== 'graded';
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
                <h1 className="text-3xl font-bold">Assignments</h1>
                <p className="text-muted-foreground">
                  Manage assignments and track student progress
                </p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Assignment
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Assignments</p>
                    <p className="text-2xl font-bold">{stats.total}</p>
                  </div>
                  <FileText className="h-8 w-8 text-primary" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-muted-foreground text-sm">Active</p>
                    <p className="text-2xl font-bold">{stats.active}</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-500" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-muted-foreground text-sm">Need Grading</p>
                    <p className="text-2xl font-bold">{stats.grading}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-amber-500" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-muted-foreground text-sm">Completed</p>
                    <p className="text-2xl font-bold">{stats.completed}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </CardContent>
              </Card>
            </div>

            {/* Assignment Tabs */}
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Assignments</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="grading">Need Grading</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                <div className="space-y-4">
                  {tutorAssignments.map((assignment) => {
                    const course = courses.find(c => c.id === assignment.courseId);
                    const submissionStats = getSubmissionStats(assignment.id);
                    const overdue = isOverdue(assignment.dueDate);
                    
                    return (
                      <Card key={assignment.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold">{assignment.title}</h3>
                                <Badge variant={getStatusColor(assignment.status)}>
                                  {assignment.status}
                                </Badge>
                                {overdue && (
                                  <Badge variant="destructive">
                                    Overdue
                                  </Badge>
                                )}
                              </div>
                              
                              <p className="text-muted-foreground mb-3">
                                Course: {course?.title}
                              </p>
                              
                              <p className="text-sm text-muted-foreground mb-4">
                                {assignment.description}
                              </p>
                              
                              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4" />
                                  <span>{submissionStats.total} submissions</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4" />
                                  <span>{submissionStats.graded} graded</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4" />
                                  <span>{assignment.maxPoints} points</span>
                                </div>
                              </div>

                              {/* Submission Progress */}
                              <div className="mb-4">
                                <div className="flex justify-between text-sm text-muted-foreground mb-1">
                                  <span>Grading Progress</span>
                                  <span>{submissionStats.graded}/{submissionStats.total}</span>
                                </div>
                                <Progress 
                                  value={submissionStats.total > 0 ? (submissionStats.graded / submissionStats.total) * 100 : 0} 
                                  className="h-2"
                                />
                              </div>
                            </div>
                            
                            <div className="flex gap-2 ml-4">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Export
                              </Button>
                              <Button size="sm">
                                View Submissions
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="active" className="space-y-6">
                <div className="space-y-4">
                  {tutorAssignments.filter(a => a.status === 'pending').map((assignment) => {
                    const course = courses.find(c => c.id === assignment.courseId);
                    return (
                      <Card key={assignment.id}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-semibold">{assignment.title}</h3>
                              <p className="text-muted-foreground">{course?.title}</p>
                              <p className="text-sm text-muted-foreground">
                                Due: {new Date(assignment.dueDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Announce
                              </Button>
                              <Button size="sm">View Details</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="grading" className="space-y-6">
                <div className="space-y-4">
                  {tutorAssignments.filter(a => a.status === 'submitted').map((assignment) => {
                    const course = courses.find(c => c.id === assignment.courseId);
                    const submissionStats = getSubmissionStats(assignment.id);
                    
                    return (
                      <Card key={assignment.id}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-semibold">{assignment.title}</h3>
                              <p className="text-muted-foreground">{course?.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {submissionStats.total - submissionStats.graded} submissions pending
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button>
                                Start Grading
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="completed" className="space-y-6">
                <div className="space-y-4">
                  {tutorAssignments.filter(a => a.status === 'graded').map((assignment) => {
                    const course = courses.find(c => c.id === assignment.courseId);
                    const submissionStats = getSubmissionStats(assignment.id);
                    
                    return (
                      <Card key={assignment.id}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-semibold">{assignment.title}</h3>
                              <p className="text-muted-foreground">{course?.title}</p>
                              <p className="text-sm text-muted-foreground">
                                All {submissionStats.total} submissions graded
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Export Grades
                              </Button>
                              <Button size="sm">View Results</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}