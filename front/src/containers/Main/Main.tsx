import { useAppDispatch } from "@/app/hooks";
import { Button } from "@/components/UI/Button/Button";
import { Sidebar } from "@/components/UI/Sidebar/Sidebar";
import { logoutUser } from "@/features/userSlice";
import { useNavigate } from "react-router-dom";
import sadSmile from '@/assets/images/main-icons/sentiment_dissatisfied.svg'
import child from '@/assets/images/main-icons/child_care.svg'
import settings from '@/assets/images/main-icons/settings_heart.svg'
import reaction from '@/assets/images/main-icons/add_reaction.svg'
import account from '@/assets/images/main-icons/deployed_code_account.svg'
import { useTranslation } from "react-i18next";



// Главная страница приложения
const Main = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const logout = () => {
        dispatch(logoutUser()).unwrap().then(() => {
            navigate('/');
        });
    };

    return (
        <div className="main-container">
            <Sidebar
                onClickLogout={() => logout()}
                onClickProfile={() => navigate('/profile')}
                onClickGame={() => navigate('/games')}
                onClickHelp={() => navigate('/help')}
                onClickStatistics={() => navigate('/statistics')}
                onClickMain={() => navigate('/main')}
                onClickEmployees={() => navigate('/employees')}
                onClickStudents={() => navigate('/students')}
            />
            <div className="content">
                <div className="header">
                    <div className="user-info">
                        <img src={sadSmile} alt="sadSmile" />
                        <div className="user-info-text">
                            <p>{t("you_don't_have_any_students_added_yet")}</p>
                            <a href="#" className="add-student-link">{t("add_student")}</a>
                        </div>
                    </div>
                </div>
                <div className="features">
                    <div className="feature-item">
                        <div className="feature-item-text">
                            <p>{t("detailed_statistics_for_each_student")}</p>
                        </div>
                        <div className="feature-item-img">
                            <img src={child} alt='child' />
                        </div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-item-text">
                            <p>{t("possibility_of_flexible_session_setup")}</p>
                        </div>              
                        <div className="feature-item-img" >
                            <img src={settings} alt='settings' />
                        </div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-item-text">
                            <p>{t("adding_new_students")}</p>
                        </div>
                        <div className="feature-item-img">
                            <img src={reaction} alt='reaction' />
                        </div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-item-text">
                            <p>{t("additional_employees_Suitable_for_centers")}</p>
                        </div>
                        <div className="feature-item-img">
                            <img src={account} alt='account' />
                        </div>
                    </div>
                </div>
                <div className="verbs-banner">
                    <Button
                        title={t("verbs")}
                        type='primary'
                        size="lg"
                        style={{width: '100%', maxHeight: 223, height: 223}}
                    />
                </div>
            </div>
        </div>
    )
}

export default Main;
