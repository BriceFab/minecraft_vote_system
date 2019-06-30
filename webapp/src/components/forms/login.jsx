import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Email from "@material-ui/icons/Email";
import Button from "../../templates/material-kit/components/CustomButtons/Button.jsx";
import CardBody from "../../templates/material-kit/components/Card/CardBody.jsx";
import CardHeader from "../../templates/material-kit/components/Card/CardHeader.jsx";
import CardFooter from "../../templates/material-kit/components/Card/CardFooter.jsx";
import CustomInput from "../../templates/material-kit/components/CustomInput/CustomInput.jsx";
import loginPageStyle from "../../templates/material-kit/assets/jss/material-kit-react/views/loginPage.jsx";
import combineStyles from "../../services/combineStyles.js";

const styles = theme => ({

});

const combinedStyles = combineStyles(loginPageStyle, styles);

class LoginForm extends Component {
  render() {
    const { classes } = this.props;

    return (
      <form className={classes.form}>
        <CardHeader color="primary" className={classes.cardHeader}>
          <h4>Connectez-vous</h4>
        </CardHeader>
        <CardBody>
          <CustomInput
            labelText="Email..."
            id="email"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "email",
              endAdornment: (
                <InputAdornment position="end">
                  <Email className={classes.inputIconsColor} />
                </InputAdornment>
              )
            }}
          />
          <CustomInput
            labelText="Password"
            id="pass"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "password",
              endAdornment: (
                <InputAdornment position="end">
                  <Icon className={classes.inputIconsColor}>
                    lock_outline
        </Icon>
                </InputAdornment>
              ),
              autoComplete: "off"
            }}
          />
        </CardBody>
        <CardFooter className={classes.cardFooter}>
          <Button simple color="primary" size="lg">
            Connexion
      </Button>
        </CardFooter>
      </form>
    );
  }
}
export default withStyles(combinedStyles)(LoginForm);