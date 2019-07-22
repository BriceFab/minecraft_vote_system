import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button } from '@material-ui/core';
import { Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    marginTop: '150px',
    textAlign: 'center'
  },
  image: {
    display: 'inline-block',
    marginTop: '50px',
    maxWidth: '100%',
    width: '554px'
  }
});

class NotFound extends Component {
  render() {
    const { classes } = this.props;
    const { location } = this.props;

    return (
      <div className={classes.root}>
        <Grid
          container
          justify="center"
          spacing={4}>
          <Grid
            item
            lg={6}
            xs={12}>
            <div className={classes.content}>
              <Typography variant={'h1'}>
                Page introuvable
              </Typography>
              <Typography component={'p'} variant={'subtitle1'}>
                La page à l'adresse <code>{location.pathname}</code> n'est pas disponible.
              </Typography>
              <Grid>
                <Link to={'/'}>
                  <Button variant={'outlined'}>Retour</Button>
                </Link>
              </Grid>
              <img
                alt={'page introuvable'}
                className={classes.image}
                src="/images/not_found.png"
              />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

NotFound.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NotFound);