import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import TaskIcon from '@mui/icons-material/Assignment'; // Icon for Current Tasks
import EventIcon from '@mui/icons-material/Event'; // Icon for Upcoming Tasks
import { styled } from '@mui/system';
import axios from 'axios';

// Styled Card component for tasks and sections
const StyledCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? '#333' : 'linear-gradient(to bottom, #ffffff, #f1f1f1)',
  boxShadow: theme.palette.mode === 'dark' ? '0px 4px 10px rgba(0, 0, 0, 0.6)' : '0px 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.palette.mode === 'dark' ? '0px 8px 16px rgba(0, 0, 0, 0.8)' : '0px 8px 16px rgba(0, 0, 0, 0.2)',
  },
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  color: theme.palette.text.primary,
}));

// Styled ListItemText to resemble CardContent
const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#ffffff',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.palette.mode === 'dark' ? '0 2px 6px rgba(0, 0, 0, 0.6)' : '0 2px 6px rgba(0, 0, 0, 0.1)',
  marginBottom: theme.spacing(1),
  '& .MuiTypography-body1': {
    fontWeight: 'bold',
    color: theme.palette.mode === 'dark' ? '#1e88e5' : '#1e88e5', // Blue color
  },
  '& .MuiTypography-body2': {
    color: theme.palette.mode === 'dark' ? '#b0bec5' : '#757575', // Greyish color for secondary text
  },
}));

const NextTask = () => {
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks from the server
  const fetchTasks = () => {
    setLoading(true);
    axios
      .get('http://localhost/React_guide/taskmanager/fetchTasks.php') // Update the URL
      .then((response) => {
        const tasks = response.data;
        console.log(tasks);
        const pending = tasks.filter((task) => task.status != '1' && new Date(task.due) <= new Date());
        const completed = tasks.filter((task) => task.status == '1');
        const upcoming = tasks.filter((task) => new Date(task.due) > new Date());
        setPendingTasks(pending);
        setCompletedTasks(completed);
        setUpcomingTasks(upcoming);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    document.title = 'To-Do Peek';
    fetchTasks(); // Fetch tasks when the component mounts
  }, []);

  const handleTaskCompletion = (taskId) => {
    axios
      .post('http://localhost/React_guide/taskmanager/updateTask.php', { id: taskId, status: 1 }) // Update the backend URL
      .then((response) => {
        console.log('Task updated:', response.data);
        fetchTasks(); // Re-fetch tasks to refresh the list
      })
      .catch((error) => {
        console.error('Error updating task:', error);
      });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      {/* Pending Tasks Section */}
      <StyledCard sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h4">
            <TaskIcon />
            Pending Tasks
          </Typography>
          <Grid container spacing={3}>
            {pendingTasks.length > 0 ? (
              pendingTasks.map((task) => (
                <Grid item xs={12} sm={6} md={4} key={task.id}>
                  <StyledCard>
                    <CardContent>
                      <Typography variant="h6">{task.name}</Typography>
                      <Typography variant="body2">{task.description}</Typography>
                      <Typography variant="body2">Due Date: {task.due}</Typography>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleTaskCompletion(task.id)}
                      >
                        Mark as Done
                      </Button>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))
            ) : (
              <Typography>No pending tasks available.</Typography>
            )}
          </Grid>
        </CardContent>
      </StyledCard>

      {/* Completed Tasks Section */}
      <StyledCard>
        <CardContent>
          <Typography variant="h4">Completed Tasks</Typography>
          <List>
            {completedTasks.length > 0 ? (
              completedTasks.map((task) => (
                <ListItem key={task.id}>
                  <StyledListItemText
                    primary={task.name}
                    secondary={`Completed on: ${task.completedDate}`}
                  />
                </ListItem>
              ))
            ) : (
              <Typography>No completed tasks available.</Typography>
            )}
          </List>
        </CardContent>
      </StyledCard>

      {/* Upcoming Tasks Section */}
      <StyledCard sx={{ marginTop: 5 }}>
        <CardContent>
          <Typography variant="h4">Upcoming Tasks</Typography>
          {upcomingTasks.length > 0 ? (
            <Paper>
              <List>
                {upcomingTasks.map((task) => (
                  <ListItem key={task.id}>
                    <StyledListItemText
                      primary={task.name}
                      secondary={`Due Date: ${task.due}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          ) : (
            <Typography>No upcoming tasks available.</Typography>
          )}
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default NextTask;