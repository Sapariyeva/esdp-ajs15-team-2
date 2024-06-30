import React, { MouseEventHandler } from 'react';
import igrovuzLogo from '@/assets/images/logo/igrovuz-logo-sm.svg';
import helpLogo from '@/assets/images/sidebar-icons/help.svg';
import homeLogo from '@/assets/images/sidebar-icons/home.svg';
import settingsLogo from '@/assets/images/sidebar-icons/settings.svg';
import statisticsLogo from '@/assets/images/sidebar-icons/statistics.svg';
import profileLogo from '@/assets/images/sidebar-icons/profile.svg';
import logout from '@/assets/images/sidebar-icons/logout.svg';
import './Sidebar.scss';

interface Props {
    style?: React.CSSProperties
    onClickLogout?: MouseEventHandler<HTMLLIElement>
    onClickGame?: MouseEventHandler<HTMLLIElement>
    onClickProfile?: MouseEventHandler<HTMLLIElement>
    onClickStatistics?: MouseEventHandler<HTMLLIElement>
    onClickHelp?: MouseEventHandler<HTMLLIElement>
    onClickMain?: MouseEventHandler<HTMLLIElement>
}

export function Sidebar ({style, onClickLogout, onClickGame, onClickProfile, onClickStatistics, onClickHelp, onClickMain}: Props) {
    return (
      <nav className="sidebar" style={style}>
        <img src={igrovuzLogo} alt="igrovuzLogo" className="sidebar-logo" />
        <ul className="sidebar-menu">
            <li className="sidebar-menu-item" onClick={onClickMain}>
                <div className="sidebar-menu-item-inner">
                    <img src={homeLogo} alt="home-logo" />
                    <p>Главная</p>
                </div>
            </li>
            <li className="sidebar-menu-item" onClick={onClickStatistics}>
                <div className="sidebar-menu-item-inner">
                    <img src={statisticsLogo} alt="statistics-logo" />
                    <p>Статистика</p>
                </div>
            </li>
            <li className="sidebar-menu-item" onClick={onClickProfile}>
                <div className="sidebar-menu-item-inner">
                    <img src={profileLogo} alt="profile-logo" />
                    <p>Профиль</p>
                </div>
            </li>
            <li className="sidebar-menu-item" onClick={onClickGame}>
                <div className="sidebar-menu-item-inner">
                    <img src={settingsLogo} alt="settings-logo" />
                    <p>Настройки игр</p>
                </div>
            </li>
            <li className="sidebar-menu-item" onClick={onClickHelp}>
                <div className="sidebar-menu-item-inner">
                    <img src={helpLogo} alt="help-logo" />
                    <p>Помощь</p>
                </div>
            </li>
            <li className="sidebar-menu-item" onClick={onClickLogout}>
                <div className="sidebar-menu-item-inner">
                    <img src={logout} alt="logout-logo" />
                    <p>Выход</p>
                </div>
            </li>
        </ul>
      </nav>
    );
};
