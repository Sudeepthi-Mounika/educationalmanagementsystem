// src/App.tsx
import { useState } from "react";
import LoginPage, { UserInfo } from "./components/LoginPage";
import LMSNavigation from "./components/LMSNavigation";
import Dashboard from "./components/Dashboard";
import AssignmentSubmission from "./components/AssignmentSubmission";
import CoursesView from "./components/CoursesView";
import BooksReferences from "./components/BooksReferences";
import { Toaster } from "./components/ui/sonner";
import Workbooks from "./components/Workbooks";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const handleLogin = (user: UserInfo) => {
    setIsLoggedIn(true);
    setUserInfo(user);
    setCurrentView("dashboard"); // go to dashboard after login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserInfo(null);
    setCurrentView("dashboard");
  };

  const deadlineCount = 3;

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard userRole={userInfo?.role} userName={userInfo?.name} />;

      case "courses":
        return <CoursesView />;

      case "assignments":
        return <AssignmentSubmission />;

      case "library":
        return <BooksReferences />;

      case "workbooks":
        return <Workbooks />; // your updated component

      case "students":
        return (
          <div className="p-6">
            <h2 className="text-3xl font-bold">Student Management</h2>
            <p className="text-muted-foreground">
              Manage students and track progress.
            </p>
          </div>
        );

      case "users":
        return (
          <div className="p-6">
            <h2 className="text-3xl font-bold">User Management</h2>
            <p className="text-muted-foreground">
              Manage students & faculty accounts.
            </p>
          </div>
        );

      case "analytics":
        return (
          <div className="p-6">
            <h2 className="text-3xl font-bold">Analytics</h2>
            <p className="text-muted-foreground">
              View system statistics.
            </p>
          </div>
        );

      case "settings":
        return (
          <div className="p-6">
            <h2 className="text-3xl font-bold">System Settings</h2>
            <p className="text-muted-foreground">
              Configure system preferences.
            </p>
          </div>
        );

      case "profile":
        return (
          <div className="p-6">
            <h2 className="text-3xl font-bold">Profile</h2>

            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">
                {userInfo?.role === "student"
                  ? "Student Information"
                  : userInfo?.role === "faculty"
                  ? "Faculty Information"
                  : "Administrator Information"}
              </h3>

              <p><strong>ID:</strong> {userInfo?.id}</p>
              <p><strong>Name:</strong> {userInfo?.name}</p>
              <p><strong>Role:</strong> {userInfo?.role}</p>

              <button
                onClick={handleLogout}
                className="mt-4 px-4 py-2 bg-destructive text-white rounded"
              >
                Logout
              </button>
            </div>
          </div>
        );

      default:
        return <Dashboard userRole={userInfo?.role} userName={userInfo?.name} />;
    }
  };

  // If not logged in → show login page
  if (!isLoggedIn) {
    return (
      <>
        <LoginPage onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  // If logged in → show LMS
  return (
    <div className="h-screen flex bg-background">
      <LMSNavigation
        currentView={currentView}
        setCurrentView={setCurrentView}
        deadlineCount={deadlineCount}
        userRole={userInfo?.role}
      />

      <main className="flex-1 overflow-auto">{renderCurrentView()}</main>

      <Toaster />
    </div>
  );
}
