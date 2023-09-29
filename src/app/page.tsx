import LoginButton from "../components/LoginButton";
import { ToastContainer, toast } from 'react-toastify';


export default function Home() {
    return (
        <div className="max-w-7xl w-11/12 mx-auto">
            <div className="min-h-[calc(100vh_-_88px)] bg-[url('/phone.png')] bg-no-repeat bg-right flex flex-col justify-center">
                <h1>
                    <span className="text-4xl font-semi tracking-wide">As Mais Ouvidas por<br /> Você no Spotify!</span>
                    
                </h1>
                <span className="mt-4">
                    <LoginButton/>
                </span>
            </div>
        </div>
    )
}
