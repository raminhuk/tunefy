import LoginButton from "../LoginButton";

export default function Home() {
    return (
        <div className="max-w-7xl w-11/12 mx-auto">
            <div className="min-h-[calc(100vh_-_88px)] bg-[url('/phone3.png')] lg:bg-cover bg-contain bg-no-repeat lg:bg-right bg-[40px] flex flex-col justify-center">
                <h1>
                    <span className="lg:text-4xl text-lg font-semi tracking-wide">Your Top Listened <br /> to on Spotify</span>
                    
                </h1>
                <span className="mt-4">
                    <LoginButton/>
                </span>
            </div>
        </div>
    )
}
