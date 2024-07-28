import { useEffect, useState } from 'react';
import { Badge } from 'antd';
import './Users.css';
import { VerticalAlignMiddleOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getUsers } from '@/features/adminSlice';

interface IData {
    id: number;
    username: string;
    email: string;
    isEmailConfirmed: boolean;
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
            confirmed: (a, b) => comparison * (a.isEmailConfirmed === b.isEmailConfirmed ? 0 : (a.isEmailConfirmed ? -1 : 1)),
        };
        if (_sortBy && sortFunctions[_sortBy]) {
            return sortFunctions[_sortBy](a, b);
        } else {
            return 0;
        }
    });

    return (
        <>
            <div className="users-table">
                <table>
                    <thead>
                        <tr>
                            <th className="username">
                                Имя пользователя
                                <button style={{ borderRadius: '5px' }} onClick={() => handleSort('username')}>
                                    <VerticalAlignMiddleOutlined />
                                </button>
                            </th>
                            <th className="email">
                                Email
                                <button style={{ borderRadius: '5px' }} onClick={() => handleSort('email')}>
                                    <VerticalAlignMiddleOutlined />
                                </button>
                            </th>
                            <th className="confirmed">
                                Подтверждение почты
                                <button style={{ borderRadius: '5px' }} onClick={() => handleSort('confirmed')}>
                                    <VerticalAlignMiddleOutlined />
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((user: IData, index: any) => (
                            <tr key={index}>
                                <td className="username">{user.username}</td>
                                <td className="email">{user.email}</td>
                                <td className="confirmed">{user.isEmailConfirmed}
                                    <Badge
                                        status={user.isEmailConfirmed ? 'processing' : 'default'}
                                        text={user.isEmailConfirmed ? 'да' : 'нет'}
                                    />
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
