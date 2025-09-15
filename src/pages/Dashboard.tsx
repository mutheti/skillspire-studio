import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ProgressChart } from "@/components/dashboard/ProgressChart";
import { CompletionDonut } from "@/components/dashboard/CompletionDonut";
import { ScheduleCalendar } from "@/components/dashboard/ScheduleCalendar";
import { CourseCard } from "@/components/courses/CourseCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  Target,
  TrendingUp,
  Calendar,
  Download
} from "lucide-react";

// Mock data - in real app this would come from backend
const userRole = 'student'; // This would be dynamic based on logged-in user
const userName = 'Lingkan';

const mockCourses = [
  {
    id: '1',
    title: 'Figma workshop',
    instructor: {
      name: 'Eli Sanchez',
      country: 'USA',
      avatar: ''
    },
    level: 'Advanced' as const,
    progress: 50,
    duration: '2h 30m',
    students: 1250,
    rating: 4.8,
    isEnrolled: true
  },
  {
    id: '2',
    title: 'Fun with PHP',
    instructor: {
      name: 'Jesse Gregory',
      country: 'Belgium',
      avatar: ''
    },
    level: 'Beginner' as const,
    progress: 25,
    duration: '1h 45m',
    students: 890,
    rating: 4.6,
    isEnrolled: true
  },
  {
    id: '3',
    title: 'Python Guide',
    instructor: {
      name: 'Gonzalo Hanna',
      country: 'Italy',
      avatar: ''
    },
    level: 'Intermediate' as const,
    progress: 30,
    duration: '3h 15m',
    students: 2100,
    rating: 4.9,
    isEnrolled: true
  }
];

export default function Dashboard() {
  const showingDate = "23 Sep, 2025 - 28 Sep, 2025";

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={userRole} userName={userName} />
      
      <div className="flex">
        <Sidebar userRole={userRole} />
        
        <main className="flex-1 p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold font-display">Dashboard</h1>
              <p className="text-muted-foreground">
                Hello {userName}, welcome back to your learning platform!
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Showing Date</span>
              <Badge variant="outline" className="ml-2">
                {showingDate}
              </Badge>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Courses"
              value="16"
              description="Active enrollments"
              icon={<BookOpen className="h-4 w-4" />}
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard
              title="Learning Hours"
              value="125.5h"
              description="This month"
              icon={<Clock className="h-4 w-4" />}
              trend={{ value: 8, isPositive: true }}
            />
            <StatsCard
              title="Achievements"
              value="24"
              description="Badges earned"
              icon={<Trophy className="h-4 w-4" />}
              trend={{ value: 15, isPositive: true }}
            />
            <StatsCard
              title="Completion Rate"
              value="85%"
              description="Average score"
              icon={<Target className="h-4 w-4" />}
              trend={{ value: 3, isPositive: true }}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <ProgressChart />
            </div>
            <div className="lg:col-span-1">
              <CompletionDonut />
            </div>
            <div className="lg:col-span-1">
              <ScheduleCalendar />
            </div>
          </div>

          {/* Courses Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold font-display">Your Courses</h2>
                <p className="text-sm text-muted-foreground">16 courses</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download Course
                </Button>
                <Button size="sm">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}