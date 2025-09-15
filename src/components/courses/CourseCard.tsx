import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Users, Star, Play, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  id: string;
  title: string;
  instructor: {
    name: string;
    avatar?: string;
    country?: string;
  };
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  progress?: number;
  duration?: string;
  students?: number;
  rating?: number;
  thumbnail?: string;
  isEnrolled?: boolean;
  className?: string;
}

export function CourseCard({
  id,
  title,
  instructor,
  level,
  progress,
  duration,
  students,
  rating,
  thumbnail,
  isEnrolled = false,
  className
}: CourseCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-success/10 text-success hover:bg-success/20';
      case 'Intermediate':
        return 'bg-warning/10 text-warning hover:bg-warning/20';
      case 'Advanced':
        return 'bg-destructive/10 text-destructive hover:bg-destructive/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className={cn("skillora-card group hover:shadow-lg transition-all duration-300", className)}>
      <CardContent className="p-0">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-primary/5 rounded-t-xl overflow-hidden">
          {thumbnail ? (
            <img 
              src={thumbnail} 
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Play className="h-12 w-12 text-primary/30" />
            </div>
          )}
          
          {/* Play button overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button size="icon" className="rounded-full bg-primary hover:bg-primary/90">
              <Play className="h-5 w-5 text-primary-foreground fill-current" />
            </Button>
          </div>

          {/* Level badge */}
          <Badge className={cn("absolute top-3 left-3", getLevelColor(level))}>
            {level}
          </Badge>

          {/* Action button */}
          <Button 
            size="icon" 
            variant="secondary"
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Progress bar (for enrolled courses) */}
          {isEnrolled && progress !== undefined && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <div className="skillora-progress">
                <div 
                  className="skillora-progress-fill" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Instructor */}
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src={instructor.avatar} alt={instructor.name} />
              <AvatarFallback className="text-xs">
                {instructor.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{instructor.name}</div>
              {instructor.country && (
                <div className="text-xs text-muted-foreground">{instructor.country}</div>
              )}
            </div>
          </div>

          {/* Course stats */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            {duration && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{duration}</span>
              </div>
            )}
            {students && (
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{students.toLocaleString()}</span>
              </div>
            )}
            {rating && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-current text-warning" />
                <span>{rating}</span>
              </div>
            )}
          </div>

          {/* Action button */}
          <Button 
            className="w-full" 
            variant={isEnrolled ? "outline" : "default"}
          >
            {isEnrolled ? "Continue Learning" : "Enroll Now"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}