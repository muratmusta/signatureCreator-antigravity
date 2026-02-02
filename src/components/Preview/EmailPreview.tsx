'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Monitor, Smartphone, Mail } from 'lucide-react';
import { PreviewPanel } from '@/components/Preview/PreviewPanel';

type EmailClient = 'gmail' | 'outlook' | 'apple' | 'mobile';

interface EmailPreviewProps {
    onClose: () => void;
}

export const EmailPreview: React.FC<EmailPreviewProps> = ({ onClose }) => {
    const [selectedClient, setSelectedClient] = useState<EmailClient>('gmail');

    const clients = [
        { id: 'gmail' as EmailClient, name: 'Gmail', icon: Mail, bgColor: 'bg-red-50', borderColor: 'border-red-200' },
        { id: 'outlook' as EmailClient, name: 'Outlook', icon: Mail, bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
        { id: 'apple' as EmailClient, name: 'Apple Mail', icon: Mail, bgColor: 'bg-gray-50', borderColor: 'border-gray-200' },
        { id: 'mobile' as EmailClient, name: 'Mobile', icon: Smartphone, bgColor: 'bg-green-50', borderColor: 'border-green-200' },
    ];

    const getClientStyles = () => {
        switch (selectedClient) {
            case 'gmail':
                return {
                    container: 'max-w-4xl mx-auto bg-white',
                    header: 'bg-red-500 text-white p-4 text-sm font-medium',
                    body: 'p-6 bg-white',
                };
            case 'outlook':
                return {
                    container: 'max-w-4xl mx-auto bg-white',
                    header: 'bg-blue-600 text-white p-4 text-sm font-medium',
                    body: 'p-6 bg-white',
                };
            case 'apple':
                return {
                    container: 'max-w-4xl mx-auto bg-white',
                    header: 'bg-gray-100 text-gray-800 p-4 text-sm font-medium border-b border-gray-200',
                    body: 'p-6 bg-white',
                };
            case 'mobile':
                return {
                    container: 'max-w-md mx-auto bg-white',
                    header: 'bg-gray-800 text-white p-3 text-xs font-medium',
                    body: 'p-4 bg-white',
                };
        }
    };

    const styles = getClientStyles();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-6xl h-[90vh] bg-card rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <div>
                        <h2 className="text-2xl font-bold">Email İstemci Önizleme</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            İmzanızın farklı email istemcilerinde nasıl göründüğünü görün
                        </p>
                    </div>
                    <Button variant="ghost" onClick={onClose}>
                        Kapat
                    </Button>
                </div>

                {/* Client Selector */}
                <div className="flex gap-2 p-4 border-b border-border bg-muted/30">
                    {clients.map((client) => {
                        const Icon = client.icon;
                        return (
                            <Button
                                key={client.id}
                                variant={selectedClient === client.id ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedClient(client.id)}
                                className="gap-2"
                            >
                                <Icon className="w-4 h-4" />
                                {client.name}
                            </Button>
                        );
                    })}
                </div>

                {/* Preview Area */}
                <div className="flex-1 overflow-auto p-8 bg-muted/20">
                    <div className={styles.container + ' shadow-xl rounded-lg overflow-hidden border border-border'}>
                        {/* Mock Email Header */}
                        <div className={styles.header}>
                            <div className="flex items-center justify-between">
                                <span>Yeni Mesaj</span>
                                <span className="text-xs opacity-75">Şimdi</span>
                            </div>
                            <div className="mt-2 text-xs opacity-90">
                                <div>Kime: recipient@example.com</div>
                                <div className="mt-1">Konu: Merhaba!</div>
                            </div>
                        </div>

                        {/* Mock Email Body */}
                        <div className={styles.body}>
                            <div className="mb-6 text-sm text-gray-700">
                                <p>Merhaba,</p>
                                <p className="mt-4">
                                    Bu bir örnek email mesajıdır. Aşağıda imzanızın nasıl göründüğünü görebilirsiniz.
                                </p>
                                <p className="mt-4">İyi günler,</p>
                            </div>

                            {/* Signature Preview */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <PreviewPanel />
                            </div>
                        </div>
                    </div>

                    {/* Info Text */}
                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        <p>
                            Bu bir simülasyondur. Gerçek email istemcilerinde küçük farklılıklar olabilir.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
