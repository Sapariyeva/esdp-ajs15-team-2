import React, { MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import igrovuzLogo from '@/assets/images/logo/igrovuz-logo-sm.svg';
import helpLogo from '@/assets/images/sidebar-icons/help.svg';
import homeLogo from '@/assets/images/sidebar-icons/home.svg';
import settingsLogo from '@/assets/images/sidebar-icons/settings.svg';
import statisticsLogo from '@/assets/images/sidebar-icons/statistics.svg';
import profileLogo from '@/assets/images/sidebar-icons/profile.svg';
import employeesLogo from '@/assets/images/sidebar-icons/employees.svg'
import studentsLogo from '@/assets/images/sidebar-icons/students.svg'
import logout from '@/assets/images/sidebar-icons/logout.svg';
import './Sidebar.scss';

interface Props {
    style?: React.CSSProperties
    onClickLogout?: MouseEventHandler<HTMLLIElement>
    onClickGame?: MouseEventHandler<HTMLLIElement>
    onClickProfile?: MouseEventHandler<HTMLLIElement>
    onClickEmployees?: MouseEventHandler<HTMLLIElement>
    onClickStudents?: MouseEventHandler<HTMLLIElement>
    onClickStatistics?: MouseEventHandler<HTMLLIElement>
    onClickHelp?: MouseEventHandler<HTMLLIElement>
    onClickMain?: MouseEventHandler<HTMLLIElement>
}

export function Sidebar ({style, onClickLogout, onClickGame, onClickProfile, onClickStatistics, onClickHelp, onClickMain, onClickEmployees, onClickStudents}: Props) {
    const { t } = useTranslation();

    return (
      <nav className="sidebar" style={style}>
        <img src={igrovuzLogo} alt="igrovuzLogo" className="sidebar-logo" />
        <ul className="sidebar-menu">
            <li className="sidebar-menu-item" onClick={onClickMain}>
                <div className="sidebar-menu-item-inner">
                    <img src={homeLogo} alt="home-logo" />
                    <p>{t('home')}</p>
                </div>
            </li>
            <li className="sidebar-menu-item" onClick={onClickStatistics}>
                <div className="sidebar-menu-item-inner">
                    <img src={statisticsLogo} alt="statistics-logo" />
                    <p>{t('statistics')}</p>
                </div>
            </li>
            <li className="sidebar-menu-item" onClick={onClickEmployees}>
                <div className="sidebar-menu-item-inner">
                    <img src={employeesLogo} alt="emoloyees-logo" />
                    <p>{t('emoloyees')}</p>
                </div>
            </li>
            <li className="sidebar-menu-item" onClick={onClickStudents}>
                <div className="sidebar-menu-item-inner">
                    <img src={studentsLogo} alt="students-logo" />
                    <p>{t('students')}</p>
                </div>
            </li>
            <li className="sidebar-menu-item" onClick={onClickProfile}>
                <div className="sidebar-menu-item-inner">
                    <img src={profileLogo} alt="profile-logo" />
                    <p>{t('profile')}</p>
                </div>
            </li>
            <li className="sidebar-menu-item" onClick={onClickGame}>
                <div className="sidebar-menu-item-inner">
                    <img src={settingsLogo} alt="settings-logo" />
                    <p>{t('settings')}</p>
                </div>
            </li>
            <li className="sidebar-menu-item" onClick={onClickHelp}>
                <div className="sidebar-menu-item-inner">
                    <img src={helpLogo} alt="help-logo" />
                    <p>{t('help')}</p>
                </div>
            </li>
            <li className="sidebar-menu-item" onClick={onClickLogout}>
                <div className="sidebar-menu-item-inner">
                    <img src={logout} alt="logout-logo" />
                    <p>{t('logout')}</p>
                </div>
            </li>
        </ul>
      </nav>
    );
}
