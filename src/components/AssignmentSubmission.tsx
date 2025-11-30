import { useState } from "react";
import { Upload, Calendar, Clock, CheckCircle, AlertTriangle, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { toast } from "sonner@2.0.3";

export default function AssignmentSubmission() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submissionText, setSubmissionText] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const assignments = [
    {
      id: 1,
      title: "Physics Lab Report - Motion Analysis",
      course: "Physics 101",
      dueDate: "2025-01-08",
      description: "Analyze the motion data collected during the pendulum experiment and write a comprehensive report.",
      submitted: false,
      daysLeft: 3,
      maxMarks: 50
    },
    {
      id: 2,
      title: "Mathematical Proof Assignment",
      course: "Mathematics",
      dueDate: "2025-01-12",
      description: "Prove the fundamental theorem of calculus using epsilon-delta definition.",
      submitted: false,
      daysLeft: 7,
      maxMarks: 30
    },
    {
      id: 3,
      title: "Chemical Bonding Essay",
      course: "Chemistry",
      dueDate: "2025-01-10",
      description: "Write an essay explaining different types of chemical bonds with real-world examples.",
      submitted: true,
      submittedOn: "2025-01-05",
      grade: "A-",
      maxMarks: 40
    },
    {
      id: 4,
      title: "Algorithm Analysis Project",
      course: "Computer Science",
      dueDate: "2025-01-15",
      description: "Implement and analyze the time complexity of various sorting algorithms.",
      submitted: false,
      daysLeft: 10,
      maxMarks: 60
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmission = () => {
    if (!selectedFile && !submissionText.trim()) {
      toast.error("Please upload a file or enter text submission");
      return;
    }
    
    toast.success("Assignment submitted successfully!");
    setDialogOpen(false);
    setSelectedFile(null);
    setSubmissionText("");
  };

  const getDaysLeftColor = (days: number) => {
    if (days <= 1) return "destructive";
    if (days <= 3) return "secondary";
    return "default";
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Assignments</h2>
        <p className="text-muted-foreground">Submit your assignments and track deadlines</p>
      </div>

      {/* Assignment Cards */}
      <div className="grid gap-4">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className={`${assignment.submitted ? 'border-green-200 bg-green-50/50' : assignment.daysLeft <= 1 ? 'border-yellow-200 bg-yellow-50/50' : ''}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    {assignment.submitted ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : assignment.daysLeft <= 1 ? (
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <FileText className="h-5 w-5 text-blue-500" />
                    )}
                    {assignment.title}
                  </CardTitle>
                  <CardDescription>{assignment.course}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {assignment.submitted ? (
                    <Badge variant="default" className="bg-green-500">
                      Submitted
                    </Badge>
                  ) : (
                    <Badge
  style={{
    backgroundColor: assignment.daysLeft <= 1 ? "#FACC15" : "#FEEBC8",
    color: "#1f1f1f",
    fontWeight: 600,
  }}
>
  {assignment.daysLeft === 0 ? "Due Today" : `${assignment.daysLeft} days left`}
</Badge>

                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{assignment.description}</p>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Due: {assignment.dueDate}
                  </span>
                  <span>Max Marks: {assignment.maxMarks}</span>
                </div>
                {assignment.submitted && (
                  <div className="flex items-center gap-2">
                    <span>Submitted: {assignment.submittedOn}</span>
                    {assignment.grade && (
                      <Badge variant="secondary">Grade: {assignment.grade}</Badge>
                    )}
                  </div>
                )}
              </div>

              {!assignment.submitted && (
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Submit Assignment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Submit Assignment</DialogTitle>
                      <DialogDescription>
                        Upload your assignment file or enter text submission for: {assignment.title}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="file-upload">Upload File</Label>
                        <Input
                          id="file-upload"
                          type="file"
                          accept=".pdf,.doc,.docx,.txt"
                          onChange={handleFileUpload}
                          className="mt-1"
                        />
                        {selectedFile && (
                          <p className="text-sm text-green-600 mt-1">
                            Selected: {selectedFile.name}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="text-submission">Or Enter Text Submission</Label>
                        <Textarea
                          id="text-submission"
                          placeholder="Enter your assignment text here..."
                          value={submissionText}
                          onChange={(e) => setSubmissionText(e.target.value)}
                          rows={6}
                          className="mt-1"
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={handleSubmission} className="flex-1">
                          Submit
                        </Button>
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}