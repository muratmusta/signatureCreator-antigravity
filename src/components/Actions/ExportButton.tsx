'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileDown, Loader2, FileImage, FileType, Code, QrCode } from 'lucide-react';
import { generateVCard, generateQRCode } from '@/utils/vcard';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'sonner';
import { useSignature } from '@/context/SignatureContext';
import { renderSignatureToHtml } from '@/utils/renderSignature';

interface ExportButtonProps {
    targetElementId?: string;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ targetElementId = 'signature-preview' }) => {
    const { data, selectedTemplate } = useSignature();
    const [exporting, setExporting] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const exportToHTML = async () => {
        setExporting(true);
        setShowMenu(false);

        try {
            const htmlContent = await renderSignatureToHtml(selectedTemplate, data);
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `signature-${data.fullName.replace(/\s+/g, '-').toLowerCase() || 'new'}.html`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            toast.success('HTML olarak indirildi!');
        } catch (error) {
            console.error('HTML export error:', error);
            toast.error('HTML oluşturulurken hata oluştu');
        } finally {
            setExporting(false);
        }
    };

    const exportToPNG = async () => {
        setExporting(true);
        setShowMenu(false);

        try {
            const element = document.getElementById(targetElementId);
            if (!element) {
                toast.error('Önizleme bulunamadı');
                return;
            }

            const canvas = await html2canvas(element, {
                backgroundColor: '#ffffff',
                scale: 2,
                logging: false,
                useCORS: true,
            });

            canvas.toBlob((blob) => {
                if (!blob) {
                    toast.error('PNG oluşturulamadı');
                    return;
                }

                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `signature-${Date.now()}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);

                toast.success('PNG olarak indirildi!');
            }, 'image/png');
        } catch (error) {
            console.error('PNG export error:', error);
            toast.error('PNG oluşturulurken hata oluştu');
        } finally {
            setExporting(false);
        }
    };

    const exportToPDF = async () => {
        setExporting(true);
        setShowMenu(false);

        try {
            const element = document.getElementById(targetElementId);
            if (!element) {
                toast.error('Önizleme bulunamadı');
                return;
            }

            const canvas = await html2canvas(element, {
                backgroundColor: '#ffffff',
                scale: 2,
                logging: false,
                useCORS: true,
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            const imgWidth = 190;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
            pdf.save(`signature-${Date.now()}.pdf`);

            toast.success('PDF olarak indirildi!');
        } catch (error) {
            console.error('PDF export error:', error);
            toast.error('PDF oluşturulurken hata oluştu');
        } finally {
            setExporting(false);
        }
    };

    const exportToVCard = async () => {
        setExporting(true);
        setShowMenu(false);

        try {
            const vCardContent = generateVCard(data);
            const qrCodeUrl = await generateQRCode(vCardContent);

            if (qrCodeUrl) {
                const link = document.createElement('a');
                link.href = qrCodeUrl;
                link.download = `vcard-qr-${Date.now()}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                toast.success('vCard QR Kodu indirildi!');
            }
        } catch (error) {
            console.error('vCard export error:', error);
            toast.error('Kod oluşturulamadı');
        } finally {
            setExporting(false);
        }
    };

    return (
        <div className="relative">
            <Button
                variant="default"
                size="lg"
                className="gap-2.5 h-11 px-6 rounded-2xl font-black text-[10px] tracking-[0.15em] transition-all active:scale-95 disabled:opacity-70 shadow-glow group"
                onClick={() => setShowMenu(!showMenu)}
                disabled={exporting}
            >
                {exporting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <FileDown className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                )}
                DIŞA AKTAR
            </Button>

            {showMenu && !exporting && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowMenu(false)}
                    />

                    <div className="absolute right-0 top-full mt-3 w-72 bg-card border border-border rounded-[2rem] shadow-glow-sm z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-4 bg-muted/20 border-b border-border">
                            <span className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase px-2">Format Seçin</span>
                        </div>

                        <div className="p-3 space-y-2">
                            <button
                                onClick={exportToHTML}
                                className="w-full p-3 rounded-2xl text-left hover:bg-primary/10 transition-all flex items-center gap-4 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all group-hover:scale-105">
                                    <Code className="w-5 h-5 text-primary" />
                                </div>
                                <div className="min-w-0">
                                    <div className="font-black text-foreground text-sm uppercase tracking-tight truncate">HTML OLARAK İNDİR</div>
                                    <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest opacity-60">En İyi Uyumluluk</div>
                                </div>
                            </button>

                            <button
                                onClick={exportToPNG}
                                className="w-full p-3 rounded-2xl text-left hover:bg-primary/10 transition-all flex items-center gap-4 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all group-hover:scale-105">
                                    <FileImage className="w-5 h-5 text-primary" />
                                </div>
                                <div className="min-w-0">
                                    <div className="font-black text-foreground text-sm uppercase tracking-tight truncate">PNG OLARAK İNDİR</div>
                                    <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Görsel Formatı</div>
                                </div>
                            </button>

                            <button
                                onClick={exportToPDF}
                                className="w-full p-3 rounded-2xl text-left hover:bg-primary/10 transition-all flex items-center gap-4 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all group-hover:scale-105">
                                    <FileType className="w-5 h-5 text-primary" />
                                </div>
                                <div className="min-w-0">
                                    <div className="font-black text-foreground text-sm uppercase tracking-tight truncate">PDF OLARAK İNDİR</div>
                                    <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Yazdırılabilir</div>
                                </div>
                            </button>
                            <button
                                onClick={exportToVCard}
                                className="w-full p-3 rounded-2xl text-left hover:bg-primary/10 transition-all flex items-center gap-4 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all group-hover:scale-105">
                                    <QrCode className="w-5 h-5 text-primary" />
                                </div>
                                <div className="min-w-0">
                                    <div className="font-black text-foreground text-sm uppercase tracking-tight truncate">vCard QR Kodu</div>
                                    <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Akıllı Rehber</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
