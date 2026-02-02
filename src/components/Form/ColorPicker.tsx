import React from 'react';
import { useSignature } from '../../context/SignatureContext';

const PRESET_COLORS = [
    '#000000', '#163300', '#9FE870', '#2563eb',
    '#db2777', '#7c3aed', '#ea580c', '#dc2626'
];

export const ColorPicker: React.FC = () => {
    const { data, updateData } = useSignature();

    const handleColorSelect = (color: string) => {
        updateData({ primaryColor: color });
    };

    const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateData({ primaryColor: e.target.value });
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Tema Rengi</span>
                <span className="text-xs text-gray-400 font-mono">{data.primaryColor}</span>
            </div>

            <div className="grid grid-cols-6 gap-2">
                {PRESET_COLORS.map((color) => (
                    <button
                        key={color}
                        onClick={() => handleColorSelect(color)}
                        className={`
                            w-8 h-8 rounded-full border border-gray-100 transition-transform hover:scale-110 focus:outline-none
                            ${data.primaryColor === color ? 'ring-2 ring-offset-2 ring-forest' : ''}
                        `}
                        style={{ backgroundColor: color }}
                        title={color}
                    />
                ))}

                {/* Custom Color Trigger */}
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200 cursor-pointer hover:scale-110 transition-transform">
                    <input
                        type="color"
                        value={data.primaryColor}
                        onChange={handleCustomColorChange}
                        className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 cursor-pointer p-0 border-none"
                    />
                </div>
            </div>
        </div>
    );
};
