import { selectUserRole } from "../../Store/selectors/AuthSelector";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const MainPageRedirect: React.FC = () => {
    const[path, setPath] = useState<string>();
    const userRole = useSelector(selectUserRole)
    useEffect(() => {
        if(path === undefined) {
            if (!!userRole) {
                switch (userRole) {
                    case 'STUDENT': setPath('/companies'); break
                    case 'SCHOOL': setPath('/students'); break
                    case 'COMPANY': setPath('/positions'); break
                }
            }
            else
                setPath('/login')
        }
    }, [])
    // const userRole = useSelector(selectUserRole)
    // let pathname: string = '/'
    // if (!!userRole) {
    //     switch (userRole) {
    //         case 'STUDENT': pathname='/companies'; break
    //         case 'SCHOOL': pathname='/students'; break
    //         case 'COMPANY': pathname='/positions'; break
    //     }
    // }
    // else
    //     pathname='/login'
    return (
        <>
            {
                path !== undefined && <Navigate to={path}/>
            }
        </>
        // <Navigate to={{pathname}}/>
    )
}

export default MainPageRedirect