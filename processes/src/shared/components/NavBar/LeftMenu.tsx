import { Avatar, Menu } from "antd";
import React from "react";
import { ArrowLeftOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

const LeftMenu: React.FC = () => {

    return (
        <Menu mode="horizontal" theme="dark" style={{ fontWeight: 'bold' }}>
            <Menu.Item key="students">
                <Link to='students'>
                    Студенты
                </Link>
            </Menu.Item>
            <Menu.Item key="companies">
                <Link to='companies'>
                    Компании
                </Link>
            </Menu.Item>
            <Menu.Item key="positions">
                <Link to='positions'>
                    Позиции
                </Link>
            </Menu.Item>
            <Menu.Item key="applications">
                <Link to='applications'>
                    Заявки
                </Link>
            </Menu.Item>
        </Menu>
    )
}

export default LeftMenu;
{/* <>
                    <Link to='students' style={{ marginLeft: 20, color: 'white', fontWeight: 'bold' }}>Студенты</Link>
                    <Link to='companies' style={{ marginLeft: 20, color: 'white', fontWeight: 'bold' }}>Компании</Link>
                    <Link to='positions' style={{ marginLeft: 20, color: 'white', fontWeight: 'bold' }}>Позиции</Link>
                    <Link to='applications' style={{ marginLeft: 20, color: 'white', fontWeight: 'bold' }}>Заявки</Link>
                  </> */}