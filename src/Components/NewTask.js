import React, { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import {
    Paper,
    TextField,
    Button,
    Typography
} from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';  

const NewTask =()=>{

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState(dayjs());

  useEffect(() => {
    document.title="Add-a-Doo"
  },[]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!taskName || !taskDescription || !taskDate) {
      alert('Please fill out all fields');
      return;
    }
    
    const newTask = {
      name: taskName,
      description: taskDescription,
      due: taskDate.format('YYYY-MM-DD'),
    };

    console.log('Task Added:', newTask);
    alert(`Task "${newTask.name}" added!`);
    try {
        axios.post('http://localhost/React_guide/taskmanager/savetask.php', newTask).then(response => {
            console.log('Task saved:', response.data);
            setTaskDescription('');
            setTaskDate(dayjs().format('YYYY-MM-DD'));
            setTaskDate(dayjs());
        })
        .catch(error => {
            console.error('Error saving task:', error);
        });
  
      } catch (error) {
        alert('Error adding task!');
        console.error('Error posting task', error);
      }
    };
    // Clear the form after submission
    
  

    return(
        <>
         <Paper elevation={3} style={{ padding: '20px', maxWidth: '500px', margin: '20px auto' }}>
          <Typography sx={{ textAlign: 'center' }} variant="h5" gutterBottom>
            Add-a-Doo
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                label="Task Name"
                fullWidth
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Task Description"
                fullWidth
                multiline
                rows={4}
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                required
              />
            </Box>
            <Box mb={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Due Date"
                  value={taskDate}
                  onChange={(newValue) => setTaskDate(newValue)}
                  renderInput={(params) => <TextField fullWidth {...params} required />}
                />
              </LocalizationProvider>
            </Box>
            <Box textAlign="center">
              <Button variant="contained" color="primary" type="submit">
                Add Task
              </Button>
            </Box>
          </form>
      </Paper>
        </>
    )
   
}

export default NewTask;
