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
    images: {
        url: string;
        width: number;
        height: number;
    }[];
    genres: string[]
};

export type Genre = {
    name: string;
};

export type RecentTrack = {
    name: string;
    artist: string;
};

export type TimeRange = 'short_term' | 'medium_term' | 'long_term'
