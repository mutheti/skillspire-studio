import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Target, Award, Zap, Book } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const achievements = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first course module',
    icon: Book,
    earned: true,
    earnedDate: '2024-01-05',
    points: 50
  },
  {
    id: '2',
    title: 'Speed Learner',
    description: 'Complete 5 modules in one day',
    icon: Zap,
    earned: true,
    earnedDate: '2024-01-10',
    points: 100
  },
  {
    id: '3',
    title: 'Perfect Score',
    description: 'Score 100% on an assignment',
    icon: Target,
    earned: true,
    earnedDate: '2024-01-12',
    points: 150
  },
  {
    id: '4',
    title: 'Course Master',
    description: 'Complete an entire course',
    icon: Trophy,
    earned: false,
    progress: 65,
    points: 300
  },
  {
    id: '5',
    title: 'Streak Champion',
    description: 'Maintain a 30-day learning streak',
    icon: Star,
    earned: false,
    progress: 16,
    points: 200
  },
  {
    id: '6',
    title: 'Knowledge Sharer',
    description: 'Help 10 fellow students in discussions',
    icon: Award,
    earned: false,
    progress: 3,
    points: 100
  }
];

const stats = {
  totalPoints: 1450,
  currentStreak: 5,
  coursesCompleted: 2,
  totalAchievements: 3,
  rank: 'Bronze Scholar'
};

const leaderboard = [
  { rank: 1, name: 'Emma Thompson', points: 2850, avatar: 'ET' },
  { rank: 2, name: 'David Rodriguez', points: 2640, avatar: 'DR' },
  { rank: 3, name: 'Sarah Kim', points: 2420, avatar: 'SK' },
  { rank: 4, name: 'Alex Johnson (You)', points: 1450, avatar: 'AJ', isMe: true },
  { rank: 5, name: 'Michael Brown', points: 1320, avatar: 'MB' }
];

export default function Achievements() {
  const { currentUser } = useAuth();

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole={currentUser?.role} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Achievements</h1>
              <p className="text-muted-foreground">
                Track your progress and celebrate your learning milestones
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Points</p>
                    <p className="text-2xl font-bold text-primary">{stats.totalPoints}</p>
                  </div>
                  <Trophy className="h-8 w-8 text-primary" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-muted-foreground text-sm">Current Streak</p>
                    <p className="text-2xl font-bold">{stats.currentStreak} days</p>
                  </div>
                  <Zap className="h-8 w-8 text-orange-500" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-muted-foreground text-sm">Courses Completed</p>
                    <p className="text-2xl font-bold">{stats.coursesCompleted}</p>
                  </div>
                  <Book className="h-8 w-8 text-green-500" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-muted-foreground text-sm">Current Rank</p>
                    <p className="text-lg font-bold">{stats.rank}</p>
                  </div>
                  <Award className="h-8 w-8 text-amber-500" />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Achievements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {achievements.map((achievement) => {
                    const IconComponent = achievement.icon;
                    return (
                      <div
                        key={achievement.id}
                        className={`flex items-start gap-4 p-4 rounded-lg border ${
                          achievement.earned
                            ? 'bg-primary/5 border-primary/20'
                            : 'bg-muted/30 border-muted'
                        }`}
                      >
                        <div
                          className={`p-2 rounded-full ${
                            achievement.earned
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3
                              className={`font-semibold ${
                                achievement.earned ? 'text-foreground' : 'text-muted-foreground'
                              }`}
                            >
                              {achievement.title}
                            </h3>
                            <Badge
                              variant={achievement.earned ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {achievement.points} pts
                            </Badge>
                          </div>
                          <p
                            className={`text-sm ${
                              achievement.earned ? 'text-muted-foreground' : 'text-muted-foreground/70'
                            }`}
                          >
                            {achievement.description}
                          </p>
                          {achievement.earned && achievement.earnedDate && (
                            <p className="text-xs text-primary mt-1">
                              Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
                            </p>
                          )}
                          {!achievement.earned && achievement.progress !== undefined && (
                            <div className="mt-2">
                              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                <span>Progress</span>
                                <span>
                                  {achievement.progress}
                                  {achievement.id === '4' ? '%' : achievement.id === '5' ? '/30' : '/10'}
                                </span>
                              </div>
                              <Progress
                                value={
                                  achievement.id === '4'
                                    ? achievement.progress
                                    : achievement.id === '5'
                                    ? (achievement.progress / 30) * 100
                                    : (achievement.progress / 10) * 100
                                }
                                className="h-2"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Leaderboard */}
              <Card>
                <CardHeader>
                  <CardTitle>Leaderboard</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    See how you rank among your peers
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {leaderboard.map((user) => (
                      <div
                        key={user.rank}
                        className={`flex items-center gap-3 p-3 rounded-lg ${
                          user.isMe ? 'bg-primary/10 border border-primary/20' : 'bg-muted/30'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            user.rank <= 3
                              ? user.rank === 1
                                ? 'bg-yellow-500 text-white'
                                : user.rank === 2
                                ? 'bg-gray-400 text-white'
                                : 'bg-amber-600 text-white'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {user.rank}
                        </div>
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium">
                          {user.avatar}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${user.isMe ? 'text-primary' : ''}`}>
                            {user.name}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{user.points}</p>
                          <p className="text-xs text-muted-foreground">points</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}