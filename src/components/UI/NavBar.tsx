import Link from "next/link";

export default function NavBar() {
    return (
        <ul className="space-y-1 mr-10">
  <li>
    <Link
      href="/about"
      className="block rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700"
    >
      Quem Somos
    </Link>
  </li>

  <li>
    <Link
      href="/privacy"
      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-100 hover:text-gray-700"
    >
      Política e privacidade
    </Link>
  </li>

  <li>
    <Link
      href="/faq"
      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-100 hover:text-gray-700"
    >
      Faq
    </Link>
  </li>

  <li>
    <Link
      href="/contact"
      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-100 hover:text-gray-700"
    >
      Contato
    </Link>
  </li>
</ul>


    );
};
