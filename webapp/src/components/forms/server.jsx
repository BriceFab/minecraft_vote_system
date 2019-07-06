import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import loginPageStyle from "../../templates/material-kit/assets/jss/material-kit-react/views/loginPage.jsx";
import combineStyles from "../../services/combineStyles.js";
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { register } from '../../actions/user';
import { validateForm } from "redux-form-validators";
import userValidator from "../../validators/user.js";
import DialogFormContents from "../../templates/dialog-form-contents.jsx";
import TextField from './fields/text-field';
import SelectField from './fields/select-field';
import Person from "@material-ui/icons/Person";
import DialogFormActions from "../../templates/dialog-form-actions.jsx";

const styles = theme => ({
  gridItem: {
    paddingBottom: 15
  },
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

    const actions = <DialogFormActions pristine={pristine} submitting={submitting} reset={reset} />

    return (
      <DialogFormContents onSubmit={handleSubmit(this.onSubmit.bind(this))} actions={actions}>
        <Field
          name="tags"
          component={SelectField}
          placeholder="Tags du serveur"
          formControlProps={{
            fullWidth: true
          }}
          isClearable
          touchOnChange
        >
        </Field>
        <Field
          name="name"
          component={TextField}
          label="Nom du serveur"
          icon={<Person className={classes.inputIconsColor} />}
          formControlProps={{
            fullWidth: true
          }}
        />
        <Field
          name="url"
          component={TextField}
          label="Url du site"
          icon={<Person className={classes.inputIconsColor} />}
          size={6}
          formControlProps={{
            fullWidth: true
          }}
        />
        <Field
          name="ip"
          component={TextField}
          label="IP du serveur"
          icon={<Person className={classes.inputIconsColor} />}
          size={6}
          formControlProps={{
            fullWidth: true
          }}
        />
        <Field
          name="description"
          component={TextField}
          label="Description"
          icon={<Person className={classes.inputIconsColor} />}
          formControlProps={{
            fullWidth: true
          }}
        />
      </DialogFormContents>
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