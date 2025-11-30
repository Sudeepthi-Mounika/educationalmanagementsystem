import { BookOpen, Users, Clock, Calendar, Award, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function CoursesView() {
  const courses = [
    {
      id: 1,
      name: "Physics 101",
      instructor: "Dr. Sarah Johnson",
      semester: "Fall 2025",
      progress: 75,
      totalStudents: 42,
      nextClass: "2025-01-08",
      assignments: 3,
      workbooks: 8,
      grade: "A-",
      credits: 4,
      description: "Introduction to classical mechanics, thermodynamics, and wave physics.",
      color: "blue"
    },
    {
      id: 2,
      name: "Mathematics",
      instructor: "Prof. Michael Chen",
      semester: "Fall 2025",
      progress: 90,
      totalStudents: 38,
      nextClass: "2025-01-09",
      assignments: 2,
      workbooks: 12,
      grade: "A",
      credits: 3,
      description: "Advanced calculus and differential equations with practical applications.",
      color: "green"
    },
    {
      id: 3,
      name: "Chemistry",
      instructor: "Dr. Emily Rodriguez",
      semester: "Fall 2025",
      progress: 60,
      totalStudents: 35,
      nextClass: "2025-01-10",
      assignments: 4,
      workbooks: 6,
      grade: "B+",
      credits: 4,
      description: "Organic and inorganic chemistry fundamentals with laboratory work.",
      color: "purple"
    },
    {
      id: 4,
      name: "Computer Science",
      instructor: "Prof. David Kim",
      semester: "Fall 2025",
      progress: 85,
      totalStudents: 45,
      nextClass: "2025-01-11",
      assignments: 1,
      workbooks: 10,
      grade: "A-",
      credits: 3,
      description: "Data structures, algorithms, and object-oriented programming concepts.",
      color: "orange"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "border-blue-200 bg-blue-50/50",
      green: "border-green-200 bg-green-50/50",
      purple: "border-purple-200 bg-purple-50/50",
      orange: "border-orange-200 bg-orange-50/50"
    };
    return colorMap[color as keyof typeof colorMap] || "border-gray-200 bg-gray-50/50";
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-blue-500";
    if (progress >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold">My Courses</h2>
        <p className="text-muted-foreground">Track your enrolled courses and academic progress</p>
      </div>

      {/* Course Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground">Credit hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">A-</div>
            <p className="text-xs text-muted-foreground">3.7 GPA</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">77%</div>
            <p className="text-xs text-muted-foreground">Overall progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className={`${getColorClasses(course.color)} hover:shadow-md transition-shadow`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    {course.name}
                  </CardTitle>
                  <CardDescription>{course.instructor}</CardDescription>
                </div>
                <Badge variant="secondary">{course.grade}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{course.description}</p>
              
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Course Progress</span>
                  <span className="text-sm text-muted-foreground">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getProgressColor(course.progress)}`}
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Course Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Next Class: {course.nextClass}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{course.totalStudents} students</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-muted-foreground">
                    {course.assignments} assignments pending
                  </div>
                  <div className="text-muted-foreground">
                    {course.workbooks} workbook entries
                  </div>
                </div>
              </div>

              {/* Course Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button size="sm" className="flex-1">
                  Enter Course
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}