import { TimeRange } from "../@types/types";

export function timeRangeName(time: TimeRange): string {
    const timeName = {
      'short_term': 'Last Month',
      'medium_term': 'Last 6 Months',
      'long_term': 'All Time'
    };
    return timeName[time] || 'Not Time Range';
  }