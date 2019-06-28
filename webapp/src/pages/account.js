import React, { Component } from "react";
import { withStyles, DialogTitle, DialogContent, DialogContentText, Modal } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import LoginForm from '../components/forms/login';

const styles = theme => ({

});

class AccountPage extends Component {
    constructor(props) {
        super(props);

        //not logged
        if (true) {
          // props.history.push('/login');
        }

        this.state = {
          open: false
        };
    }

   handleClose() {
      this.setState({open:false})
    }

    render() {
        const {classes} = this.props;

        return (
          <>
              <Modal open={true} style={{overflowY: 'scroll'}} onClose={() => alert('on close')}>
                <LoginForm />
              </Modal>
          </>
        );
    }
}
export default withStyles(styles)(AccountPage);