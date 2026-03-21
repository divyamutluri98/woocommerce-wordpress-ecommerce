'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SliderProps {
  defaultValue?: number[];
  value?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ defaultValue, value, onValueChange, min = 0, max = 100, step = 1, className }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || [min, max]);
    const controlledValue = value ?? internalValue;

    const handleChange = (newValue: number[]) => {
      setInternalValue(newValue);
      onValueChange?.(newValue);
    };

    const percent1 = ((controlledValue[0] - min) / (max - min)) * 100;
    const percent2 = ((controlledValue[1] - min) / (max - min)) * 100;

    return (
      <div className={cn('relative w-full', className)}>
        <div className="relative h-2 w-full">
          <div className="absolute inset-0 bg-muted rounded-full" />
          <div
            className="absolute h-full bg-primary rounded-full"
            style={{
              left: `${percent1}%`,
              right: `${100 - percent2}%`,
            }}
          />
        </div>
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={controlledValue[0]}
          onChange={(e) => handleChange([parseInt(e.target.value), controlledValue[1]])}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={controlledValue[1]}
          onChange={(e) => handleChange([controlledValue[0], parseInt(e.target.value)])}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-background border-2 border-primary rounded-full shadow pointer-events-none"
          style={{ left: `calc(${percent1}% - 8px)` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-background border-2 border-primary rounded-full shadow pointer-events-none"
          style={{ left: `calc(${percent2}% - 8px)` }}
        />
      </div>
    );
  }
);
Slider.displayName = 'Slider';

export { Slider };
