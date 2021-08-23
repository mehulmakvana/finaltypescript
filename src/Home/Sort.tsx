import { DataGrid } from '@material-ui/data-grid';
import UserService from "../services/user.service";
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import { history } from '../helpers/history';
import { useDispatch } from "react-redux";
import { logout } from "../actions/auth";
import { loadCSS } from 'fg-loadcss';
import DemoModal from '../Home/DemoModal';




export default function DataTable(props: any) {

    const [id, setId] = useState(null);


    const [open, setOpen] = React.useState(false);


    const handleClickOpen = (id: any) => {
        setId(id);
        console.log("id::::::", id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getData = () => {
        UserService.getAddData().then((getData) => {
            setPosts(getData.data.data.todos);
        });
    };


    const onDelete = (row: any) => {

        UserService.deleteData(row.id)
            .then(() => {
                getData();
            })
        setOpen(false);
    }



    const columns = [

        { field: 'id', headerName: 'ID', width: 350, sortable: true },

        {
            field: 'data',
            headerName: 'Data',
            width: 400,
            sortable: true,
        },
        {
            field: 'due_date',
            headerName: 'Date',
            width: 400,
            sortable: true,
        },
        {
            field: 'priority',
            headerName: 'Priority',
            width: 400,
            sortable: true,
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 350,
            sortable: true,
            renderCell: (id: any) => (
                <>
                    <Button onClick={() => handleClickOpen(id)}>Delete</Button>


                </>

            )

        },

    ];

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

    const nextPath = (path: any) => {
        history.push(path)
    }


    React.useEffect(() => {
        const node = loadCSS(
            'https://use.fontawesome.com/releases/v5.12.0/css/all.css',

        );

        return () => {
            node.parentNode!.removeChild(node);
        };
    }, []);




    // const handleTableChange = (sortable: any) => {
    //     console.log(sortable);

    //     UserService.SortData(sortable.id, sortable.sortingOrder === "ascend" ? 'asc' : 'desc')
    //     .then((getData) => {
    //         setPosts(getData.data.data.todos);
    //         console.log('sortable.id',sortable.id);
    //         console.log("sortable.sortingOrder",sortable.sortingOrder);


    //     })
    // }

    // const [sortModel, setSortModel] = React.useState<GridSortModel>([
    //     { field: 'id', sort: 'asc' },
    //   ]);


    const handleSortModelChange = (sortable: any) => {
        console.log(sortable);

        UserService.SortData(sortable.field, sortable.sort === "asc" ? 'asc' : 'desc')
            .then((getData) => {



                //  setPosts(getData.data.data.todos);
            });
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


            <div style={{ height: 700, width: '100%' }}>
                <DataGrid
                    rows={posts}
                    columns={columns}
                    pageSize={10}
                    onSortModelChange={handleSortModelChange}

                />

          

                    <Dialog open={open} >
                        


                        <DialogTitle id="alert-dialog-title">
                            suredelete= {"Are You Sure Delete?"}
                        </DialogTitle>

                        <DialogActions>

                            can_body={
                                <Button onClick={handleClose}
                                    color="primary">
                                    Cancle
                                </Button>
                            }
                            del_body={
                                <Button onClick={() => onDelete(id)}
                                    color="primary" autoFocus>
                                    Delete
                                </Button>
                            }

                        </DialogActions>
               

                    </Dialog>
         

            </div>

        </div>
    );
}
