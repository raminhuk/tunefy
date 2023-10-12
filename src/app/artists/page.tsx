import { Metadata } from "next";
import Artists from "../../components/artist/Artists";

export const metadata: Metadata = {
    title: 'Top Artistas - Tunefy',
    description: 'Seus artistas mais ouvidos no Spotify',
}

export default function Page() {
    
  return <><Artists/></>
}
