import NavBar from "../../components/UI/NavBar";

export default function Page() {
    return (
        <div className="max-w-5xl w-11/12 mx-auto mt-10">
            <div className="flex">
                {/* <NavBar/> */}
                <div className="flex flex-1 flex-col text-gray-200">
                    <h1 className="text-center font-semibold text-2xl tracking-wider mb-6">About</h1>

                    <div className="rounded-lg shadow-lg text-justify">
                        <p className="mb-4">
                            We are passionate about music, and we believe that everyone`s life soundtrack is unique and special. That&apos;s why we created Tunefy, a platform dedicated to providing you with a unique view of your musical journey on Spotify.
                        </p>
                        <p className="mb-4">
                            Our mission is simple: we want you to feel more connected to the music you love. Whether you&apos;re a long-time music enthusiast or someone who has just started exploring the world of music, Tunefy is here to celebrate your musical journey.
                        </p>
                        <p className="mb-4">
                            <h2 className="text-xl font-semibold mb-2">What We Do</h2>
                        </p>
                        <p className="mb-4">
                            Tunefy is a space where music lovers can dive deep into their own musical experience. We offer a range of features that reveal your relationship with music on Spotify in a unique way:
                        </p>
                        <ul className="mb-4 list-inside">
                            <li>
                                <strong>Top Songs and Artists:</strong> Discover the songs that warm your heart the most and the artists who turn your special moments into unforgettable memories.
                            </li>
                            <li>
                                <strong>Favorite Genres:</strong> Find out which music genres hold a special place in your heart and enrich your life.
                            </li>
                            <li>
                                <strong>Recent Listens:</strong> Relive the recent moments when you got lost in the melody and lyrics of your favorite songs.
                            </li>
                        </ul>
                        <p className="mb-4">
                            Our commitment is to make music a more meaningful part of your life, connecting you to the beats and lyrics that make your heart resonate.
                        </p>
                        <p className="mb-4">
                            <h2 className="text-xl font-semibold mb-2">Who&apos;s Behind Tunefy</h2>
                        </p>
                        <p className="mb-4">
                            Our team consists of a diverse group of music enthusiasts, creative developers, and passionate designers. We all share the same goal: to bring a personalized and engaging musical experience to you.
                        </p>
                        <p className="mb-4">
                            We&apos;re always listening to the feedback and suggestions from our users because we believe that music is a continuous journey that evolves over time, just like we do.
                        </p>
                        <p className="mb-4">
                            Join us on Tunefy and discover the power of music to connect, move, and inspire. Your personal soundtrack is just a click away, ready to play a significant role in your story.
                        </p>
                        <p className="mb-4">
                            Welcome to Tunefy, the rhythm of your life, just a tap away.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
