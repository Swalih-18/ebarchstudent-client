'use client';
import { Button } from '@/components/ui/button';
import React from 'react';

const DownloadButton = ({ fileLink }: { fileLink: string }) => {
    const handleDownload = () => {
        window.open(fileLink, '_blank');
    };

    return (
        <Button
            onClick={handleDownload}
            variant={'outline'}
            className="w-full md:w-auto"
        >
            Download the research paper
        </Button>
    );
};

export default DownloadButton;
