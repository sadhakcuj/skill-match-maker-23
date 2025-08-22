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
    <Card className="p-6 bg-white">
      <h2 className="text-xl font-semibold mb-4 text-black">Upload Resume</h2>
      
      {uploadedFile ? (
        <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-black">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-black" />
            <div>
              <p className="font-medium text-black">{uploadedFile.name}</p>
              <p className="text-sm text-black">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={removeFile}>
            <X className="h-4 w-4 text-black" />
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 border-black",
            isDragActive || dragActive
              ? "bg-white scale-105"
              : "hover:bg-white"
          )}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-black mb-4" />
          <h3 className="text-lg font-medium mb-2 text-black">
            {isDragActive ? 'Drop your resume here' : 'Upload your resume'}
          </h3>
          <p className="text-black mb-4">
            Drag and drop your resume, or click to browse
          </p>
          <p className="text-sm text-black">
            Supports PDF, DOC, and DOCX files
          </p>
        </div>
      )}
    </Card>
  );
};
