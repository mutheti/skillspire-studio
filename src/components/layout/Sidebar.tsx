import { NavLink, useLocation } from "react-router-dom";
import { 
  Home, 
  BookOpen, 
  Calendar, 
  FileText, 
  Users, 
  BarChart3, 
  Settings, 
  PlayCircle,
  Trophy,
  MessageSquare,
  Star,
  Upload,
  GraduationCap,
  UserCheck,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SidebarProps {
  userRole?: 'student' | 'tutor' | 'admin';
}

export function Sidebar({ userRole = 'student' }: SidebarProps) {
  const location = useLocation();

  const getNavItems = () => {
    const commonItems = [
      { title: "Dashboard", url: "/", icon: Home },
    ];

    const studentItems = [
      { title: "My Courses", url: "/courses", icon: BookOpen },
      { title: "Schedule", url: "/schedule", icon: Calendar },
      { title: "Assignments", url: "/assignments", icon: FileText },
      { title: "Live Classes", url: "/live-classes", icon: PlayCircle },
      { title: "Achievements", url: "/achievements", icon: Trophy },
      { title: "Messages", url: "/messages", icon: MessageSquare },
    ];

    const tutorItems = [
      { title: "My Courses", url: "/tutor/courses", icon: BookOpen },
      { title: "Create Course", url: "/tutor/create-course", icon: Upload },
      { title: "Students", url: "/tutor/students", icon: Users },
      { title: "Live Classes", url: "/tutor/live-classes", icon: PlayCircle },
      { title: "Assignments", url: "/tutor/assignments", icon: FileText },
      { title: "Analytics", url: "/tutor/analytics", icon: BarChart3 },
      { title: "Messages", url: "/messages", icon: MessageSquare },
    ];

    const adminItems = [
      { title: "Users", url: "/admin/users", icon: Users },
      { title: "Courses", url: "/admin/courses", icon: BookOpen },
      { title: "Tutors", url: "/admin/tutors", icon: GraduationCap },
      { title: "Students", url: "/admin/students", icon: UserCheck },
      { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
      { title: "Subscriptions", url: "/admin/subscriptions", icon: Shield },
      { title: "System Settings", url: "/admin/settings", icon: Settings },
    ];

    const settingsItems = [
      { title: "Settings", url: "/settings", icon: Settings },
    ];

    switch (userRole) {
      case 'tutor':
        return [...commonItems, ...tutorItems, ...settingsItems];
      case 'admin':
        return [...commonItems, ...adminItems, ...settingsItems];
      default:
        return [...commonItems, ...studentItems, ...settingsItems];
    }
  };

  const navItems = getNavItems();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <aside className="w-64 h-full bg-card border-r border-border">
      <div className="p-6">
        {/* Role Badge */}
        <div className="mb-6">
          <Badge 
            variant="secondary" 
            className={cn(
              "capitalize font-medium",
              userRole === 'admin' && "bg-destructive/10 text-destructive hover:bg-destructive/20",
              userRole === 'tutor' && "bg-primary/10 text-primary hover:bg-primary/20",
              userRole === 'student' && "bg-info/10 text-info hover:bg-info/20"
            )}
          >
            {userRole}
          </Badge>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.url);
            
            return (
              <NavLink
                key={item.title}
                to={item.url}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span>{item.title}</span>
                {item.title === "Messages" && (
                  <Badge className="ml-auto h-5 w-5 p-0 text-xs">3</Badge>
                )}
                {item.title === "Assignments" && userRole === 'student' && (
                  <div className="ml-auto h-2 w-2 bg-primary rounded-full" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Quick Stats */}
        {userRole === 'student' && (
          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium text-sm mb-3">This Week</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Learning Time</span>
                <span className="font-medium">12h 30m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Completed</span>
                <span className="font-medium">8 lessons</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Streak</span>
                <span className="font-medium flex items-center gap-1">
                  5 days <Star className="h-3 w-3 text-primary fill-current" />
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}