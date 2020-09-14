import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import { removeAlert } from '../../actions/alert';

const AlertBox = ({ alerts, removeAlert }) =>
    alerts !== null && alerts.length > 0 && alerts.map(alert => (
        <div key={alert.id}>
            <Alert
                color={alert.alertType}
                isOpen={alert.open}
                toggle={() => removeAlert(alert.id)}
                className="text-center">
                    {alert.msg}
            </Alert>
        </div>
    ));

AlertBox.propTypes = {
    alerts: PropTypes.array.isRequired,
    removeAlert: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(
    mapStateToProps,
    { removeAlert }
)(AlertBox);
