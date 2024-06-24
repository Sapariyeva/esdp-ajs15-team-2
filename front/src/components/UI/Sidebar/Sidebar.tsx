import React, { MouseEventHandler } from 'react';
import igrovuzLogo from '../../../..//public/images/logo/igrovuz-logo-sm.svg';
import helpLogo from '../../../../public/images/sidebar-icons/help.svg';
import homeLogo from '../../../..//public/images/sidebar-icons/home.svg';
import settingsLogo from '../../../..//public/images/sidebar-icons/settings.svg';
import statisticsLogo from '../../../..//public/images/sidebar-icons/statistics.svg';
import profileLogo from '../../../../public/images/sidebar-icons/profile.svg';
import logout from '../../../../public/images/sidebar-icons/logout.svg';
import './Sidebar.scss';

interface Props {
    style?: React.CSSProperties
    onClick?: MouseEventHandler<HTMLLIElement>
}

export function Sidebar ({style, onClick}: Props) {
    return (
      <nav className="sidebar" style={style}>
        <img src={igrovuzLogo} alt="igrovuzLogo" className="sidebar-logo" />
        <ul className="sidebar-menu">
            <li className="sidebar-menu-item">
                <div className="sidebar-menu-item-inner">
                    <img src={homeLogo} alt="home-logo" />
                    <a href="#home">Главная</a>
                </div>
            </li>
            <li className="sidebar-menu-item">
                <div className="sidebar-menu-item-inner">
                    <img src={statisticsLogo} alt="statistics-logo" />
                    <a href="#statistics">Статистика</a>
                </div>
            </li>
            <li className="sidebar-menu-item">
                <div className="sidebar-menu-item-inner">
                    <img src={profileLogo} alt="profile-logo" />
                    <a href="#profile">Профиль</a>
                </div>
            </li>
            <li className="sidebar-menu-item">
                <div className="sidebar-menu-item-inner">
                    <img src={settingsLogo} alt="settings-logo" />
                    <a href="#settings">Настройки</a>
                </div>
            </li>
            <li className="sidebar-menu-item">
                <div className="sidebar-menu-item-inner">
                    <img src={helpLogo} alt="help-logo" />
                    <a href="#help">Помощь</a>
                </div>
            </li>
            <li className="sidebar-menu-item" onClick={onClick}>
                <div className="sidebar-menu-item-inner">
                    <img src={logout} alt="logout-logo" />
                    <a href="#help">Выход</a>
                </div>
            </li>
        </ul>
      </nav>
    );
};
