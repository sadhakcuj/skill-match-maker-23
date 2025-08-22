import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResumeUploadProps {
  onFileUploaded: (file: File) => void;
  uploadedFile: File | null;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({ onFileUploaded, uploadedFile }) => {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileUploaded(acceptedFiles[0]);
      }
    },
    [onFileUploaded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc']
    },
    maxFiles: 1,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
    onDropAccepted: () => setDragActive(false),
    onDropRejected: () => setDragActive(false)
  });

  const removeFile = () => {
    onFileUploaded(null as any);
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-card-foreground">Upload Resume</h2>
      
      {uploadedFile ? (
        <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-accent-foreground" />
            <div>
              <p className="font-medium text-accent-foreground">{uploadedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={removeFile}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200",
            isDragActive || dragActive
              ? "border-primary bg-primary/5 scale-105"
              : "border-border hover:border-primary hover:bg-accent/50"
          )}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2 text-foreground">
            {isDragActive ? 'Drop your resume here' : 'Upload your resume'}
          </h3>
          <p className="text-muted-foreground mb-4">
            Drag and drop your resume, or click to browse
          </p>
          <p className="text-sm text-muted-foreground">
            Supports PDF, DOC, and DOCX files
          </p>
        </div>
      )}
    </Card>
  );
};