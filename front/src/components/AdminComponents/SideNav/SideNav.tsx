import { Link } from "react-router-dom";
import { SettingOutlined } from '@ant-design/icons';

const SideNav = () => {
    return (
        <>
            <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{ backgroundColor: '#9069CD' }}>
                <Link className="brand-link" to="/">
                    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light" style={{ color: 'black' }}>AdminLTE 3</span>
                </Link>

                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}

                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            <SettingOutlined style={{ color: 'black' }} />
                            <p style={{ marginLeft: '10px', color: 'black' }}> Параметры игр</p>
                        </Link>
                    </li>
                </ul>
            </aside >
        </>
    )
}

export default SideNav;