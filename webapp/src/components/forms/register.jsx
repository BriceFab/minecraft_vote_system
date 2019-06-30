import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Email from "@material-ui/icons/Email";
import Button from "../../templates/material-kit/components/CustomButtons/Button.jsx";
import Card from "../../templates/material-kit/components/Card/Card.jsx";
import CardBody from "../../templates/material-kit/components/Card/CardBody.jsx";
import CardHeader from "../../templates/material-kit/components/Card/CardHeader.jsx";
import CardFooter from "../../templates/material-kit/components/Card/CardFooter.jsx";
import CustomInput from "../../templates/material-kit/components/CustomInput/CustomInput.jsx";
import loginPageStyle from "../../templates/material-kit/assets/jss/material-kit-react/views/loginPage.jsx";
import combineStyles from "../../services/combineStyles.js";

const styles = theme => ({
  gridCenter: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
});

const combinedStyles = combineStyles(loginPageStyle, styles);

class RegisterForm extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Card>
        <form className={classes.form}>
          <CardHeader color="primary" className={classes.cardHeader}>
            <h4>S'enregistrer</h4>
          </CardHeader>
          <CardBody>
          <CustomInput
              labelText="Username..."
              id="username"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type: "username",
                endAdornment: (
                  <InputAdornment position="end">
                    <Email className={classes.inputIconsColor} />
                  </InputAdornment>
                )
              }}
            />
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
      </Card>
    );
  }
}
export default withStyles(combinedStyles)(RegisterForm);