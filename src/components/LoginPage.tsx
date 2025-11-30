// src/LoginPage.tsx
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { BookOpen, User, Lock } from "lucide-react";

export interface UserInfo {
  id: string;
  name: string;
  role: "student" | "faculty" | "admin";
}

interface LoginPageProps {
  onLogin: (userInfo: UserInfo) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] =
    useState<"student" | "faculty" | "admin">("student");
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Try to find stored users and validate password
    try {
      const raw = localStorage.getItem("lms_users");
      const users: Array<any> = raw ? JSON.parse(raw) : [];
      const found = users.find((u) => u.id === userId && u.role === userRole);

      if (found) {
        if (found.password === password) {
          onLogin({ id: found.id, name: found.name, role: found.role });
        } else {
          alert("Incorrect password. If you don't have an account, please sign up.");
        }
      } else {
        // No stored user — prompt to sign up
        const wantSignup = confirm(
          'No account found for this User ID. Would you like to sign up now?'
        );
        if (wantSignup) setIsSignup(true);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while accessing stored users.");
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !userId || !password) {
      alert("Please fill all fields to sign up.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const raw = localStorage.getItem("lms_users");
      const users: Array<any> = raw ? JSON.parse(raw) : [];
      const exists = users.find((u) => u.id === userId && u.role === userRole);
      if (exists) {
        alert("An account with this User ID and role already exists. Please login.");
        setIsSignup(false);
        return;
      }

      const newUser = { id: userId, name, role: userRole, password };
      users.push(newUser);
      localStorage.setItem("lms_users", JSON.stringify(users));

      // Auto-login after signup
      onLogin({ id: newUser.id, name: newUser.name, role: newUser.role });
    } catch (err) {
      console.error(err);
      alert("Failed to create account.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/hand-painted-watercolor-abstract-watercolor-background_23-2148999935.jpg?semt=ais_hybrid&w=740')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-5xl flex items-center gap-0">
        
        {/* LEFT LOGO SECTION */}
        <div
          style={{
            flex: 0.9,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            background: "rgba(200,170,255,0.40)",
            padding: "30px 20px",
            borderRadius: "20px 0 0 20px",
            height: "430px",
          }}
        >
          {/* IMAGE FROM INTERNET */}
          <img
            src="https://static.vecteezy.com/system/resources/previews/032/178/587/non_2x/illustration-of-teacher-and-students-talking-vector.jpg"
            alt="Teacher Student"
            style={{
              width: "150px",
              borderRadius: "10px",
              marginBottom: "15px",
            }}
          />

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 90,
                height: 90,
                borderRadius: "22px",
                background: "rgba(180,140,255,0.55)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                marginBottom: 12,
                boxShadow: "0 4px 15px rgba(120,60,255,0.2)",
              }}
            >
              <BookOpen className="h-10 w-10 text-white" />
            </div>

            {/* Changed Text */}
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "#3d2e57" }}>
              LMS Portal Login
            </h2>

            <p style={{ marginTop: 6, fontSize: 14, color: "#4a4a4a" }}>
              Access courses, materials and updates easily.
            </p>
          </div>
        </div>

        {/* DIVIDER LINE */}
        <div
          style={{
            width: "2px",
            height: "380px",
            background: "rgba(180,140,255,0.60)",
            margin: "0 20px",
            borderRadius: 2,
          }}
        />

        {/* LOGIN BOX */}
        <div style={{ flex: 1.3 }}>
          <Card
            className="shadow-xl"
            style={{
              borderRadius: 20,
              padding: "5px 5px",
              border: "1px solid rgba(167,139,250,0.12)",
              background: "rgba(255,255,255,0.90)", // Slight transparency
              width: 420,
              margin: "0 auto",
            }}
          >
            <CardHeader>
              <CardTitle className="text-center text-xl">
                {isSignup ? "Create Account" : "Welcome Back"}
              </CardTitle>
              <CardDescription className="text-center">
                {isSignup ? "Sign up to get started" : "Login to continue"}
              </CardDescription>

              <div style={{ textAlign: "center", marginTop: 8 }}>
                {isSignup ? (
                  <button
                    type="button"
                    onClick={() => setIsSignup(false)}
                    className="text-sm text-purple-600 underline"
                  >
                    Already have an account? Login
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsSignup(true)}
                    className="text-sm text-purple-600 underline"
                  >
                    Don't have an account? Sign up
                  </button>
                )}
              </div>
            </CardHeader>

            <CardContent>
              {isSignup ? (
                <form onSubmit={handleSignup} className="space-y-4">
                  {/* NAME */}
                  <div>
                    <Label>Full Name</Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Enter full name"
                      className="h-12 rounded-xl"
                    />
                  </div>

                  {/* USER ID */}
                  <div>
                    <Label>User ID</Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
                      <Input
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                        placeholder="Choose a user ID"
                        className="pl-10 h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* ROLE */}
                  <div>
                    <Label>Role</Label>
                    <Select
                      value={userRole}
                      onValueChange={(e: any) => setUserRole(e)}
                    >
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Choose role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="faculty">Faculty</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <Label>Password</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Create password"
                        className="pl-10 h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* CONFIRM PASSWORD */}
                  <div>
                    <Label>Confirm Password</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
                      <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Confirm password"
                        className="pl-10 h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 rounded-xl"
                    style={{
                      background: "linear-gradient(90deg,#6ee7b7,#34d399)",
                      border: "none",
                    }}
                  >
                    Sign Up
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* USER ID */}
                <div>
                  <Label>User ID</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
                    <Input
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      required
                      placeholder="Enter user ID"
                      className="pl-10 h-12 rounded-xl"
                    />
                  </div>
                </div>

                {/* ROLE */}
                <div>
                  <Label>Role</Label>
                  <Select
                    value={userRole}
                    onValueChange={(e: any) => setUserRole(e)}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Choose role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="faculty">Faculty</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* PASSWORD */}
                <div>
                  <Label>Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter password"
                      className="pl-10 h-12 rounded-xl"
                    />
                  </div>
                </div>

                {/* LOGIN BUTTON */}
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl"
                  style={{
                    background: "linear-gradient(90deg,#b892ff,#a87bff)",
                    border: "none",
                  }}
                >
                  Login
                </Button>

                {/* HELP LINE */}
                <p className="text-center text-sm text-gray-500 mt-2">
                  Need help? Contact your IT support team anytime for login
                  issues.
                </p>
              </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
