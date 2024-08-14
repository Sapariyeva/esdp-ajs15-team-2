import { useEffect, useState } from "react";
import Users from "../Users/Users";
import { useAppSelector } from "@/app/hooks";

const Home = () => {
    const { users } = useAppSelector(store => store.admin);
    const [isEmailConfirmedUsers, setOnlineUsers] = useState<number>(0);
    const [countUsers, setCountUsers] = useState<number>(users.length);

    useEffect(() => {
        const totalUsers = users.length;
        const usersIsEmailConfirmed = users.filter(user => user.isEmailConfirmed).length;

        setCountUsers(totalUsers);
        setOnlineUsers(usersIsEmailConfirmed);
    }, [users]);

    return (
        <>
            <div className="content-wrapper" >
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-2 col-6" style={{marginTop: '10px'}}>
                                <div className="small-box bg-warning">
                                    <div className="inner" style={{background: '#FDD231'}}>
                                        <h3>{countUsers}</h3>
                                        <p>Список всех пользователей</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-person-add" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-6" style={{marginTop: '10px'}}>
                                <div className="small-box bg-danger">
                                    <div className="inner" style={{background: '#58A700'}}>
                                        <h3>{isEmailConfirmedUsers}</h3>
                                        <p>Пользователи, подтвердившие свой адрес электронной почты</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-stats-bars" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Users />
                </section>
            </div>
        </>
    )
}

export default Home;

