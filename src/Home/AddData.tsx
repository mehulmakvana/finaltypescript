import { history } from '../helpers/history';
import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import { useDispatch } from "react-redux";
import { logout } from "../actions/auth";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


const StyledTableCell = withStyles((theme) => ({
    head: {
        // backgroundColor: theme.palette.common.black,
        //color: theme.palette.common.white,
        fontSize: 18,
        backgroundColor: "lightgray",
        color: "black"

    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function Data() {


    const [id, setId] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {

        UserService.getAddData().then(
            (response) => {
                const { data = [] } = response;
                setPosts(data.data.todos);
                console.log("show data:::::::::::::", response.data.data)

            }

        );
    }, []);


    const dispatch = useDispatch();

    const handleLogout = (e: any) => {
        e.preventDefault();

        dispatch(logout())

    }

    const getData = () => {
        UserService.getAddData().then((getData) => {
            setPosts(getData.data.data.todos);
        });
    };

    // const getDataDsc = () => {

    //     UserService.getAddDataDsc()
    //         .then((getData) => {
    //             setPosts(getData.data.data.todos);
                 
    //     });

    // };

    const nextPath = (path: any) => {
        history.push(path)
    }

    const classes = useStyles();

    React.useEffect(() => {
        const node = loadCSS(
            'https://use.fontawesome.com/releases/v5.12.0/css/all.css',

        );

        return () => {
            node.parentNode!.removeChild(node);
        };
    }, []);


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (id:any) => {
          setId(id);
         
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onDelete = (id:any) => {
       
        UserService.deleteData(id)
            .then(() => {
                getData();
            })

        setOpen(false);
    }


    const handleTableChange = (sorter: any) => {
        UserService.SortData(sorter.field, sorter.order === "ascend" ? 'asc' : 'desc')
        .then((getData) => {
            setPosts(getData.data.data.todos);
        })
    }  

    
    return (
        <div>

            <h3>ToDos List</h3>
            <Icon id="icon" className="fa fa-plus-circle" color="primary" style={{ fontSize: 30 }} onClick={() => nextPath('/home')}></Icon>

            <br />
            <button onClick={handleLogout}>Logout</button>

            <br />
            <br />
            <br />

            <TableContainer component={Paper} >
                <Table className={classes.table} aria-label="customized table"
                
                >
                    <TableHead>
                        <TableRow >
                            <StyledTableCell align="center" onClick={(sorter) => handleTableChange(sorter)}
                            
                        >ID</StyledTableCell>
                            <StyledTableCell align="center" >Data</StyledTableCell>
                            <StyledTableCell align="center">Date</StyledTableCell>
                            <StyledTableCell align="center">Priority</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {
                            posts.length !== 0 ?
                                posts.map((post: any, index: any) => {

                                    return (

                                        <StyledTableRow key={post.name}>

                                            <StyledTableCell align="center">
                                                {post.id}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{post.data}</StyledTableCell>
                                            <StyledTableCell align="center">{post.due_date}</StyledTableCell>
                                            <StyledTableCell align="center">{post.priority}</StyledTableCell>

                                            <StyledTableCell align="center">
                                                {/* <button onClick={() => onDelete(post.id)} >Delete</button>  */}
                                                <Button variant="outlined" color="primary" onClick={()=>handleClickOpen(post.id)}>
                                                    Delete
                                                </Button>
                         
                                            </StyledTableCell>


                                        </StyledTableRow>

                                    )
                                })
                                : 'No data found'
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <div>


                <Dialog open={open} >

                    <DialogTitle id="alert-dialog-title">{"Are You Sure Delete?"}</DialogTitle>

                    <DialogActions>

                        <Button onClick={handleClose} color="primary">
                            Cancle
                        </Button>
                        <Button onClick={()=> onDelete(id)}  color="primary" autoFocus>
                            Delete
                        </Button>

                    </DialogActions>

                </Dialog>

            </div>
        </div>

    )
}


