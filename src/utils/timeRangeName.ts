import { TimeRange } from "../@types/types";

export function timeRangeName(time: TimeRange): string {
    const timeName = {
      'short_term': 'Último mês',
      'medium_term': 'Últimos 6 meses',
      'long_term': 'Todos os tempos'
    };
    return timeName[time] || 'Not Time Range';
  }