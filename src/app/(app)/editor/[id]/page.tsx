'use client';

import { SignatureBuilder } from '@/components/SignatureBuilder';
import { useParams } from 'next/navigation';

export default function EditorPage() {
    const params = useParams();
    const id = params?.id as string;

    return (
        <div className="h-[calc(100vh-64px)] md:h-screen bg-background">
            {/* 
        Pass the ID to SignatureBuilder.
        If ID exists, Builder should fetch data. 
      */}
            <SignatureBuilder initialSignatureId={id} />
        </div>
    );
}
