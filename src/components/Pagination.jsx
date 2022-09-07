import React, { useEffect } from 'react';
// import { Pagination, PaginationItem } from '@material-ui/lab';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { Link } from 'react-router-dom';

import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, getPostsBySearch } from '../actions/posts';

const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector((state) => state.posts);
    const classes = useStyles();
    const dispatch = useDispatch()


    useEffect(() => {
        if (page) dispatch(getPosts(page));

    }, [page, dispatch])

    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={parseInt(page) || 1}
            varaint="outlined"
            color="primary"
            renderItem={(item) => (
                
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />

            )}
        />
    )
}

export default Paginate;