'use client';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import React from 'react';

const DownloadButton = ({ fileLink }: { fileLink: string }) => {
    const handleDownload = () => {
        window.open(fileLink, '_blank');
    };
    
    return (
        <Button
            onClick={handleDownload}
            variant={'outline'}
            className="w-full md:w-auto bg-transparent"
        >
            <Download className="h-4 w-4 " />
            Download the book
        </Button>
    );
};

// border-emerald-500/70 text-emerald-400/90 hover:bg-emerald-900/10

export default DownloadButton;