import logo from '../../src/images/logo.svg';

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="место Россия" className="header__logo" />
    </header>
  );
}

export default Header;
