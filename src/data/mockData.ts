// Mock data for the e-learning platform
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'tutor' | 'admin';
  avatar: string;
  bio?: string;
  enrolledCourses?: string[];
  taughtCourses?: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  instructorId: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  rating: number;
  students: number;
  progress?: number;
  modules: Module[];
  category: string;
  isEnrolled?: boolean;
}

export interface Module {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  type: 'video' | 'text' | 'quiz' | 'assignment';
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  dueDate: string;
  maxPoints: number;
  submissions?: Submission[];
  status: 'pending' | 'submitted' | 'graded';
}

export interface Submission {
  id: string;
  studentId: string;
  studentName: string;
  assignmentId: string;
  submittedAt: string;
  content: string;
  attachments?: string[];
  grade?: number;
  feedback?: string;
}

// Current user (can be switched to test different roles)
export const currentUser: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  role: 'student', // Change this to 'tutor' or 'admin' to test different views
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  enrolledCourses: ['course-1', 'course-2', 'course-3']
};

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    enrolledCourses: ['course-1', 'course-2', 'course-3']
  },
  {
    id: 'user-2',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'tutor',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b662?w=150&h=150&fit=crop&crop=face',
    taughtCourses: ['course-1', 'course-4']
  },
  {
    id: 'user-3',
    name: 'Dr. Michael Chen',
    email: 'michael@example.com',
    role: 'tutor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    taughtCourses: ['course-2', 'course-3']
  },
  {
    id: 'user-4',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face'
  }
];

export const courses: Course[] = [
  {
    id: 'course-1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB from scratch',
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
    instructor: 'Sarah Wilson',
    instructorId: 'user-2',
    duration: '40 hours',
    level: 'Beginner',
    price: 89.99,
    rating: 4.8,
    students: 1234,
    progress: 65,
    category: 'Programming',
    isEnrolled: true,
    modules: [
      { id: 'mod-1', title: 'HTML Basics', duration: '2h', completed: true, type: 'video' },
      { id: 'mod-2', title: 'CSS Fundamentals', duration: '3h', completed: true, type: 'video' },
      { id: 'mod-3', title: 'JavaScript Essentials', duration: '4h', completed: false, type: 'video' },
      { id: 'mod-4', title: 'React Introduction', duration: '5h', completed: false, type: 'video' },
      { id: 'mod-5', title: 'Final Project', duration: '1h', completed: false, type: 'assignment' }
    ]
  },
  {
    id: 'course-2',
    title: 'Data Science with Python',
    description: 'Master data analysis, visualization, and machine learning with Python',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    instructor: 'Dr. Michael Chen',
    instructorId: 'user-3',
    duration: '35 hours',
    level: 'Intermediate',
    price: 129.99,
    rating: 4.9,
    students: 892,
    progress: 30,
    category: 'Data Science',
    isEnrolled: true,
    modules: [
      { id: 'mod-6', title: 'Python Basics', duration: '3h', completed: true, type: 'video' },
      { id: 'mod-7', title: 'NumPy & Pandas', duration: '4h', completed: false, type: 'video' },
      { id: 'mod-8', title: 'Data Visualization', duration: '3h', completed: false, type: 'video' },
      { id: 'mod-9', title: 'Machine Learning', duration: '6h', completed: false, type: 'video' }
    ]
  },
  {
    id: 'course-3',
    title: 'Digital Marketing Masterclass',
    description: 'Complete guide to social media, SEO, and content marketing',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
    instructor: 'Dr. Michael Chen',
    instructorId: 'user-3',
    duration: '25 hours',
    level: 'Beginner',
    price: 79.99,
    rating: 4.7,
    students: 567,
    progress: 80,
    category: 'Marketing',
    isEnrolled: true,
    modules: [
      { id: 'mod-10', title: 'Marketing Fundamentals', duration: '2h', completed: true, type: 'video' },
      { id: 'mod-11', title: 'Social Media Strategy', duration: '3h', completed: true, type: 'video' },
      { id: 'mod-12', title: 'SEO Basics', duration: '2h', completed: true, type: 'video' },
      { id: 'mod-13', title: 'Content Creation', duration: '4h', completed: false, type: 'video' }
    ]
  },
  {
    id: 'course-4',
    title: 'UI/UX Design Principles',
    description: 'Learn design thinking, prototyping, and user experience design',
    thumbnail: 'https://images.unsplash.com/photo-1545235617-7a424c1a60cc?w=400&h=250&fit=crop',
    instructor: 'Sarah Wilson',
    instructorId: 'user-2',
    duration: '30 hours',
    level: 'Intermediate',
    price: 99.99,
    rating: 4.6,
    students: 445,
    category: 'Design',
    isEnrolled: false,
    modules: [
      { id: 'mod-14', title: 'Design Thinking', duration: '2h', completed: false, type: 'video' },
      { id: 'mod-15', title: 'Wireframing', duration: '3h', completed: false, type: 'video' },
      { id: 'mod-16', title: 'Prototyping', duration: '4h', completed: false, type: 'video' }
    ]
  }
];

export const assignments: Assignment[] = [
  {
    id: 'assign-1',
    title: 'Build a Portfolio Website',
    description: 'Create a responsive portfolio website using HTML, CSS, and JavaScript',
    courseId: 'course-1',
    dueDate: '2024-01-15',
    maxPoints: 100,
    status: 'pending',
    submissions: [
      {
        id: 'sub-1',
        studentId: 'user-1',
        studentName: 'Alex Johnson',
        assignmentId: 'assign-1',
        submittedAt: '2024-01-10T10:30:00Z',
        content: 'I have created a responsive portfolio website with modern design...',
        attachments: ['portfolio.zip', 'screenshots.pdf'],
        grade: 95,
        feedback: 'Excellent work! Great attention to detail and clean code.'
      }
    ]
  },
  {
    id: 'assign-2',
    title: 'Data Analysis Project',
    description: 'Analyze the provided dataset and create visualizations using Python',
    courseId: 'course-2',
    dueDate: '2024-01-20',
    maxPoints: 100,
    status: 'submitted'
  },
  {
    id: 'assign-3',
    title: 'Marketing Campaign Design',
    description: 'Design a complete social media marketing campaign for a fictional product',
    courseId: 'course-3',
    dueDate: '2024-01-25',
    maxPoints: 80,
    status: 'graded'
  }
];