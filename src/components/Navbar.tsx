import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Achievements" },
  { href: "#analytics", label: "Analytics" },
  { href: "#comments", label: "Comments" },
  { href: "#contact", label: "Contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar-wrap">
      <nav className="navbar">
        <a className="brand" href="#hero">
          NHD
        </a>

        <button
          className="menu-toggle"
          onClick={() => setOpen((state) => !state)}
          aria-label="Toggle menu"
          aria-expanded={open}
          type="button"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>

        <ul className={`nav-links ${open ? "is-open" : ""}`}>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
