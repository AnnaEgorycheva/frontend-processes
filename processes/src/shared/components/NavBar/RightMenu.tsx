import { Avatar, Menu, MenuProps } from "antd";
import React from "react";
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

type PropsType = {
    isAuth: boolean,
    logout: () => void,
    onClick: any,
    keys: any
}

const RightMenu: React.FC<PropsType> = (props) => {
    const RightMenuItems = {
        isAuthItems: [
            // {
            //     label: (
            //         <Avatar size="large" 
            //                 style={{fontSize: '24px', borderColor: '#ffffff', background: '#001529', cursor: 'pointer' }} 
            //                 icon={<BellOutlined />} onClick={()=>{}}
            //         />
            //     ),
            //     key: 'notifications',
            // },
            {
                label: (
                    <Avatar size="large" 
                            style={{ borderColor: '#ffffff', background: '#001529', marginRight: 20, cursor: 'pointer' }} 
                            icon={<UserOutlined />} onClick={()=>{} }
                    />
                ),
                key: 'userMenu',
                children: [
                    {
                        label: (
                            <Link to='profile'>
                                Профиль
                            </Link>
                        ),
                        key: 'profile',
                    },
                    {
                        label: (
                            <Link to='logout'>
                                Выйти
                            </Link>
                        ),
                        key: 'logout',
                    },
                ],
              },
    
        ] as MenuProps['items'],
        notIsAuthItems: [
            {
                label: (
                    <Link to='login'>
                        Вход
                    </Link>
                ),
                key: 'login',
            } 
        ] as MenuProps['items']
    }

    let rightMenuItems: MenuProps['items'] = []
    rightMenuItems = props.isAuth ?  RightMenuItems.isAuthItems : RightMenuItems.notIsAuthItems

    return (
        <Menu onClick={props.onClick} selectedKeys={props.keys} mode="horizontal" theme='dark' items={rightMenuItems} style={{ justifyContent: "flex-end" }}/>
    )
}

export default RightMenu;


// <Menu mode="horizontal" theme="dark" style={{ fontWeight: 'bold' }}>
        //     <Menu.Item key="notifications">
        //         <Avatar size="large" 
        //                 style={{fontSize: '24px', borderColor: '#ffffff', background: '#001529', cursor: 'pointer' }} 
        //                 icon={<BellOutlined />} onClick={()=>{}}
        //         />
        //     </Menu.Item>
        //     <Menu.SubMenu
        //         title={
        //         <>
        //             <Avatar size="large" 
        //                     style={{ borderColor: '#ffffff', background: '#001529', marginRight: 20, cursor: 'pointer' }} 
        //                     icon={<UserOutlined />} onClick={()=>{} }
        //             />
        //         </>
        //         }
        //     >
        //         <Menu.Item key="profile">
        //             <Link to='profile'>
        //                 Профиль
        //             </Link>
        //         </Menu.Item>
        //         <Menu.Item key="logout">
        //             Выйти
        //         </Menu.Item>
        //     </Menu.SubMenu>
        // </Menu>