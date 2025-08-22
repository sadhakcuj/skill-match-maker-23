import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

interface AnalysisResultsProps {
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  suggestions: string[];
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  score,
  matchedSkills,
  missingSkills,
  suggestions
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'destructive';
  };

  const getScoreText = (score: number) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    return 'Needs Improvement';
  };

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card className="p-6 bg-gradient-primary">
        <div className="text-center">
          <div className="text-4xl font-bold text-primary-foreground mb-2">
            {score}%
          </div>
          <div className="text-lg font-semibold text-primary-foreground/90 mb-4">
            {getScoreText(score)}
          </div>
          <Progress value={score} className="w-full mb-4" />
          <p className="text-sm text-primary-foreground/80">
            Resume compatibility with job requirements
          </p>
        </div>
      </Card>

      {/* Matched Skills */}
      {matchedSkills.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="h-5 w-5 text-success" />
            <h3 className="text-lg font-semibold text-card-foreground">
              Matched Skills ({matchedSkills.length})
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {matchedSkills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="bg-success/10 text-success border-success/20">
                {skill}
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Missing Skills */}
      {missingSkills.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="h-5 w-5 text-warning" />
            <h3 className="text-lg font-semibold text-card-foreground">
              Skills to Develop ({missingSkills.length})
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {missingSkills.map((skill, index) => (
              <Badge key={index} variant="outline" className="border-warning/50 text-warning">
                {skill}
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-accent-foreground" />
            <h3 className="text-lg font-semibold text-card-foreground">
              Recommendations
            </h3>
          </div>
          <ul className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-accent-foreground rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{suggestion}</p>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};