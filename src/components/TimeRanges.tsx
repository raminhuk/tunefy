'use client';

import { useState } from "react";
import { TimeRange } from "../@types/types";

interface TimeRengesProps {
    handleTimeRangeChange: (time: TimeRange) => void
}

function TimeRenges({ handleTimeRangeChange }: TimeRengesProps) {
    const [timeRange, setTimeRange] = useState<string>('short_term');

    const handleTimeRange = (time: TimeRange) => {
        handleTimeRangeChange(time);
        setTimeRange(time)
    }

    return (
        <div className="flex justify-between gap-2 mb-4">
            <button
                onClick={() => handleTimeRange('short_term')}
                className={`text-xs lg:text-base flex-1 ${timeRange === 'short_term' ? 'bg-gradient-to-r from-customPink to-customBlue' : 'bg-zinc-900'} border border-zinc-800 hover:bg-gradient-to-r from-customPink to-customBlue text-white px-1 py-3 rounded`}
            >
                Último mês
            </button>
            <button
                onClick={() => handleTimeRange('medium_term')}
                className={`text-xs lg:text-base flex-1 ${timeRange === 'medium_term' ? 'bg-gradient-to-r from-customPink to-customBlue' : 'bg-zinc-900'} border border-zinc-800 hover:bg-gradient-to-r from-customPink to-customBlue text-white px-1 py-3 rounded`}
            >
                Últimos 6 meses
            </button>
            <button
                onClick={() => handleTimeRange('long_term')}
                className={`text-xs lg:text-base flex-1 ${timeRange === 'long_term' ? 'bg-gradient-to-r from-customPink to-customBlue' : 'bg-zinc-900'} border border-zinc-800 hover:bg-gradient-to-r from-customPink to-customBlue text-white px-1 py-3 rounded`}
            >
                Todos os tempos
            </button>
        </div>
    );
};

export default TimeRenges;

