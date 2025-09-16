import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      assignments: true,
      liveClasses: true,
      messages: false
    },
    preferences: {
      language: 'en',
      timezone: 'UTC-8',
      theme: 'system'
    },
    privacy: {
      profileVisible: true,
      progressVisible: true,
      achievementsVisible: true
    }
  });

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const handlePreferenceChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value
      }
    }));
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole={currentUser?.role} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground">
                Manage your account preferences and privacy settings
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarImage src={currentUser?.avatar} />
                      <AvatarFallback className="text-lg">
                        {currentUser?.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold">{currentUser?.name}</h3>
                    <p className="text-sm text-muted-foreground">{currentUser?.email}</p>
                    <Badge className="mt-2 capitalize">{currentUser?.role}</Badge>
                  </div>
                  <Button variant="outline" className="w-full">
                    Change Avatar
                  </Button>
                </CardContent>
              </Card>

              {/* Settings */}
              <div className="lg:col-span-2 space-y-6">
                {/* Account Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue={currentUser?.name.split(' ')[0]} />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue={currentUser?.name.split(' ')[1]} />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={currentUser?.email} />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Input id="bio" placeholder="Tell us about yourself..." />
                    </div>
                  </CardContent>
                </Card>

                {/* Preferences */}
                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Language</Label>
                        <Select value={settings.preferences.language} onValueChange={(value) => handlePreferenceChange('language', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Timezone</Label>
                        <Select value={settings.preferences.timezone} onValueChange={(value) => handlePreferenceChange('timezone', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="UTC-8">UTC-8 (Pacific)</SelectItem>
                            <SelectItem value="UTC-5">UTC-5 (Eastern)</SelectItem>
                            <SelectItem value="UTC+0">UTC+0 (GMT)</SelectItem>
                            <SelectItem value="UTC+1">UTC+1 (CET)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>Theme</Label>
                      <Select value={settings.preferences.theme} onValueChange={(value) => handlePreferenceChange('theme', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Notifications */}
                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Choose what notifications you'd like to receive
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={settings.notifications.email}
                        onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive push notifications</p>
                      </div>
                      <Switch
                        checked={settings.notifications.push}
                        onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Assignment Reminders</p>
                        <p className="text-sm text-muted-foreground">Get notified about due assignments</p>
                      </div>
                      <Switch
                        checked={settings.notifications.assignments}
                        onCheckedChange={(checked) => handleNotificationChange('assignments', checked)}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Live Class Alerts</p>
                        <p className="text-sm text-muted-foreground">Get notified before classes start</p>
                      </div>
                      <Switch
                        checked={settings.notifications.liveClasses}
                        onCheckedChange={(checked) => handleNotificationChange('liveClasses', checked)}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Message Notifications</p>
                        <p className="text-sm text-muted-foreground">Get notified about new messages</p>
                      </div>
                      <Switch
                        checked={settings.notifications.messages}
                        onCheckedChange={(checked) => handleNotificationChange('messages', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Privacy */}
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Control what information is visible to others
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Profile Visible</p>
                        <p className="text-sm text-muted-foreground">Allow others to view your profile</p>
                      </div>
                      <Switch
                        checked={settings.privacy.profileVisible}
                        onCheckedChange={(checked) => handlePrivacyChange('profileVisible', checked)}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Progress Visible</p>
                        <p className="text-sm text-muted-foreground">Show your course progress to others</p>
                      </div>
                      <Switch
                        checked={settings.privacy.progressVisible}
                        onCheckedChange={(checked) => handlePrivacyChange('progressVisible', checked)}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Achievements Visible</p>
                        <p className="text-sm text-muted-foreground">Display your achievements publicly</p>
                      </div>
                      <Switch
                        checked={settings.privacy.achievementsVisible}
                        onCheckedChange={(checked) => handlePrivacyChange('achievementsVisible', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Save Button */}
                <div className="flex justify-end">
                  <Button onClick={handleSave} className="w-full md:w-auto">
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}