export interface SpotifyUser {
    display_name: string;
    email: string;
    id: string;
    followers: {
        href: string;
        total: number;
    };
    images: {
        url: string;
        height: number;
        width: number;
    }[];
}

export interface Track {
    id: string;
    name: string;
    artists: { name: string }[];
    uri: string;
    album: {
        images: {
            url: string;
            width: number;
            height: number;
        }[];
    };
    type: string
}

export interface Artist {
    id: string;
    name: string;
    external_urls?: {
        spotify: string;
    };
    images?: {
        url: string;
        width: number;
        height: number;
    }[];
    genres?: string[]
};

export interface GroupGenres {
    frequency?: number;
    genre?: string[];
};

export type RecentTrack = {
    name: string;
    artist: string;
};


export type TrackOrArtist = Track | Artist;

export type TimeRange = 'short_term' | 'medium_term' | 'long_term'
export type TimeRanges = ['short_term', 'medium_term', 'long_term']
