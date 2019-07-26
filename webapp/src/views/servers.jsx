import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { withStyles, Grid, AppBar, Tab, Tabs, CircularProgress, List, ListItemText, Checkbox, ListItem, ListItemIcon, ListSubheader, withWidth, Paper } from "@material-ui/core";
import { Helmet } from "react-helmet";
import compose from 'recompose/compose';
import CONFIG from '../config';
import Layout from './layouts/layout';
import { getTypes } from '../actions/type';
import { getTagsByType } from '../actions/tag';
import { getAllServersByFilters } from '../actions/server';
import ServerCard from "../components/list/servers/server-card";
import classnames from 'classnames';

const styles = theme => ({
    tabTypes: {
        flexGrow: 1,
        width: '100%',
    },
    progress: {
        margin: theme.spacing(2),
    },
    tabIcon: {
        width: 30,
        height: 30
    },
    listTags: {
        // width: '100%',
        // maxWidth: 200,
        // minWidth: 200,
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
    },
    listTagsMobile: {
        marginRight: 0,
    },
    mainGrid: {
        padding: theme.spacing(3),
    },
    serverCard: {
        marginBottom: theme.spacing(2)
    }
});

class ServersPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: null,
            tags: [],
        }
    }

    componentDidMount() {
        this.props.getTypes();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const firstType = this.props.types ? this.props.types[0].id_type : null;
        if (this.props.types !== prevProps.types && prevState.type !== firstType) {
            this.setState({ type: firstType });
            this.props.getTagsByType(firstType);
        }

        if (this.props.tags !== prevProps.tags) {
            let initTags = [...this.props.tags].map(tag => {
                tag.selected = false;
                return tag;
            });
            this.setState({ tags: initTags }, () => {
                this.props.getAllServersByFilters(this.state.type, this.state.tags.filter(tag => tag.selected).map(tag => tag.id_tag));
            })
        }
    }

    changeType(e, value) {
        this.setState({ type: value })
    }

    changeTags = (e, values) => {
        let value = null;
        let checked = null;
        if (e && e.target) {
            value = e.target.value;
            checked = e.target.checked;
        } else {
            value = values.value;
            checked = values.checked;
        }

        let tags = [...this.state.tags];
        tags.forEach(tag => {
            if (tag.id_tag === value) {
                tag.selected = checked;
            }
        });
        this.setState({
            tags: tags,
        }, () => {
            this.props.getAllServersByFilters(this.state.type, this.state.tags.filter(tag => tag.selected).map(tag => tag.id_tag));
        });
    };

    clickTagList(checkBox) {
        this.changeTags(null, {
            value: checkBox.props.value,
            checked: !checkBox.props.checked,
        });
    }

    renderTypes() {
        const { classes } = this.props;

        if (this.props.types.length > 0) {
            return (
                <div className={classes.tabTypes}>
                    <AppBar position={'static'} color={'inherit'}>
                        <Tabs
                            value={this.state.type}
                            onChange={this.changeType.bind(this)}
                            variant="scrollable"
                            scrollButtons="on"
                            indicatorColor={'secondary'}
                            textColor={'secondary'}>
                            {this.props.types.map(type => {
                                return <Tab key={`types-tab-${type.id_type}`} value={type.id_type} label={type.label} icon={<img src={`/images/types/${type.label}.png`} alt={type.label} className={classes.tabIcon} />} />
                            })}
                        </Tabs>
                    </AppBar>
                </div>
            )
        } else {
            return <CircularProgress className={classes.progress} />
        }
    }

    renderTags() {
        const { classes, width } = this.props;

        const isMobile = ['xs', 'sm'].includes(width);

        if (this.state.tags.length > 0) {
            return (
                <Paper className={isMobile ? classnames(classes.listTags, classes.listTagsMobile) : classes.listTags}>
                    <List dense subheader={
                        <ListSubheader component="div" id="list-tags">
                            Filtres tags
                    </ListSubheader>}>
                        {this.state.tags.map(tag => {
                            const labelId = `tag-list-${tag.id_tag}`;
                            const checkBox = (
                                <Checkbox
                                    edge="start"
                                    value={tag.id_tag}
                                    checked={tag.selected}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    onClick={this.changeTags.bind(this)}
                                />
                            );

                            return (
                                <ListItem key={tag.id_tag} role={undefined} dense button onClick={this.clickTagList.bind(this, checkBox)}>
                                    <ListItemIcon>
                                        {checkBox}
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={`${tag.label} (1)`} />
                                </ListItem>
                            );
                        })}
                    </List>
                </Paper>
            )
        } else {
            return <CircularProgress className={classes.progress} />
        }
    }

    renderServers() {
        const { classes } = this.props;

        if (this.props.servers.length > 0) {
            return this.props.servers.map(server => {
                return (
                    <ServerCard key={`servers-card-${server.id_server}`} server={server} />
                )
            })
        } else {
            return <CircularProgress className={classes.progress} />
        }
    }

    render() {
        const { classes, width } = this.props;

        const isMobile = ['xs', 'sm'].includes(width);

        return (
            <>
                <Helmet>
                    <title>{CONFIG.APP.NAME} - Liste des serveurs</title>
                    <link rel="canonical" href={`${CONFIG.APP.FULL_URL}/`} />
                    <meta charSet="utf-8" />
                    <meta name="description" content="TODO" />
                    <meta name="keywords" cpntent="TODO" />
                </Helmet>

                <Layout title={'Liste des serveurs'}>

                    {this.renderTypes()}

                    <Grid container className={classes.mainGrid}>
                        <Grid item xs={isMobile ? 12 : 3}>
                            {this.renderTags()}
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 9}>
                            {this.renderServers()}
                        </Grid>
                    </Grid>

                </Layout>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    types: state.type.all,
    tags: state.tag.all_by_type,
    servers: state.server.all_by_filters,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTypes,
        getTagsByType,
        getAllServersByFilters,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(compose(withWidth(), withStyles(styles))(ServersPage));