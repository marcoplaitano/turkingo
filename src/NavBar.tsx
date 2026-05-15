import '../style/Navbar.css'

import { NavLink } from 'react-router-dom';

import Title from './Title';

export default function Navbar() {
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Scores', href: '/scores/' },
    { name: 'Learn', href: '/learn/' },
    { name: 'About', href: '/about/' },
  ];

  return (
    <header>
      <Title/>
      <nav>
        {navItems.map((item) => (
          <NavLink key={item.name} to={item.href} className={({ isActive }) => `navbar-item${isActive ? ' navbar-curr-page' : ''}`}>
            {item.name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
