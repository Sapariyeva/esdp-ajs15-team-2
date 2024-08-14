import logo from '@/assets/images/logo/igrovuz-logo-lg.svg';

const Header = () => {
    return (
        <>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav align-items-center" style={{fontSize: '25px'}}>
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                    </li>
                </ul>
                <div style={{margin: '20px 30px'}}>
                    <img src={logo} alt="AdminLTE Logo"/>
                </div>
            </nav>
        </>
    )
}

export default Header;