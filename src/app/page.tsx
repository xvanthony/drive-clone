'use client';

import { useState } from 'react';
import { Folder, File, Upload, ChevronRight, Home, ArrowLeft } from 'lucide-react';
import { Button } from '~/components/ui/button';

type FileItem = {
  id: string;
  name: string;
  type: 'file' | 'folder';
  url?: string;
  modifiedDate: string;
  size?: string;
};

type FolderStructure = Record<string, FileItem[]>;

const mockData: FolderStructure = {
  root: [
    {
      id: 'folder-1',
      name: 'Projects',
      type: 'folder',
      modifiedDate: 'Nov 10, 2024',
    },
    {
      id: 'folder-2',
      name: 'Personal',
      type: 'folder',
      modifiedDate: 'Nov 8, 2024',
    },
    {
      id: 'file-1',
      name: 'Budget 2025.xlsx',
      type: 'file',
      url: 'https://www.example.com/budget-2025.xlsx',
      modifiedDate: 'Nov 12, 2024',
      size: '2.4 MB',
    },
    {
      id: 'file-2',
      name: 'Presentation.pptx',
      type: 'file',
      url: 'https://www.example.com/presentation.pptx',
      modifiedDate: 'Nov 11, 2024',
      size: '5.1 MB',
    },
  ],
  'folder-1': [
    {
      id: 'file-3',
      name: 'Design System.figma',
      type: 'file',
      url: 'https://www.figma.com',
      modifiedDate: 'Nov 9, 2024',
      size: '1.8 MB',
    },
    {
      id: 'folder-3',
      name: 'Web App',
      type: 'folder',
      modifiedDate: 'Nov 7, 2024',
    },
    {
      id: 'file-4',
      name: 'README.md',
      type: 'file',
      url: 'https://www.example.com/readme.md',
      modifiedDate: 'Nov 6, 2024',
      size: '4.2 KB',
    },
  ],
  'folder-2': [
    {
      id: 'file-5',
      name: 'Travel Plans.docx',
      type: 'file',
      url: 'https://www.example.com/travel-plans.docx',
      modifiedDate: 'Nov 5, 2024',
      size: '156 KB',
    },
    {
      id: 'file-6',
      name: 'Photos.zip',
      type: 'file',
      url: 'https://www.example.com/photos.zip',
      modifiedDate: 'Nov 3, 2024',
      size: '245 MB',
    },
  ],
  'folder-3': [
    {
      id: 'file-7',
      name: 'app.tsx',
      type: 'file',
      url: 'https://www.example.com/app.tsx',
      modifiedDate: 'Nov 10, 2024',
      size: '12.3 KB',
    },
    {
      id: 'file-8',
      name: 'styles.css',
      type: 'file',
      url: 'https://www.example.com/styles.css',
      modifiedDate: 'Nov 8, 2024',
      size: '8.7 KB',
    },
  ],
};

export default function GoogleDriveClone() {
  const [currentFolder, setCurrentFolder] = useState('root');
  const [breadcrumb, setBreadcrumb] = useState(['My Drive']);

  const items = mockData[currentFolder] ?? [];

  const openFolder = (folderId: string, folderName: string) => {
    setCurrentFolder(folderId);
    setBreadcrumb([...breadcrumb, folderName]);
  };

  const goBack = (index: number) => {
    if (index === 0) {
      setCurrentFolder('root');
      setBreadcrumb(['My Drive']);
    } else {
      const newBreadcrumb = breadcrumb.slice(0, index + 1);
      setBreadcrumb(newBreadcrumb);
      
      let parentId = 'root';
      if (index > 0) {
        parentId = mockData[parentId]?.find(
          (item) => item.name === newBreadcrumb[1]
        )?.id ?? 'root';
        for (let i = 2; i < newBreadcrumb.length; i++) {
          parentId =
            mockData[parentId]?.find((item) => item.name === newBreadcrumb[i])
              ?.id ?? 'root';
        }
      }
      setCurrentFolder(parentId);
    }
  };

  const handleBack = () => {
    if (breadcrumb.length > 1) {
      goBack(breadcrumb.length - 2);
    }
  };

  return (
    <div className="dark min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-600 p-2">
              <span className="text-sm font-bold text-white">GD</span>
            </div>
            <h1 className="text-xl font-semibold text-foreground">Drive</h1>
          </div>
          <Button
            size="sm"
            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Upload className="h-4 w-4" />
            Upload
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-4 flex items-center gap-2">
          <button
            onClick={handleBack}
            disabled={breadcrumb.length === 1}
            className="p-2 rounded-lg hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Go back"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          {breadcrumb.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {index === 0 && (
                <button
                  onClick={() => goBack(0)}
                  className="flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  <Home className="h-4 w-4" />
                  {item}
                </button>
              )}
              {index > 0 && (
                <>
                  <ChevronRight className="h-4 w-4" />
                  <button
                    onClick={() => goBack(index)}
                    className="hover:text-foreground transition-colors"
                  >
                    {item}
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="border border-border rounded-lg overflow-hidden">
          {items.length > 0 ? (
            <div className="divide-y divide-border">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-4 px-6 py-3 transition-colors ${
                    item.type === 'folder'
                      ? 'hover:bg-secondary cursor-pointer'
                      : 'hover:bg-secondary'
                  }`}
                  onClick={() => {
                    if (item.type === 'folder') {
                      openFolder(item.id, item.name);
                    }
                  }}
                >
                  {/* Icon */}
                  {item.type === 'folder' ? (
                    <div className="flex-shrink-0">
                      <Folder className="h-5 w-5 text-blue-400" />
                    </div>
                  ) : (
                    <div className="flex-shrink-0">
                      <File className="h-5 w-5 text-amber-400" />
                    </div>
                  )}

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    {item.type === 'folder' ? (
                      <div className="font-medium text-foreground hover:underline">
                        {item.name}
                      </div>
                    ) : (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-foreground hover:text-blue-400 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.name}
                      </a>
                    )}
                  </div>

                  {/* Size */}
                  <div className="text-sm text-muted-foreground whitespace-nowrap">
                    {item.size}
                  </div>

                  {/* Modified Date */}
                  <div className="text-sm text-muted-foreground whitespace-nowrap">
                    {item.modifiedDate}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border-b border-border bg-card/50 py-12 text-center">
              <Folder className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
              <p className="text-muted-foreground">
                This folder is empty. Upload files to get started.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
