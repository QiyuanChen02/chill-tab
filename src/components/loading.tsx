import React from 'react';
import { Children } from '../types/commontypes';

const Loading: React.FC<Children> = ({ children }) => {
    return (
        <div className="loading">{children}</div>
    );
};

export default Loading;
