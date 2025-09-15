import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Award,
  BookOpen,
  Clock,
  Target,
  Edit,
  Save,
  Camera
} from "lucide-react";
import { currentUser, courses } from "@/data/mockData";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Passionate learner focused on web development and data science. Always excited to take on new challenges and expand my skill set.",
    joinDate: "January 2024"
  });

  const userCourses = courses.filter(course => 
    currentUser.enrolledCourses?.includes(course.id)
  );

  const completedCourses = userCourses.filter(course => course.progress === 100);
  const inProgressCourses = userCourses.filter(course => 
    course.progress && course.progress > 0 && course.progress < 100
  );

  const totalHours = userCourses.reduce((sum, course) => {
    return sum + parseInt(course.duration.split(' ')[0]);
  }, 0);

  const averageProgress = userCourses.reduce((sum, course) => {
    return sum + (course.progress || 0);
  }, 0) / userCourses.length;

  const handleSave = () => {
    // Here you would save the profile data
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Profile Header */}
            <Card className="skillora-card">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <Avatar className="h-32 w-32">
                        <AvatarImage src={currentUser.avatar} />
                        <AvatarFallback className="text-2xl">
                          {currentUser.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                    </Badge>
                  </div>

                  <div className="flex-1 space-y-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h1 className="text-3xl font-bold">{currentUser.name}</h1>
                        <p className="text-muted-foreground">{profileData.bio}</p>
                      </div>
                      <Button 
                        variant="outline"
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                      >
                        {isEditing ? (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </>
                        ) : (
                          <>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Profile
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Courses</p>
                          <p className="font-semibold">{userCourses.length}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-success" />
                        <div>
                          <p className="text-sm text-muted-foreground">Completed</p>
                          <p className="font-semibold">{completedCourses.length}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-warning" />
                        <div>
                          <p className="text-sm text-muted-foreground">Hours</p>
                          <p className="font-semibold">{totalHours}h</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Target className="h-5 w-5 text-info" />
                        <div>
                          <p className="text-sm text-muted-foreground">Avg Progress</p>
                          <p className="font-semibold">{Math.round(averageProgress)}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Tabs */}
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="courses">My Courses</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Personal Information */}
              <TabsContent value="personal" className="space-y-6">
                <Card className="skillora-card">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id="location"
                            value={profileData.location}
                            onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                        disabled={!isEditing}
                        className="min-h-20"
                      />
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {profileData.joinDate}</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* My Courses */}
              <TabsContent value="courses" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="skillora-card">
                    <CardHeader>
                      <CardTitle>In Progress ({inProgressCourses.length})</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {inProgressCourses.map((course) => (
                        <div key={course.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm">{course.title}</h4>
                            <span className="text-sm text-muted-foreground">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="skillora-card">
                    <CardHeader>
                      <CardTitle>Completed ({completedCourses.length})</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {completedCourses.map((course) => (
                        <div key={course.id} className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-sm">{course.title}</h4>
                            <p className="text-xs text-muted-foreground">{course.instructor}</p>
                          </div>
                          <Badge variant="default">
                            <Award className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Achievements */}
              <TabsContent value="achievements" className="space-y-6">
                <Card className="skillora-card">
                  <CardHeader>
                    <CardTitle>Achievements & Badges</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-6 border rounded-lg">
                        <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                        <h3 className="font-semibold">First Course</h3>
                        <p className="text-sm text-muted-foreground">Completed your first course</p>
                      </div>
                      <div className="text-center p-6 border rounded-lg">
                        <Target className="h-12 w-12 text-success mx-auto mb-4" />
                        <h3 className="font-semibold">Goal Achiever</h3>
                        <p className="text-sm text-muted-foreground">Completed 3 courses</p>
                      </div>
                      <div className="text-center p-6 border rounded-lg opacity-50">
                        <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-semibold">Speed Learner</h3>
                        <p className="text-sm text-muted-foreground">Complete a course in under a week</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings */}
              <TabsContent value="settings" className="space-y-6">
                <Card className="skillora-card">
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Privacy Settings</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Profile Visibility</span>
                          <Button variant="outline" size="sm">Public</Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Email Notifications</span>
                          <Button variant="outline" size="sm">Enabled</Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Security</h4>
                      <div className="space-y-2">
                        <Button variant="outline">Change Password</Button>
                        <Button variant="outline">Two-Factor Authentication</Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Danger Zone</h4>
                      <Button variant="destructive">Delete Account</Button>
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