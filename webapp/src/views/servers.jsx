import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { withStyles, Grid, AppBar, Tab, Tabs, CircularProgress, List, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, Checkbox, ListItem, ListItemIcon, IconButton, ListSubheader, withWidth } from "@material-ui/core";
import { Helmet } from "react-helmet";
import compose from 'recompose/compose';
import CONFIG from '../config';
import Layout from './layouts/layout';
import ServersList from "../components/list/servers/servers-list";
import Icon from '@material-ui/core/Icon';
import { getTypes } from '../actions/type';
import { getTagsByType } from '../actions/tag';
import { getAllServersByFilters } from '../actions/server';

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
        backgroundColor: theme.palette.background.paper,
    },
    mainGrid: {
        margin: theme.spacing(3),
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
            console.log('set type 0');
            this.setState({ type: firstType });
            console.log('get tags');
            this.props.getTagsByType(firstType);
        }

        if (this.props.tags != prevProps.tags) {
            console.log('set tags');
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

    changeTags = (e) => {
        let tags = [...this.state.tags];
        tags.forEach(tag => {
            if (tag.id_tag === e.target.value) {
                tag.selected = e.target.checked;
            }
        })
        this.setState({
            tags: tags,
        }, () => {
            this.props.getAllServersByFilters(this.state.type, this.state.tags.filter(tag => tag.selected).map(tag => tag.id_tag));
        });
    };

    renderTypes() {
        const { classes } = this.props;

        if (this.props.types.length > 0) {
            return (
                <div className={classes.tabTypes}>
                    <AppBar position={'static'} color={'white'}>
                        <Tabs
                            value={this.state.type}
                            onChange={this.changeType.bind(this)}
                            variant="scrollable"
                            scrollButtons="on"
                            indicatorColor="secondary"
                            textColor="secondary"
                            centered>
                            {this.props.types.map(type => {
                                // return <Tab value={type.id_type} label={type.label} icon={<Icon>folder</Icon>} />
                                return <Tab value={type.id_type} label={type.label} icon={<img src={`/images/types/${type.label}.png`} alt={type.label} className={classes.tabIcon} />} />
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
        const { classes } = this.props;
        console.log('render tags', this.state.tags)
        if (this.state.tags.length > 0) {
            return (
                <List dense className={classes.listTags} subheader={
                    <ListSubheader component="div" id="list-tags">
                        Filtres tags
                    </ListSubheader>}>
                    {this.state.tags.map(tag => {
                        const labelId = `tag-list-${tag.id_tag}`;
                        return (
                            <ListItem key={tag.id_tag} role={undefined} dense button>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        value={tag.id_tag}
                                        checked={tag.selected}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                        onClick={this.changeTags.bind(this)}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={`${tag.label} (1)`} />
                            </ListItem>
                        );
                    })}
                </List>
            )
        } else {
            return <CircularProgress className={classes.progress} />
        }
    }

    renderServers() {
        const { classes } = this.props;

        if (this.props.servers.length > 0) {
            return this.props.servers.map(server => {
                return <div>server</div>
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