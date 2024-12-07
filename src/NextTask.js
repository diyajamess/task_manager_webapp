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
  const [tasks, setTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks from the server
  useEffect(() => {
    axios
      .get('http://localhost/React_guide/taskmanager/fetchTasks.php') // Update the URL as per your backend
      .then((response) => {
        const currentTasks = response.data.filter((task) => new Date(task.due) <= new Date());
        const upcoming = response.data.filter((task) => new Date(task.due) > new Date());
        setTasks(currentTasks);
        setUpcomingTasks(upcoming);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      });
  }, []);

  const handleTaskCompletion = (taskId) => {
    // Logic to handle task completion (e.g., updating status in the database)
    console.log(`Task ${taskId} marked as completed`);
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
      {/* Current Tasks Section */}
      <StyledCard sx={{ marginBottom: 2 }}>
        <CardContent sx={{ padding: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <TaskIcon sx={{ marginRight: 1, color: '#1e88e5' }} />
              Current Tasks
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic' }}>
              Let’s get things done!
            </Typography>
          </Box>

          <Grid container spacing={3} sx={{ marginTop: 2 }}>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <Grid item xs={12} sm={6} md={4} key={task.id}>
                  <StyledCard>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e88e5' }}>
                        {task.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" paragraph>
                        {task.Description}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#ff9800', marginBottom: 2 }}>
                        <EventIcon sx={{ marginRight: 0.5 }} />
                        Due Date: {task.due}
                      </Typography>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleTaskCompletion(task.id)}
                        sx={{ textTransform: 'none', width: '100%' }}
                      >
                        Mark as Done
                      </Button>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))
            ) : (
              <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center', width: '100%' }}>
                No current tasks available.
              </Typography>
            )}
          </Grid>
        </CardContent>
      </StyledCard>

      {/* Upcoming Tasks Section */}
      <StyledCard sx={{ marginTop: 5 }}>
        <CardContent sx={{ padding: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <EventIcon sx={{ marginRight: 1, color: '#ff9800' }} />
              Upcoming Tasks
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic' }}>
              Stay prepared for the future!
            </Typography>
          </Box>

          {upcomingTasks.length > 0 ? (
            <Paper sx={{ padding: 2 }} elevation={3}>
              <List>
                {upcomingTasks.map((task) => (
                  <ListItem
                    key={task.id}
                    sx={{
                      borderBottom: '1px solid #ddd',
                      '&:last-child': { borderBottom: 'none' },
                    }}
                  >
                    <StyledListItemText
                      primary={task.name}
                      secondary={`Due Date: ${task.due}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          ) : (
            <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center', marginTop: 2 }}>
              No upcoming tasks available.
            </Typography>
          )}
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default NextTask;
