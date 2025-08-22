import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResumeUpload } from '@/components/ResumeUpload';
import { JobDescriptionInput } from '@/components/JobDescriptionInput';
import { AnalysisResults } from '@/components/AnalysisResults';
import { Zap, Target, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  // Mock analysis function - this would connect to your backend
  const analyzeResume = async () => {
    if (!uploadedFile || !jobDescription.trim()) {
      toast({
        title: "Missing Information",
        description: "Please upload a resume and enter a job description.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Mock delay for analysis
    setTimeout(() => {
      // Mock results - this would come from your backend API
      const mockResults = {
        score: 75,
        matchedSkills: ["JavaScript", "React", "Node.js", "Python", "SQL", "Git"],
        missingSkills: ["Docker", "Kubernetes", "AWS", "TypeScript"],
        suggestions: [
          "Consider adding Docker experience to strengthen DevOps skills",
          "TypeScript knowledge would enhance your JavaScript expertise", 
          "Cloud experience with AWS would make you more competitive",
          "Highlight your project management experience more prominently"
        ]
      };
      
      setAnalysisResults(mockResults);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `Your resume scored ${mockResults.score}% compatibility!`
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Target className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-accent bg-clip-text text-transparent">
              Resume Analyzer
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your resume and paste a job description to get personalized insights and improve your chances of landing the job.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center">
            <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Instant Analysis</h3>
            <p className="text-muted-foreground">Get immediate feedback on how well your resume matches the job requirements.</p>
          </Card>
          <Card className="p-6 text-center">
            <Target className="h-12 w-12 text-accent-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Skills Matching</h3>
            <p className="text-muted-foreground">See exactly which skills you have and which ones you need to develop.</p>
          </Card>
          <Card className="p-6 text-center">
            <BarChart3 className="h-12 w-12 text-success mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Personalized Tips</h3>
            <p className="text-muted-foreground">Receive actionable recommendations to improve your resume.</p>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <ResumeUpload 
              onFileUploaded={setUploadedFile} 
              uploadedFile={uploadedFile} 
            />
            <JobDescriptionInput 
              jobDescription={jobDescription}
              onJobDescriptionChange={setJobDescription}
            />
          </div>

          <div>
            {!analysisResults && (
              <Card className="p-8 text-center">
                <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">Ready to Analyze</h3>
                <p className="text-muted-foreground mb-6">
                  Upload your resume and add a job description to get started with the analysis.
                </p>
                <Button 
                  onClick={analyzeResume} 
                  disabled={!uploadedFile || !jobDescription.trim() || isAnalyzing}
                  size="lg"
                  className="bg-gradient-primary hover:opacity-90"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
                </Button>
              </Card>
            )}

            {analysisResults && (
              <AnalysisResults {...analysisResults} />
            )}
          </div>
        </div>

        {/* Backend Integration Note */}
        {(uploadedFile || jobDescription) && !analysisResults && (
          <Card className="p-6 bg-accent/50 border-accent">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-accent-foreground rounded-full mt-2" />
              <div>
                <h4 className="font-medium text-accent-foreground mb-1">Backend Integration Required</h4>
                <p className="text-sm text-muted-foreground">
                  To enable resume parsing and real skills analysis, connect this app to Supabase for backend functionality.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;