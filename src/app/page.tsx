import LoginButton from "../components/LoginButton";

export default function Home() {
    return (
        <div className="max-w-7xl w-11/12 mx-auto min-h-screen">
            <div className="min-h-screen bg-[url('/phone.png')] bg-no-repeat bg-right flex flex-col justify-center">
                <h1>
                    <span className="text-xl font-extralight tracking-widest">As Mais Ouvidas por Você no Spotify!</span><br />
                    <span className="text-6xl font-extrabold tracking-wide">Ritmo do seu<br />
                        <span className="text-8xl">SOM  ♫</span>
                    </span>
                </h1>
                <span className="mt-4">
                    <LoginButton/>
                </span>
            </div>
        </div>
    )
}
