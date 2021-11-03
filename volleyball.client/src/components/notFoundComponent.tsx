import React, { FunctionComponent } from 'react';

const NotFoundComponent: FunctionComponent = () => {
    return <div style={{ marginTop: 50 }}>
        <img src={require('../assets/notFound.jpg')}></img>
        <div>Page not found</div>
    </div>;
}

export default NotFoundComponent;