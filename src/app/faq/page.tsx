import { Metadata } from "next";
import NavBar from "../../components/UI/NavBar";

export const metadata: Metadata = {
    title: 'Faq - Tunefy',
    description: 'FAQ - Answers to Your Frequently Asked Questions',
}


export default function Page() {
    return (
        <div className="max-w-5xl w-11/12 mx-auto mt-10">
            <div className="flex">
                {/* <NavBar/> */}
                <div className="flex flex-1 flex-col text-gray-200">
                    <h1 className="text-center font-semibold text-2xl tracking-wider mb-6">Frequently Asked Questions (FAQ) </h1>

                    <div className="rounded-lg shadow-lg text-justify">
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold mb-2">1. What is Tunefy?</h2>
                            <p>Tunefy is a web application that allows users to view detailed information about their most-listened-to songs on Spotify over the last 6 months and all-time. Additionally, you can see the most-listened-to artists in the same period, the most-listened-to genres, and the most recently played songs.</p>
                        </div>

                        <div className="mb-4">
                            <h2 className="text-xl font-semibold mb-2">2. How do I access my Spotify information on Tunefy?</h2>
                            <p>To access your Spotify information on Tunefy, simply click &quot;Login&quot; on the home page. You will be redirected to the Spotify website, where you should authenticate your account. After successful authentication, you will be redirected back to the Tunefy application with an access token in the URL.</p>
                        </div>

                        <div className="mb-4">
                            <h2 className="text-xl font-semibold mb-2">3. Does Tunefy store or share my Spotify data?</h2>
                            <p>No, Tunefy does not store or share your Spotify data with third parties. However, we collect some data to enhance the user experience using Google Analytics and Amplify tools. These data are used exclusively for analysis and performance improvement, ensuring a more personalized and enhanced experience for our users.</p>
                        </div>

                        <div className="mb-4">
                            <h2 className="text-xl font-semibold mb-2">4. How does Tunefy use Spotify data?</h2>
                            <p>Tunefy utilizes public Spotify APIs to gather information about your most-listened-to songs, artists, and genres. This data is used to create custom reports within the application.</p>
                        </div>

                        <div className="mb-4">
                            <h2 className="text-xl font-semibold mb-2">5. Can I revoke Tunefy permissions?</h2>
                            <p>Yes, if you ever wish to revoke the permissions granted to Tunefy, you can do so by visiting the application page on Spotify. There, you can click &quot;REMOVE ACCESS&quot; for Tunefy. For more detailed instructions, refer to this [comprehensive guide](https://support.spotify.com/us/article/spotify-on-other-apps/).</p>
                        </div>

                        <div className="mb-4">
                            <h2 className="text-xl font-semibold mb-2">6. Can I create playlists based on my most-listened-to songs?</h2>
                            <p>Yes, in Tunefy, you can create personalized playlists based on your most-listened-to songs. Simply click the &quot;Create Playlist&quot; button on the &quot;Tracks&quot; page, and the playlist will be automatically created on your Spotify profile.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
