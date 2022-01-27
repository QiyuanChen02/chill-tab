import React from 'react';
import { Children } from '../types/commontypes';

//Should show loading page before authentication checked and data loaded
const Loading: React.FC<Children> = ({ children }) => {
    return (
        <div className="loading">{children}</div>
    );
};

export default Loading;
