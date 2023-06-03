import React from 'react';

interface IProps {
    id: string,
};

const StudentForSchool: React.FC<IProps> = ({ id }) => {
    console.log(id);
    return (
        <>StudentForSchool</>
    )
};

export default StudentForSchool;