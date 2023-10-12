import { Metadata } from "next"
import Genres from "../../components/genres/Genres"

export const metadata: Metadata = {
    title: 'Top Generos - Tunefy',
    description: 'Seus top generos no Spotify',
}

export default function Page() {

  return <><Genres/></>
  
}
