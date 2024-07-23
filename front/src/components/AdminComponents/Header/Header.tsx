import { Link } from "react-router-dom";


const Header = () => {
    return (
        <>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav align-items-center">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <Link className="nav-item d-none d-sm-inline-block" to="/" style={{ color: '#555555' }}>Home</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Header;