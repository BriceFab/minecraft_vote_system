import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper, Grid, Button, Divider, ButtonGroup, Badge, Chip, TextField, InputAdornment } from '@material-ui/core';
import styles from '../../../theme/styles/server-cardStyle';
import Icon from '@material-ui/core/Icon';
import clipboard from 'copy-to-clipboard';
import { toast } from 'react-toastify';

class ServerCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false,
    }
  }

  renderIP(ip) {
    const { classes } = this.props;
    return (
      <TextField className={classes.TextFieldIP} disabled color={'primary'} variant={'outlined'} fullWidth value={this.state.copied ? 'IP copiée !' : ip} InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Icon>file_copy</Icon>
          </InputAdornment>
        ),
        classes: { input: classes.inputIP, formControl: classes.inputIP }
      }}
        onClick={() => {
          if (!this.state.copied) {
            toast.info('IP copiée !');
            clipboard(ip);
            this.setState({ copied: true });
            setTimeout(() => {
              this.setState({ copied: false });
            }, 5000)
          } else {
            toast.warn('IP déjà copiée');
          }
        }}
      />
    )
  }

  render() {
    const { classes, server } = this.props;

    return (
      <Paper>
        <div className={classes.mainGrid}>
          <Grid container>
            <Grid xs={1} className={classes.gridCenter}>
              <Badge className={classes.margin} badgeContent={server.position} max={999} color={'secondary'}>
                <Icon>equalizer</Icon>
              </Badge>
            </Grid>
            <Grid xs={8}>{server.name} - v1</Grid>
            <Grid xs={3} className={classes.gridRight}>{server.nbrVotes} <Icon color={'primary'}>thumb_up_alt</Icon></Grid>
          </Grid>
          <Grid container>
            <Grid xs={1} className={classes.gridCenter}>
              <img src={`/images/tmp/server_logo.png`} className={classes.logo} />
            </Grid>
            <Grid xs={8}>
              <Grid container>
                <Grid xs={12} className={classes.gridCenter}>
                  <img src={`/images/tmp/mc-banner.gif`} className={classes.banner} />
                </Grid>
                <Grid xs={12} className={classes.gridTags}>
                  {
                    server.server_tags.map(server_tag => {
                      return <Chip label={`${server_tag.tag.label}`} variant="outlined" color="primary" size="small" className={classes.tagChip} />
                    })
                  }
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={3}>
              <Grid container>
                <Grid xs={12}>version: 1.7.10</Grid>
                <Grid xs={12}>crack autorisés</Grid>
                <Grid xs={12}>ip</Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* <Divider variant={'middle'} /> */}
          <Grid container>
            <Grid xs={1}></Grid>
            <Grid xs={8}>
              {server.ip ? this.renderIP(server.ip) : 'if mc render launcher button'}
            </Grid>
            <Grid xs={3} className={classes.gridRight}>
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