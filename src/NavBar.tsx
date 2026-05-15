import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Scores', href: '/scores/' },
    { name: 'Learn', href: '/learn/' },
    { name: 'About', href: '/about/' },
  ];

  return (
    <header>
      <nav>
        {navItems.map((item) => (
          <NavLink key={item.name} to={item.href} className={({ isActive }) => `navbar-item${isActive ? ' navbar-item-active' : ''}`}>
            {item.name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
