import { Link } from "react-router-dom";
import { SettingOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/hooks";
import logoutImg from '@/assets/images/sidebar-icons/logout.svg';
import { logoutUser } from "@/features/userSlice";

const SideNav = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const logout = () => {
        dispatch(logoutUser()).unwrap().then(() => {
            navigate('/');
        });
    };

    return (
        <>
            <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{ backgroundColor: '#9069CD' }}>
                <h2 className="brand-text font-weight-light" style={{ color: '#1C1B1F', padding: '10px 20px', fontSize: '40px', borderBottom: '1px solid black' }}>ИгроВУЗ</h2>
                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false" style={{ fontSize: '20px' }}>
                    {/* Add icons to the links using the .nav-icon class
                    with font-awesome or any other icon font library */}

                    <li className="nav-item">
                        <Link to="/admin_page/settings" className="nav-link">
                            <SettingOutlined style={{ color: 'black' }} />
                            <p style={{ marginLeft: '10px', color: 'black' }}> Параметры игр</p>
                        </Link>
                    </li>
                    <li className="nav-item" onClick={() => logout()}>
                        <div className="nav-link">
                            <img src={logoutImg} alt="logout-logo" />
                            <p style={{ marginLeft: '10px', color: 'black' }}>Выход</p>
                        </div>
                    </li>
                </ul>
            </aside >
        </>
    )
}

export default SideNav;