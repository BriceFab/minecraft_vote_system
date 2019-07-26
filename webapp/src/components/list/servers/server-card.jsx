import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper, Grid, Button, Divider, ButtonGroup, Badge } from '@material-ui/core';
import styles from '../../../theme/styles/server-cardStyle';
import Icon from '@material-ui/core/Icon';
import classnames from 'classnames';

class ServerCard extends Component {
  render() {
    const { classes, server } = this.props;

    return (
      <Paper>
        <div className={classes.mainGrid}>
          <Grid container>
            <Grid xs={1} className={classes.gridCenter}>
              <Badge className={classes.margin} badgeContent={1} max={999} color={'secondary'}>
                <Icon>equalizer</Icon>
              </Badge>
            </Grid>
            <Grid xs={8}>{server.name}</Grid>
            <Grid xs={3} className={classes.gridRight}>9'999 <Icon color={'primary'}>thumb_up_alt</Icon></Grid>
          </Grid>
          <Grid container>
            <Grid xs={1} className={classnames(classes.gridCenter, classes.logo)}>
              <img src={`/images/tmp/server_logo.png`} />
            </Grid>
            <Grid xs={8}>
              <Grid container>
                <Grid xs={12}>Banner</Grid>
                <Grid xs={12}>Tags</Grid>
              </Grid>
            </Grid>
            <Grid xs={3}>
              <Grid container>
                <Grid xs={12}>version</Grid>
                <Grid xs={12}>crack</Grid>
                <Grid xs={12}>ip</Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* <Divider variant={'middle'} /> */}
          <Grid container>
            <Grid xs={12} className={classes.gridRight}>
              <ButtonGroup size="small" aria-label="Small outlined button group">
                <Button>Voter</Button>
                <Button>Visiter</Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </div>
      </Paper>
    );
  }
}

ServerCard.propTypes = {
  server: PropTypes.object.isRequired
};

export default withStyles(styles)(ServerCard);