import React, { Component } from "react";
import { withStyles, Paper, Grid, Typography } from "@material-ui/core";
import Person from "@material-ui/icons/Person";
import CardHeader from "../../templates/material-kit/components/Card/CardHeader.jsx";
import loginPageStyle from "../../templates/material-kit/assets/jss/material-kit-react/views/loginPage.jsx";
import combineStyles from "../../services/combineStyles.js";
import { Field, reduxForm } from 'redux-form';
import TextField from './fields/text-field';
import SelectField from './fields/select-field';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { register } from '../../actions/user';
import { validateForm } from "redux-form-validators";
import userValidator from "../../validators/user.js";
import { isMobile } from "react-device-detect";
import classNames from 'classnames';
import Button from "../../templates/material-kit/components/CustomButtons/Button.jsx";

const styles = theme => ({
  root: {
    // margin: '90px 30px',
    margin: `90px ${isMobile ? '26px' : '13px'} 0px 26px`,
    padding: 25,
  },
  title: {
    // textDecoration: 'underline',
    fontWeight: 'bold !important'
  },
  gridItem: {
    paddingBottom: 15
  },
  cardTitle: {
    marginTop: -75,
  }
});

const combinedStyles = combineStyles(loginPageStyle, styles);

class ServerForm extends Component {
  onSubmit({ ...props }) {
    this.props.register(props).then((res) => {
      if (res && res.success) {
        this.props.showLogin();
      }
    });
  }

  render() {
    const { classes, handleSubmit, pristine, submitting, reset } = this.props;

    return (
      <Paper className={classes.root}>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Grid container xs={12}>
            <Grid item xs={12} className={classes.gridItem}>
              <CardHeader color="primary" className={classNames(classes.cardHeader, classes.cardTitle)}>
                <Typography variant={'h4'} component={'h1'} className={classes.title}>
                  Ajouter un serveur
              </Typography>
              </CardHeader>
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              {/* <Field
              name="type"
              component={SelectField}
              placeholder="Type de serveur"
              formControlProps={{
                fullWidth: true
              }}
              isClearable={true}
              touchOnChange={true}
            >
            </Field> */}
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <Field
                name="tags"
                component={SelectField}
                placeholder="Tags du serveur"
                formControlProps={{
                  fullWidth: true
                }}
                isClearable={true}
                touchOnChange={true}
              >
              </Field>
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <Field
                name="name"
                component={TextField}
                label="Nom du serveur"
                icon={<Person className={classes.inputIconsColor} />}
                formControlProps={{
                  fullWidth: true
                }}
              />
            </Grid>
            <Grid item xs={6} className={classes.gridItem}>
              <Field
                name="url"
                component={TextField}
                label="Url du site"
                icon={<Person className={classes.inputIconsColor} />}
                formControlProps={{
                  fullWidth: true
                }}
              />
            </Grid>
            <Grid item xs={6} className={classes.gridItem}>
              <Field
                name="ip"
                component={TextField}
                label="IP du serveur"
                icon={<Person className={classes.inputIconsColor} />}
                formControlProps={{
                  fullWidth: true
                }}
              />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <Field
                name="description"
                component={TextField}
                label="Description"
                icon={<Person className={classes.inputIconsColor} />}
                formControlProps={{
                  fullWidth: true
                }}
              />
            </Grid>
            <Grid item xs={12} container justify={'flex-end'}>
              <Button color={'rose'} onClick={() => {this.props.close()}}>
                Annuler
              </Button>
              <Button disabled={pristine || submitting} onClick={reset}>
                Réinitialiser
              </Button>
              <Button type={'submit'} color="primary" disabled={pristine || submitting}>
                Ajouter
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );
  }
}

const validate = validateForm({
  name: userValidator.username,
  type: userValidator.username,
})

const form = {
  form: 'ServerForm',
  validate,
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    register
  }, dispatch)
}

export default reduxForm(form)(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(ServerForm)));