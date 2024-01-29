import { Metadata } from "next"
import Genres from "../../components/genres/Genres"

export const metadata: Metadata = {
    title: 'Top Genres - Tunefy',
    description: 'Your top genres on Spotify',
}

export default function Page() {

  return <><Genres/></>
  
}
