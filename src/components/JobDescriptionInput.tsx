import React from 'react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Briefcase } from 'lucide-react';

interface JobDescriptionInputProps {
  jobDescription: string;
  onJobDescriptionChange: (value: string) => void;
}

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  jobDescription,
  onJobDescriptionChange
}) => {
  return (
    <Card className="p-6 bg-white">
      <div className="flex items-center space-x-2 mb-4">
        <Briefcase className="h-5 w-5 text-black" />
        <h2 className="text-xl font-semibold text-black">Job Description</h2>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="job-description" className="text-sm font-medium text-black">
          Paste the job description you want to match against
        </Label>
        <Textarea
          id="job-description"
          placeholder="Paste the complete job description here including required skills, qualifications, and responsibilities..."
          value={jobDescription}
          onChange={(e) => onJobDescriptionChange(e.target.value)}
          className="min-h-[200px] resize-none bg-white text-black border-white"
        />
        <p className="text-xs text-black">
          The more detailed the job description, the better the analysis will be.
        </p>
      </div>
    </Card>
  );
};
