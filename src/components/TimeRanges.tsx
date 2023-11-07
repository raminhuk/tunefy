'use client';

import { useState } from "react";
import { TimeRange } from "../@types/types";
import { timeRangeName } from "../utils/timeRangeName";

interface TimeRengesProps {
    handleTimeRangeChange: (time: TimeRange) => void
}

function TimeRenges({ handleTimeRangeChange }: TimeRengesProps) {
    const [timeRange, setTimeRange] = useState<TimeRange>('short_term');

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
                Last Month
            </button>
            <button
                onClick={() => handleTimeRange('medium_term')}
                className={`text-xs lg:text-base flex-1 ${timeRange === 'medium_term' ? 'bg-gradient-to-r from-customPink to-customBlue' : 'bg-zinc-900'} border border-zinc-800 hover:bg-gradient-to-r from-customPink to-customBlue text-white px-1 py-3 rounded`}
            >
                Last 6 Months
            </button>
            <button
                onClick={() => handleTimeRange('long_term')}
                className={`text-xs lg:text-base flex-1 ${timeRange === 'long_term' ? 'bg-gradient-to-r from-customPink to-customBlue' : 'bg-zinc-900'} border border-zinc-800 hover:bg-gradient-to-r from-customPink to-customBlue text-white px-1 py-3 rounded`}
            >
                All Time
            </button>
        </div>
    );
};

export default TimeRenges;

