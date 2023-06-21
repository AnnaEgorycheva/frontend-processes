import { Link} from 'react-router-dom';
import { MenuProps } from 'antd';

export const LeftMenuItems = {
    isAuthItems: {
        studentsItems: [
            {
                label: (
                    <Link to='companies'>
                        Компании
                    </Link>
                ),
                key: 'companies',
            },
            {
                label: (
                    <Link to='positions'>
                        Позиции
                    </Link>
                ),
                key: 'positions',
            },
            {
                label: (
                    <Link to='applications'>
                        Мои заявки
                    </Link>
                ),
                key: 'applications',
            }
        ] as MenuProps['items'],
        schoolItems: [
            {
                label: (
                    <Link to='students'>
                        Студенты
                    </Link>
                ),
                key: 'students',
            },
            {
                label: (
                    <Link to='companies'>
                        Компании
                    </Link>
                ),
                key: 'companies',
            },
            {
                label: (
                    <Link to='positions'>
                        Позиции
                    </Link>
                ),
                key: 'positions',
            },
        ] as MenuProps['items'],
        companyItems: [
            {
                label: (
                    <Link to='positions'>
                        Позиции
                    </Link>
                ),
                key: 'positions',
            },
            {
                label: (
                    <Link to='students'>
                        Студенты
                    </Link>
                ),
                key: 'students',
            },
            {
                label: (
                    <Link to='applications'>
                        Мои заявки
                    </Link>
                ),
                key: 'applications',
            }
        ] as MenuProps['items']
    },
    notIsAuthItems: [] as MenuProps['items']
}