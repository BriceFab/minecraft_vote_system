import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import {
  IconButton,
  CircularProgress,
  Grid,
  Typography
} from '@material-ui/core';
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon
} from '@material-ui/icons';
// import { Dashboard as DashboardLayout } from 'layouts';
// import { getProducts } from 'services/product';
// import { ProductsToolbar, ProductCard } from './components';
import styles from '../../../theme/styles/servers-listStyle';
import ServerCard from './server-card';
import Layout from '../../../views/layouts/layout';

class ServersList extends Component {
  signal = true;

  state = {
    isLoading: false,
    limit: 6,
    products: [  {
        id: 'DEV738089',
        title: 'Dropbox',
        description:
          'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.',
        imageUrl: '/images/products/product_1.png',
        totalDownloads: '594',
        price: '10',
        status: 'published',
        createdAt: '27/03/2019'
      },],
    productsTotal: 0,
    error: null
  };

//   async getProducts(limit) {
//     try {
//       this.setState({ isLoading: true });

//       const { products, productsTotal } = await getProducts(limit);

//       if (this.signal) {
//         this.setState({
//           isLoading: false,
//           products,
//           productsTotal,
//           limit
//         });
//       }
//     } catch (error) {
//       if (this.signal) {
//         this.setState({
//           isLoading: false,
//           error
//         });
//       }
//     }
//   }

  componentWillMount() {
    this.signal = true;

    const { limit } = this.state;

    // this.getProducts(limit);
  }

  componentWillUnmount() {
    this.signal = false;
  }

  renderProducts() {
    const { classes } = this.props;
    const { isLoading, products } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <Typography variant="h6">There are no products available</Typography>
      );
    }

    return (
      <Grid
        container
        spacing={3}
      >
        {products.map(product => (
          <Grid
            item
            key={product.id}
            lg={4}
            md={6}
            xs={12}
          >
            <Link to="#">
              <ServerCard product={product} />
            </Link>
          </Grid>
        ))}
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;

    return (
        <div className={classes.root}>
          {/* <ProductsToolbar /> */}
          <div className={classes.content}>{this.renderProducts()}</div>
          <div className={classes.pagination}>
            <Typography variant="caption">1-6 of 20</Typography>
            <IconButton>
              <ChevronLeftIcon />
            </IconButton>
            <IconButton>
              <ChevronRightIcon />
            </IconButton>
          </div>
        </div>
    );
  }
}

ServersList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ServersList);