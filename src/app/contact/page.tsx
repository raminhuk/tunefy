import NavBar from "../../components/UI/NavBar";

export default function Page() {
  return (
    <div className="max-w-7xl w-11/12 mx-auto mt-10">
        <div className="flex">
            <NavBar/>
            <div className="flex flex-1 flex-col">
                <h1 className="text-center font-semibold text-2xl tracking-wider mb-6">Quem somos</h1>

                <div className="rounded-lg shadow-lg text-justify">
      <p className="mb-4">
        Somos apaixonados por música, e acreditamos que a trilha sonora da vida de cada um é única e especial. É por isso que criamos o Tunefy, uma plataforma dedicada a proporcionar a você uma visão única de sua jornada musical no Spotify.
      </p>
      <p className="mb-4">
        Nossa missão é simples: queremos que você se sinta mais conectado com a música que ama. Seja você um melômano de longa data ou alguém que apenas começou a explorar o mundo da música, o Tunefy está aqui para celebrar sua jornada sonora.
      </p>
      <p className="mb-4">
        <strong className="text-xl">O que fazemos</strong>
      </p>
      <p className="mb-4">
        O Tunefy é um espaço onde os amantes da música podem mergulhar profundamente em sua própria experiência musical. Oferecemos uma série de recursos que revelam o seu relacionamento com a música no Spotify de maneira única:
      </p>
      <ul className="mb-4 list-inside">
        <li>
          <strong>Top Músicas e Artistas:</strong> Descubra as músicas que mais aquecem o seu coração e os artistas que transformam seus momentos especiais em memórias inesquecíveis.
        </li>
        <li>
          <strong>Gêneros Prediletos:</strong> Saiba quais gêneros musicais ocupam um lugar especial em seu coração e enriquecem sua vida.
        </li>
        <li>
          <strong>Últimas Audições:</strong> Reviva os momentos recentes em que você se perdeu na melodia e na letra de suas músicas favoritas.
        </li>
      </ul>
      <p className="mb-4">
        Nosso compromisso é tornar a música uma parte mais significativa de sua vida, conectando você às batidas e letras que fazem o seu coração vibrar.
      </p>
      <p className="mb-4">
        <strong className="text-xl">Quem está por trás do Tunefy</strong>
      </p>
      <p className="mb-4">
        Nossa equipe é formada por um grupo diversificado de entusiastas da música, desenvolvedores criativos e designers apaixonados. Todos compartilhamos o mesmo objetivo: trazer uma experiência musical personalizada e envolvente para você.
      </p>
      <p className="mb-4">
        Estamos sempre ouvindo os feedbacks e sugestões de nossos usuários, pois acreditamos que a música é uma jornada contínua que evolui com o tempo, assim como nós.
      </p>
      <p className="mb-4">
        Junte-se a nós no Tunefy e descubra o poder da música para conectar, emocionar e inspirar. Sua trilha sonora pessoal está a um clique de distância, pronta para desempenhar um papel importante em sua história.
      </p>
      <p className="mb-4">
        Bem-vindo ao Tunefy, o ritmo da sua vida, a um toque de distância.
      </p>
    </div>
            </div>
        </div>
    </div>
  )
}
