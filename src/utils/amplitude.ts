import * as amplitude from '@amplitude/analytics-browser';

export const AMPLITUDE_API_KEY: string | undefined = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

amplitude.init(AMPLITUDE_API_KEY || '', {
    defaultTracking: true,
});

export const logAmplitudeEvent = (eventName: string, eventData?: any) => {
    amplitude.track(eventName, eventData);
};

export const identifyAmplitudeEvent = (eventData: Record<string, any>) => {
    const identifyEvent = new amplitude.Identify();

    for (const key in eventData) {
        if (eventData.hasOwnProperty(key) && eventData[key] !== null) {
            identifyEvent.set(key, eventData[key]);
        }
    }

    amplitude.identify(identifyEvent);
};
