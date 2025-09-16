import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, Plus, X, Save, Eye } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Module {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'text' | 'quiz' | 'assignment';
}

export default function CreateCourse() {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [modules, setModules] = useState<Module[]>([]);
  
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    level: '',
    price: '',
    duration: '',
    thumbnail: ''
  });

  const categories = [
    'Programming', 'Data Science', 'Design', 'Marketing', 
    'Business', 'Photography', 'Music', 'Language', 'Other'
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const addModule = () => {
    const newModule: Module = {
      id: `module-${Date.now()}`,
      title: '',
      duration: '',
      type: 'video'
    };
    setModules([...modules, newModule]);
  };

  const removeModule = (id: string) => {
    setModules(modules.filter(m => m.id !== id));
  };

  const updateModule = (id: string, field: string, value: string) => {
    setModules(modules.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft saved",
      description: "Your course draft has been saved successfully.",
    });
  };

  const handlePublish = () => {
    toast({
      title: "Course published!",
      description: "Your course is now live and available to students.",
    });
  };

  const progress = ((step - 1) / 2) * 100;

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole={currentUser?.role} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Create New Course</h1>
              <p className="text-muted-foreground">
                Share your knowledge and create engaging learning experiences
              </p>
            </div>

            {/* Progress Bar */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Course Creation Progress</span>
                  <span className="text-sm text-muted-foreground">Step {step} of 3</span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>Basic Info</span>
                  <span>Course Content</span>
                  <span>Review & Publish</span>
                </div>
              </CardContent>
            </Card>

            {/* Step 1: Basic Information */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Basic Course Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="title">Course Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter your course title"
                      value={courseData.title}
                      onChange={(e) => setCourseData(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Course Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what students will learn in this course..."
                      rows={4}
                      value={courseData.description}
                      onChange={(e) => setCourseData(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Category *</Label>
                      <Select value={courseData.category} onValueChange={(value) => setCourseData(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Course Level *</Label>
                      <Select value={courseData.level} onValueChange={(value) => setCourseData(prev => ({ ...prev, level: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          {levels.map(level => (
                            <SelectItem key={level} value={level}>{level}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Course Price ($) *</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="99.99"
                        value={courseData.price}
                        onChange={(e) => setCourseData(prev => ({ ...prev, price: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="duration">Estimated Duration *</Label>
                      <Input
                        id="duration"
                        placeholder="e.g., 8 hours"
                        value={courseData.duration}
                        onChange={(e) => setCourseData(prev => ({ ...prev, duration: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Course Thumbnail</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground mb-2">Upload course thumbnail</p>
                      <Button variant="outline" size="sm">Choose File</Button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => setStep(2)} disabled={!courseData.title || !courseData.description}>
                      Next: Add Content
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Course Content */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Course Content</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Add modules and lessons to structure your course
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Modules</h3>
                    <Button onClick={addModule} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Module
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {modules.map((module, index) => (
                      <Card key={module.id} className="p-4">
                        <div className="flex items-start justify-between mb-4">
                          <Badge variant="secondary">Module {index + 1}</Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeModule(module.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <Label>Module Title</Label>
                            <Input
                              placeholder="Enter module title"
                              value={module.title}
                              onChange={(e) => updateModule(module.id, 'title', e.target.value)}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Duration</Label>
                              <Input
                                placeholder="e.g., 45 min"
                                value={module.duration}
                                onChange={(e) => updateModule(module.id, 'duration', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>Module Type</Label>
                              <Select 
                                value={module.type} 
                                onValueChange={(value) => updateModule(module.id, 'type', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="video">Video</SelectItem>
                                  <SelectItem value="text">Text/Reading</SelectItem>
                                  <SelectItem value="quiz">Quiz</SelectItem>
                                  <SelectItem value="assignment">Assignment</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {modules.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">No modules added yet</p>
                      <Button onClick={addModule} variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Module
                      </Button>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button onClick={() => setStep(3)} disabled={modules.length === 0}>
                      Next: Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Review & Publish */}
            {step === 3 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Review Your Course</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">{courseData.title}</h3>
                      <p className="text-muted-foreground">{courseData.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Category:</span>
                        <p className="font-medium">{courseData.category}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Level:</span>
                        <p className="font-medium">{courseData.level}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Price:</span>
                        <p className="font-medium">${courseData.price}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <p className="font-medium">{courseData.duration}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Course Content ({modules.length} modules)</h4>
                      <div className="space-y-2">
                        {modules.map((module, index) => (
                          <div key={module.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                            <div>
                              <span className="font-medium">{index + 1}. {module.title}</span>
                              <Badge variant="outline" className="ml-2 text-xs">
                                {module.type}
                              </Badge>
                            </div>
                            <span className="text-sm text-muted-foreground">{module.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setStep(2)}>
                        Back
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={handleSaveDraft}>
                          <Save className="h-4 w-4 mr-2" />
                          Save Draft
                        </Button>
                        <Button onClick={handlePublish}>
                          <Eye className="h-4 w-4 mr-2" />
                          Publish Course
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}