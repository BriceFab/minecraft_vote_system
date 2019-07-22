import React from "react";
import { connect } from 'react-redux';
import { toast } from "react-toastify";
import { logout } from '../actions/user';
import { bindActionCreators } from "redux";

const LogoutPage = ({ loggedIn, ...props }) => {
    if (loggedIn) {
        props.logout();
        toast.success('Vous avez été déconnecter');
        props.history.push('/');
    } else {
        toast.error('Vous n\'êtes pas connecté');
        props.history.push('/login');
    }
    return <div>chargement..</div>
}

const mapStateToProps = (state) => ({
    loggedIn: state.user.loggedIn && state.user.token,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        logout
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);