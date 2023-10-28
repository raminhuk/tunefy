// artistAPI.ts
import { AxiosResponse } from 'axios';
import api from './api';

interface DataByTimeRange {
  [timeRange: string]: any[];
}

const timeRanges = ['short_term', 'medium_term', 'long_term']

export async function fetchTopArtist(): Promise<DataByTimeRange> {
  const topArtistDataByTimeRange: DataByTimeRange = {};

  await Promise.all(
    timeRanges.map(async (timeRange) => {
      const response: AxiosResponse = await api.get(`me/top/artists?time_range=${timeRange}&limit=50`);
      topArtistDataByTimeRange[timeRange] = response?.data.items;
    })
  );

  return topArtistDataByTimeRange;
}


export async function fetchTopTracks(): Promise<DataByTimeRange> {
    const topTracksDataByTimeRange: DataByTimeRange = {};
  
    await Promise.all(
      timeRanges.map(async (timeRange) => {
        const response: AxiosResponse = await api(`me/top/tracks?time_range=${timeRange}&limit=50`);
        topTracksDataByTimeRange[timeRange] = response?.data.items;
      })
    );
  
    return topTracksDataByTimeRange;
  }