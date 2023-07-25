import React from "react";

interface SectionCardProps {
  id: string;
  title?: string;
  selectedValue?: number; // Optional selected value for slider
  onSliderValueChange?: (value: number) => void; // Optional callback for slider value change
  children: React.ReactNode;
}

export function SectionCard({
  id,
  title,
  selectedValue,
  onSliderValueChange,
  children,
}: SectionCardProps) {
  return (
    <div className="mx-auto max-w-7xl py-6 justify-center items-center" id={id}>
      <div className="relative isolate overflow-hidden bg-gray-800 px-6 shadow-2xl sm:rounded-3xl">
        {title && (
          <h2 className="text-2xl font-bold text-gray-100 text-center my-2 sm:my-4 md:my-4 lg:my-5">
            {title}
          </h2>
        )}
        {/* Conditionally render the slider */}
        {selectedValue !== undefined && onSliderValueChange && (
          <div className="flex items-center justify-center space-x-4">
            <input
              type="range"
              min={5}
              max={50}
              step={5}
              value={selectedValue}
              onChange={(event) => {
                const value = parseInt(event.target.value);
                onSliderValueChange(value);
              }}
              className="w-72 h-3 appearance-none rounded-full cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600"
            />
            <p className="text-gray-100">{selectedValue}</p>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
