import { useEffect, useState } from 'react';
import { Badge } from 'antd';
import './Users.css';
import { VerticalAlignMiddleOutlined, ApiOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getUsers, disconnectUser } from '@/features/adminSlice';

interface IData {
    id: number;
    username: string;
    email: string;
    status: boolean;
}

const Users = () => {
    const dispatch = useAppDispatch();
    const { users } = useAppSelector(store => store.admin);
    const [sortBy, setSortBy] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const handleSort = (column: string) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
        }
    };

    const sortedData = [...users].sort((a: IData, b: IData) => {
        const comparison = sortOrder === 'asc' ? 1 : -1;
        const _sortBy = sortBy;
        const sortFunctions: { [key: string]: (a: IData, b: IData) => number } = {
            username: (a, b) => comparison * a.username.localeCompare(b.username),
            email: (a, b) => comparison * a.email.localeCompare(b.email),
            status: (a, b) => comparison * (a.status === b.status ? 0 : (a.status ? -1 : 1)),
        };
        if (_sortBy && sortFunctions[_sortBy]) {
            return sortFunctions[_sortBy](a, b);
        } else {
            return 0;
        }
    });

    const handleDissconnect = (id: number) => {
        dispatch(disconnectUser(id)).then(() => {
            dispatch(getUsers());
        });
    };

    return (
        <>
            <div className="users-table">
                <table>
                    <thead>
                        <tr>
                            {/* <th className="login">  ///заменю на какое-нибудь другое поле
                                Login
                                <button onClick={() => handleSort('login')}>
                                    <VerticalAlignMiddleOutlined />
                                </button>
                            </th> */}
                            <th className="username">
                                Username
                                <button onClick={() => handleSort('username')}>
                                    <VerticalAlignMiddleOutlined />
                                </button>
                            </th>
                            <th className="email">
                                Email
                                <button onClick={() => handleSort('email')}>
                                    <VerticalAlignMiddleOutlined />
                                </button>
                            </th>
                            <th className="status">
                                Status
                                <button onClick={() => handleSort('status')}>
                                    <VerticalAlignMiddleOutlined />
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((user: IData, index: any) => (
                            <tr key={index}>
                                {/* <td className="login">{user.login}</td> */}
                                <td className="username">{user.username}</td>
                                <td className="email">{user.email}</td>
                                <td className="status">
                                    <Badge
                                        status={user.status ? 'success' : 'error'}
                                        text={user.status ? 'online' : 'offline'}
                                    />
                                    {user.status && (
                                        <button className='disable' onClick={() => handleDissconnect(user.id)}><ApiOutlined /></button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Users;