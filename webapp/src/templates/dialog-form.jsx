import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { withWidth } from '@material-ui/core';

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography color={'primary'} variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogForm = props => {
    const isMobile = ['xs', 'sm'].includes(props.width);

    return (
        <Dialog
            onClose={props.onClose}
            aria-labelledby="formDialog"
            open={props.open}
            fullScreen={isMobile}
            maxWidth={props.maxWidth}>
            <DialogTitle id="formDialog" onClose={props.onClose}>
                {props.title}
            </DialogTitle>
            {props.children}
        </Dialog>
    )
}
export default withWidth()(DialogForm);