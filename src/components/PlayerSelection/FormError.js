import React from 'react';

const FormError = props => {

    return (
        <div className="ui negative message">
            <i className="close icon"/>
            <div className="header">{props.errorHeader}</div>
            <div>{props.errorMessage}</div>
        </div>
    )
};

export default FormError;