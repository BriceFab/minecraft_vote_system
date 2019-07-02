import React from "react";
import { connect } from 'react-redux';
import { toast } from "react-toastify";

const LogoutPage = ({loggedIn, ...props}) => {
    if (loggedIn) {
        toast.success('Vous avez été déconnecter');

        // TODO ACTION LOGOUT

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

export default connect(mapStateToProps)(LogoutPage);