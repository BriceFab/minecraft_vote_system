import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DialogContent from './dialog-content';
import DialogActions from './dialog-actions';
import { Grid } from '@material-ui/core';

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

const defaultSize = 12;

const DialogFormContents = withStyles(styles)(props => {
    const { classes, children, onSubmit, actions } = props;
    return (
        <form onSubmit={onSubmit}>
            <DialogContent dividers>
                <Grid container>
                    {
                        children.map((field, index) => {
                            return (
                                <Grid key={`field${index}`} item xs={field.props.size ? field.props.size : defaultSize} className={classes.gridItem}>
                                    {field}
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </DialogContent>
            <DialogActions>
                {actions}
            </DialogActions>
        </form>
    );
});
export default DialogFormContents;