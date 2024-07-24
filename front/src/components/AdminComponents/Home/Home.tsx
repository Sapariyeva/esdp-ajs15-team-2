import { useEffect, useState } from "react";
import Users from "../Users/Users";
import { useAppSelector } from "@/app/hooks";



const Home = () => {
    const { users } = useAppSelector(store => store.admin);
    const [onlineUsers, setOnlineUsers] = useState<number>(0);
    const [countUsers, setCountUsers] = useState<number>(users.length);

    useEffect(() => {
        const totalUsers = users.length;
        const onlineUsersCount = users.filter(user => user.status).length;

        setCountUsers(totalUsers);
        setOnlineUsers(onlineUsersCount);
    }, [users]);

    return (
        <>
            <div className="content-wrapper" >
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-warning">
                                    <div className="inner">
                                        <h3>{countUsers}</h3>
                                        <p>User Registrations</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-person-add" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-danger">
                                    <div className="inner">
                                        <h3>{onlineUsers}</h3>
                                        <p>Online users</p>
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
