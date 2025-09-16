import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Pages
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Assignments from "./pages/Assignments";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Schedule from "./pages/Schedule";
import LiveClasses from "./pages/LiveClasses";
import Achievements from "./pages/Achievements";
import Settings from "./pages/Settings";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";

// Tutor Pages
import TutorCourses from "./pages/tutor/TutorCourses";
import CreateCourse from "./pages/tutor/CreateCourse";

// Auth
import Login from "./pages/auth/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  const { currentUser } = useAuth();
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      
      {/* Student Routes */}
      <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
      <Route path="/courses/:courseId" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
      <Route path="/assignments" element={<ProtectedRoute><Assignments /></ProtectedRoute>} />
      <Route path="/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
      <Route path="/live-classes" element={<ProtectedRoute><LiveClasses /></ProtectedRoute>} />
      <Route path="/achievements" element={<ProtectedRoute><Achievements /></ProtectedRoute>} />
      <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
      
      {/* Tutor Routes */}
      <Route path="/tutor/courses" element={<ProtectedRoute><TutorCourses /></ProtectedRoute>} />
      <Route path="/tutor/create-course" element={<ProtectedRoute><CreateCourse /></ProtectedRoute>} />
      <Route path="/tutor/students" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/tutor/live-classes" element={<ProtectedRoute><LiveClasses /></ProtectedRoute>} />
      <Route path="/tutor/assignments" element={<ProtectedRoute><Assignments /></ProtectedRoute>} />
      <Route path="/tutor/analytics" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/courses" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/tutors" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/students" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/analytics" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/subscriptions" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      
      {/* Shared Routes */}
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
