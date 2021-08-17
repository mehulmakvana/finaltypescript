import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";
import { Add } from '../interfaces';
import UserService from "../services/user.service";


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


export const Home: React.FC<Add> = () => {

  const classes = useStyles();

  const [data, setData] = useState("");
  const [due_date, setDue_date] = useState("");
  const [priority, setPriority] = useState("");


  const onChangeData = (e: any) => {
    const data = e.target.value;
    setData(data);
  };

  const onChangeDue_date = (e: any) => {
    const due_date = e.target.value;
    setDue_date(due_date);
  };

  const onChangePriority = (e: any) => {
    const priority = e.target.value;
    setPriority(priority);
  };


  const handleAdd = (e: any) => {
    e.preventDefault();

    const store = { data: data, due_date: due_date, priority: priority };

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
        console.log("token", localStorage.getItem("auth_token"));
        // history.push('/data');

      })
      .catch((error) => {
        console.error('Error:', error);
      });

  };


  const history = useHistory();

  const logout = () => {

    localStorage.removeItem('auth_token');

    history.push('/login');

  }

  const [posts, setPosts] = useState([]);

  const show =() => {

  
  UserService.getAddData().then(
    (response) => {
      const { data = [] } = response;
      setPosts(data.data.todos);
      console.log("show data:::::::::::::", response.data.data)

    },

    (error) => {
      const _data1 =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      setPosts(_data1);


    }
  );
  }

  const onDelete = (id:any) => {

    UserService.deleteData(id).then(
      (response) => {
        return response;
      },
    );
    }

  return (

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>

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
                name="due_date"

                type="date"
                value={due_date}
                autoComplete="due_date"
                onChange={onChangeDue_date}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="number"
                label="priority"
                value={priority}
                onChange={onChangePriority}
                name="priority"
              />
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
             onClick={show}
            >
              Add Data

            </Button>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={logout}
            >
              LogOut
            </Button>

          </Grid>
        </form>
      </div>
      <Box mt={5}>

      </Box>


      <div>
        <table>
          <thead>
            <tr>

              <th>ID</th>
              <th>Data</th>
              <th>Date</th>
              <th>Priority</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              posts.length !== 0 ?
                posts.map((post: any, index) => {
                  return (
                    <tr key={index}>
                      <td>{post.id}</td>
                      <td>{post.data}</td>
                      <td>{post.due_date}</td>
                      <td>{post.priority}</td>
                      <td><button onClick={onDelete}>Delete</button></td>
                    </tr>
                  )
                })
                : 'No data found'
            }
          </tbody>
        </table>
      </div>


    </Container>




  );
};

export default Home;
