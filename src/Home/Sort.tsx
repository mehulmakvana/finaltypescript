import { DataGrid, GridColDef } from '@material-ui/data-grid';
import UserService from "../services/user.service";
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DataTable() {

    const [id, setId] = useState(null);


    const [open, setOpen] = React.useState(false);


    const handleClickOpen = (id: any) => {
        setId(id);

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


    const onDelete = (id: any) => {

        UserService.deleteData(id)
            .then(() => {
                getData();
            })
            setOpen(false);
    }


    const columns: GridColDef[] = [

        { field: 'id', headerName: 'ID', width: 100, sortable: true },

        {
            field: 'data',
            headerName: 'Data',
            width: 150,
            sortable: true,
        },
        {
            field: 'due_date',
            headerName: 'Date',
            type: 'number',
            width: 150,
            sortable: true,
        },
        {
            field: 'priority',
            headerName: 'Priority',
            width: 150,
            sortable: true,
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 150,
            sortable: true,

            renderCell: (id: any) => <Button onClick={handleClickOpen}>Delete</Button>

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
        console.log("5555");

        UserService.SortData(sortable.id, sortable.sortingOrder === "ascend" ? 'asc' : 'desc')
            .then((getData) => {
                console.log("5555");

                //  setPosts(getData.data.data.todos);
            });
    }


    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={posts}
                columns={columns}
                pageSize={5}
                onSortModelChange={(sortable) => handleSortModelChange(sortable)}

            />

            <div>

                <Dialog open={open} >

                    <DialogTitle id="alert-dialog-title">{"Are You Sure Delete?"}</DialogTitle>

                    <DialogActions>

                        <Button onClick={handleClose} color="primary">
                            Cancle
                        </Button>
                        <Button onClick={() => onDelete(id)} color="primary" autoFocus>
                            Delete
                        </Button>

                    </DialogActions>

                </Dialog>


            </div>

        </div>
    );
}
