import React, { useState, useEffect } from 'react';
import { Play, BookOpen, Clock, CheckCircle, User, Star, Calendar, BarChart3, Award } from 'lucide-react';

const ELearningPlatform = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [progress, setProgress] = useState({});
  const [completedLessons, setCompletedLessons] = useState({});

  // Sample course data
  const courses = [
    {
      id: 1,
      title: "React Fundamentals",
      instructor: "Sarah Johnson",
      duration: "8 hours",
      rating: 4.8,
      students: 1250,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
      description: "Master the fundamentals of React including components, state, and props.",
      lessons: [
        { id: 1, title: "Introduction to React", duration: "15:30", videoUrl: "https://www.youtube.com/embed/w7ejDZ8SWv8" },
        { id: 2, title: "Components and JSX", duration: "22:45", videoUrl: "https://www.youtube.com/embed/Tn6-PIqc4UM" },
        { id: 3, title: "State and Props", duration: "18:20", videoUrl: "https://www.youtube.com/embed/hQAHSlTtcmY" },
        { id: 4, title: "Event Handling", duration: "16:10", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk" }
      ]
    },
    {
      id: 2,
      title: "JavaScript ES6+",
      instructor: "Mike Chen",
      duration: "12 hours",
      rating: 4.9,
      students: 890,
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=200&fit=crop",
      description: "Advanced JavaScript concepts including arrow functions, destructuring, and async/await.",
      lessons: [
        { id: 1, title: "Arrow Functions", duration: "12:15", videoUrl: "https://www.youtube.com/embed/h33Srr5J9nY" },
        { id: 2, title: "Destructuring", duration: "19:30", videoUrl: "https://www.youtube.com/embed/NIq3qLaHCIs" },
        { id: 3, title: "Promises and Async/Await", duration: "25:45", videoUrl: "https://www.youtube.com/embed/PoRJizFvM7s" },
        { id: 4, title: "Modules and Imports", duration: "14:20", videoUrl: "https://www.youtube.com/embed/cRHQNNcYf6s" }
      ]
    },
    {
      id: 3,
      title: "CSS Grid & Flexbox",
      instructor: "Emma Davis",
      duration: "6 hours",
      rating: 4.7,
      students: 567,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
      description: "Master modern CSS layout techniques with Grid and Flexbox.",
      lessons: [
        { id: 1, title: "Flexbox Basics", duration: "20:15", videoUrl: "https://www.youtube.com/embed/JJSoEo8JSnc" },
        { id: 2, title: "CSS Grid Fundamentals", duration: "28:30", videoUrl: "https://www.youtube.com/embed/jV8B24rSN5o" },
        { id: 3, title: "Responsive Design", duration: "22:45", videoUrl: "https://www.youtube.com/embed/srvUrASNdHk" },
        { id: 4, title: "Advanced Layouts", duration: "18:50", videoUrl: "https://www.youtube.com/embed/68O6eOGAGqA" }
      ]
    }
  ];

  // Initialize progress
  useEffect(() => {
    const savedProgress = {};
    const savedCompletedLessons = {};
    courses.forEach(course => {
      savedProgress[course.id] = 0;
      savedCompletedLessons[course.id] = [];
    });
    setProgress(savedProgress);
    setCompletedLessons(savedCompletedLessons);
  }, []);

  const markLessonComplete = (courseId, lessonId) => {
    setCompletedLessons(prev => {
      const courseCompletedLessons = prev[courseId] || [];
      if (!courseCompletedLessons.includes(lessonId)) {
        const updatedLessons = [...courseCompletedLessons, lessonId];
        const course = courses.find(c => c.id === courseId);
        const progressPercentage = (updatedLessons.length / course.lessons.length) * 100;
        
        setProgress(prevProgress => ({
          ...prevProgress,
          [courseId]: Math.round(progressPercentage)
        }));

        return {
          ...prev,
          [courseId]: updatedLessons
        };
      }
      return prev;
    });
  };

  const CourseCard = ({ course }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-sm">
          <Clock className="inline w-4 h-4 mr-1" />
          {course.duration}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium">{course.rating}</span>
          <span className="text-gray-500 text-sm">({course.students} students)</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{course.description}</p>
        
        <div className="flex items-center gap-2 mb-4">
          <User className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{course.instructor}</span>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm font-medium text-blue-600">{progress[course.id] || 0}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress[course.id] || 0}%` }}
            ></div>
          </div>
        </div>

        <button
          onClick={() => {
            setSelectedCourse(course);
            setCurrentLesson(0);
            setActiveTab('video');
          }}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4" />
          {progress[course.id] > 0 ? 'Continue Learning' : 'Start Course'}
        </button>
      </div>
    </div>
  );

  const VideoPlayer = () => {
    if (!selectedCourse) return null;
    
    const lesson = selectedCourse.lessons[currentLesson];
    const isCompleted = completedLessons[selectedCourse.id]?.includes(lesson.id);

    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
          <h2 className="text-2xl font-bold mb-2">{selectedCourse.title}</h2>
          <p className="opacity-90">Lesson {currentLesson + 1}: {lesson.title}</p>
        </div>

        <div className="aspect-video bg-black">
          <iframe
            src={lesson.videoUrl}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Duration: {lesson.duration}</span>
            </div>
            <button
              onClick={() => markLessonComplete(selectedCourse.id, lesson.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isCompleted 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              {isCompleted ? 'Completed' : 'Mark Complete'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
              disabled={currentLesson === 0}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
            >
              Previous Lesson
            </button>
            <button
              onClick={() => setCurrentLesson(Math.min(selectedCourse.lessons.length - 1, currentLesson + 1))}
              disabled={currentLesson === selectedCourse.lessons.length - 1}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              Next Lesson
            </button>
          </div>
        </div>

        <div className="border-t p-6">
          <h3 className="text-lg font-semibold mb-4">Course Lessons</h3>
          <div className="space-y-2">
            {selectedCourse.lessons.map((lesson, index) => {
              const isCurrentLesson = index === currentLesson;
              const isLessonCompleted = completedLessons[selectedCourse.id]?.includes(lesson.id);
              
              return (
                <div
                  key={lesson.id}
                  onClick={() => setCurrentLesson(index)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    isCurrentLesson 
                      ? 'bg-blue-50 border-l-4 border-blue-500' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    isLessonCompleted 
                      ? 'bg-green-500 text-white' 
                      : isCurrentLesson 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {isLessonCompleted ? <CheckCircle className="w-4 h-4" /> : index + 1}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${isCurrentLesson ? 'text-blue-700' : 'text-gray-800'}`}>
                      {lesson.title}
                    </p>
                    <p className="text-sm text-gray-500">{lesson.duration}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const ProgressDashboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-xl">
        <h2 className="text-3xl font-bold mb-2">Learning Progress</h2>
        <p className="opacity-90">Track your journey to mastery</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{courses.length}</p>
              <p className="text-gray-600">Total Courses</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {Object.values(completedLessons).reduce((total, lessons) => total + lessons.length, 0)}
              </p>
              <p className="text-gray-600">Lessons Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {Math.round(Object.values(progress).reduce((sum, p) => sum + p, 0) / courses.length)}%
              </p>
              <p className="text-gray-600">Average Progress</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-4">Course Progress Details</h3>
        <div className="space-y-4">
          {courses.map(course => (
            <div key={course.id} className="border-b pb-4 last:border-b-0">
              <div className="flex items-center gap-4 mb-2">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{course.title}</h4>
                  <p className="text-sm text-gray-600">by {course.instructor}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">{progress[course.id] || 0}%</p>
                  <p className="text-sm text-gray-500">
                    {completedLessons[course.id]?.length || 0}/{course.lessons.length} lessons
                  </p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress[course.id] || 0}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-800">EduPlatform</h1>
            </div>
            
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('courses')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'courses'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Courses
              </button>
              <button
                onClick={() => setActiveTab('progress')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'progress'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Progress
              </button>
              {selectedCourse && (
                <button
                  onClick={() => setActiveTab('video')}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    activeTab === 'video'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Video Player
                </button>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'courses' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Explore Courses</h2>
              <p className="text-gray-600">Discover new skills and advance your career</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'progress' && <ProgressDashboard />}

        {activeTab === 'video' && selectedCourse && <VideoPlayer />}
      </main>
    </div>
  );
};

export default ELearningPlatform;