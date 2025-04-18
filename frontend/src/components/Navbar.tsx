import Link from "next/link";

export default function Navbar({ links }: { links: any }) {
  return (
    <>
      <ul className="gap-2 hidden sm:flex">
        {links.map((link: any) => {
          return (
            <li>
              <Link
                href={link.href}
                className="hover:bg-accent bg-primary hover:text-foreground text-background p-3 rounded-md transition"
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <button className="flex sm:hidden hover:bg-primary hover:text-background p-3 rounded-md transition">
        TODO
      </button>
    </>
  );
}
