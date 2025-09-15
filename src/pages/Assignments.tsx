import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Calendar, 
  Clock, 
  FileText, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  GraduationCap
} from "lucide-react";
import { assignments, courses, currentUser } from "@/data/mockData";

export default function Assignments() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Filter assignments based on user role and enrolled courses
  const userAssignments = assignments.filter(assignment => {
    if (currentUser.role === 'student') {
      return currentUser.enrolledCourses?.includes(assignment.courseId);
    }
    return true; // Tutors and admins see all assignments
  });

  const pendingAssignments = userAssignments.filter(a => a.status === 'pending');
  const submittedAssignments = userAssignments.filter(a => a.status === 'submitted');
  const gradedAssignments = userAssignments.filter(a => a.status === 'graded');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'destructive';
      case 'submitted': return 'secondary';
      case 'graded': return 'default';
      default: return 'outline';
    }
  };

  const getCourseTitle = (courseId: string) => {
    return courses.find(c => c.id === courseId)?.title || 'Unknown Course';
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
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
                <h1 className="text-3xl font-bold text-foreground">Assignments</h1>
                <p className="text-muted-foreground">Manage your course assignments and submissions</p>
              </div>
              
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {pendingAssignments.length} pending
                </Badge>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="skillora-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-destructive/10 rounded-lg">
                      <Clock className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{pendingAssignments.length}</p>
                      <p className="text-sm text-muted-foreground">Pending</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="skillora-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-secondary/20 rounded-lg">
                      <FileText className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{submittedAssignments.length}</p>
                      <p className="text-sm text-muted-foreground">Submitted</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="skillora-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-success/10 rounded-lg">
                      <CheckCircle2 className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{gradedAssignments.length}</p>
                      <p className="text-sm text-muted-foreground">Graded</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Assignment Tabs */}
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Assignments</TabsTrigger>
                <TabsTrigger value="pending">Pending ({pendingAssignments.length})</TabsTrigger>
                <TabsTrigger value="submitted">Submitted ({submittedAssignments.length})</TabsTrigger>
                <TabsTrigger value="graded">Graded ({gradedAssignments.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {userAssignments.map((assignment) => (
                  <Card key={assignment.id} className="skillora-card">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-lg">{assignment.title}</CardTitle>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <GraduationCap className="h-4 w-4" />
                              {getCourseTitle(assignment.courseId)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Due: {new Date(assignment.dueDate).toLocaleDateString()}
                            </div>
                            <span>Points: {assignment.maxPoints}</span>
                          </div>
                        </div>
                        <Badge variant={getStatusColor(assignment.status)}>
                          {assignment.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{assignment.description}</p>
                      
                      {assignment.status === 'pending' && currentUser.role === 'student' && (
                        <div className="space-y-4 border-t pt-4">
                          <h4 className="font-medium">Submit Assignment</h4>
                          <Textarea 
                            placeholder="Enter your assignment text or notes..."
                            className="min-h-20"
                          />
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <Input
                                type="file"
                                onChange={handleFileSelect}
                                accept=".pdf,.doc,.docx,.zip"
                              />
                            </div>
                            <Button className="skillora-button-primary">
                              <Upload className="h-4 w-4 mr-2" />
                              Submit
                            </Button>
                          </div>
                        </div>
                      )}

                      {assignment.status === 'graded' && (
                        <div className="space-y-2 border-t pt-4">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Grade:</span>
                            <Badge variant="default" className="text-base">
                              95/100
                            </Badge>
                          </div>
                          <div className="space-y-1">
                            <span className="font-medium text-sm">Feedback:</span>
                            <p className="text-sm text-muted-foreground">
                              Excellent work! Great attention to detail and clean code structure.
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        {assignment.status !== 'pending' && (
                          <Button variant="outline" size="sm">View Submission</Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="pending">
                {pendingAssignments.map((assignment) => (
                  <Card key={assignment.id} className="skillora-card border-l-4 border-l-destructive">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-destructive" />
                        {assignment.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Due: {new Date(assignment.dueDate).toLocaleDateString()} • {getCourseTitle(assignment.courseId)}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{assignment.description}</p>
                      <Button className="skillora-button-primary">Start Assignment</Button>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="submitted">
                {submittedAssignments.map((assignment) => (
                  <Card key={assignment.id} className="skillora-card border-l-4 border-l-secondary">
                    <CardHeader>
                      <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Submitted • {getCourseTitle(assignment.courseId)}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{assignment.description}</p>
                      <Badge variant="secondary">Awaiting Review</Badge>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="graded">
                {gradedAssignments.map((assignment) => (
                  <Card key={assignment.id} className="skillora-card border-l-4 border-l-success">
                    <CardHeader>
                      <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Graded • {getCourseTitle(assignment.courseId)}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{assignment.description}</p>
                      <div className="flex items-center gap-4">
                        <Badge variant="default" className="text-base">95/100</Badge>
                        <Button variant="outline" size="sm">View Feedback</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}