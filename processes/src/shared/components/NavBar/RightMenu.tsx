import { Avatar, Menu } from "antd";
import React from "react";
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

const RightMenu: React.FC = () => {

    return (
        <Menu mode="horizontal" theme="dark" style={{ fontWeight: 'bold' }}>
            <Menu.Item key="notifications">
                <Avatar size="large" 
                        style={{fontSize: '24px', borderColor: '#ffffff', background: '#001529', cursor: 'pointer' }} 
                        icon={<BellOutlined />} onClick={()=>{}}
                />
            </Menu.Item>
            <Menu.SubMenu
                title={
                <>
                    <Avatar size="large" 
                            style={{ borderColor: '#ffffff', background: '#001529', marginRight: 20, cursor: 'pointer' }} 
                            icon={<UserOutlined />} onClick={()=>{} }
                    />
                </>
                }
            >
                <Menu.Item key="profile">
                    <Link to='profile'>
                        Профиль
                    </Link>
                </Menu.Item>
                <Menu.Item key="logout">
                    Выйти
                </Menu.Item>
            </Menu.SubMenu>
        </Menu>
    )
}

export default RightMenu;