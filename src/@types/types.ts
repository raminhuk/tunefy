export interface SpotifyUser {
    display_name: string;
    email: string;
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

export type Track = {
    name: string;
    artist: string;
    albumImageUrl: string;
    spotifyTrackUrl: string;
};

export type Artist = {
    name: string;
    imageUrl: string;
};

export type Genre = {
    name: string;
};

export type RecentTrack = {
    name: string;
    artist: string;
};