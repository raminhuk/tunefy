import * as amplitude from '@amplitude/analytics-browser';

export const AMPLITUDE_API_KEY: string | undefined = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

amplitude.init(AMPLITUDE_API_KEY || '');

export const logAmplitudeEvent = (eventName: string, eventData?: any) => {
    amplitude.track(eventName, eventData);
};
