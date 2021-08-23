import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { history } from '../helpers/history';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Modal from '@material-ui/core/Modal';
import {Theme, createStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const Home = () => {
    const classes = useStyles();


    const [data, setData] = useState("");
    const [due_date, setDue_Date] = useState("");
    const [priority, setPriority] = useState("");
    const onChangeData = (e: any) => {
        const data = e.target.value;
        setData(data);
    };
    const onChangeDue_Date = (e: any) => {
        const due_date = e.target.value;
        setDue_Date(due_date);
    };
    const onChangePriority = (e: any) => {
        const priority = e.target.value;
        setPriority(priority);
    };

    

    const handleAdd = (e: any) => {
        e.preventDefault();

        const store = { data: data, due_date: due_date, priority: priority }


        fetch('https://rails-to-do-list-narola.herokuapp.com/v1/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'access-token': localStorage.getItem("auth_token") || '',
            },
            body: JSON.stringify(store),
        })
            .then(response => response.json())
            
            .then(data => {
                console.log('Success:', data);
                console.log('token:', data.auth_token);
            })
         

            .catch((error) => {
                console.error('Error:', error);
            });
        // history.push('/data')
    };

    const nextPath = (path: any) => {
        history.push(path)
    }



    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function rand() {
        return Math.round(Math.random() * 20) - 10;
      }

    function getModalStyle() {
        const top = 50 + rand();
        const left = 50 + rand();
      
        return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
      }
      const use_Styles = makeStyles((theme: Theme) =>
      createStyles({
        paper: {
          position: 'absolute',
          width: 400,
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
      }),
    );


      const _classes = use_Styles();
    const [modalStyle] = React.useState(getModalStyle);

    const body = (
        <div style={modalStyle} className={_classes.paper}>
          <h2 id="simple-modal-title">Text in a modal</h2>
          <p id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
         
        </div>
      );

      const handleOpen = () => {
        setOpen(true);
      };
    
      const handle_Close = () => {
        setOpen(false);
      };

    
    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>


                <KeyboardBackspaceIcon style={{ fontSize: 30, textAlign: "left" }} onClick={() => nextPath('/data')} className="back" />
                <Typography component="h1" variant="h5">

                    Add Data
                </Typography>

                <form className={classes.form} noValidate onSubmit={handleAdd}>
                    <Grid container spacing={2}>


                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Data"
                                value={data}
                                onChange={onChangeData}
                                name="data"

                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="Date"

                                type="date"
                                value={due_date}

                                onChange={onChangeDue_Date}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="priority"
                                label="Priority"
                                type="number"
                                value={priority}

                                onChange={onChangePriority}
                            />
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleClickOpen}
                            
                        >
                            Add Data
                        </Button>

                    </Grid>
                </form>
            </div>

            <div>

                {/* <Dialog open={open} >

                    <DialogTitle id="alert-dialog-title">{"ToDo Added Successfully"}</DialogTitle>

                    <DialogActions>

                        <Button onClick={handleClose} color="primary">
                            Cancle
                        </Button>
                        <Button color="primary" autoFocus onClick={() => nextPath('/sort')}>
                            Back to Todo List
                        </Button>

                    </DialogActions>

                </Dialog> */}
                 <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
                 <Modal
        open={open}
        onClose={handle_Close}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
            </div>



        </Container>


    );
};
export default Home;