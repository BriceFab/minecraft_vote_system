import React, { Component } from "react";
import { withStyles, Grid } from "@material-ui/core";

import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import GridItem from "../../templates/material-kit/components/Grid/GridItem.jsx";
import GridContainer from "../../templates/material-kit/components/Grid/GridContainer";
import Button from "../../templates/material-kit/components/CustomButtons/Button.jsx";
import Card from "../../templates/material-kit/components/Card/Card.jsx";
import CardBody from "../../templates/material-kit/components/Card/CardBody.jsx";
import CardHeader from "../../templates/material-kit/components/Card/CardHeader.jsx";
import CardFooter from "../../templates/material-kit/components/Card/CardFooter.jsx";
import CustomInput from "../../templates/material-kit/components/CustomInput/CustomInput.jsx";

import loginPageStyle from "../../templates/material-kit/assets/jss/material-kit-react/views/loginPage.jsx";
import combineStyles from "../combineStyles.js";

const styles = theme => ({
  gridCenter: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
});

const combinedStyles = combineStyles(loginPageStyle, styles);

class LoginForm extends Component {
    render() {
        const {classes} = this.props;

        return (
              <GridItem xs={12} sm={12} md={4} className={classes.gridCenter}>
                <Card>
                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Connexion ou inscription</h4>
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
                      <Grid container justify={"center"}>
                        <Grid item>
                        <Button simple color="primary" size="lg">
                            Connexion
                            </Button>
                        </Grid>
                        <Button simple color="rose" size="lg">
                            Créer un compte
                            </Button>
                        </Grid>
                        <Grid item>
                      </Grid>
                      {/* <GridItem xs={12} sm={12} md={4}>
                        <Button simple color="primary" size="lg">
                            Connexion
                            </Button>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <Button simple color="primary" size="lg">
                            Connexion
                            </Button>
                        </GridItem> */}
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
        );
    }
}
export default withStyles(combinedStyles)(LoginForm);