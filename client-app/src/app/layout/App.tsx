import React, { useEffect, useState } from 'react';
import './styles.css';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { ActivityInterface } from '../models/Activity';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid} from 'uuid'


function App() {
  const [activities, setActivities] = useState<ActivityInterface[]>([]);
  const [activity, setActivity] = useState<ActivityInterface | undefined>(undefined)    
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    axios.get<ActivityInterface[]>('http://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data)
      })
  },[])

  function handleSelectedActivity(id:string) {
    setActivity(activities.find(x => x.id === id))
    setEditMode(false)
  }

  function handleCanceledSelectedActivity() {
    setActivity(undefined)
  }

  function handleOpenForm(id?: string) {
    id ? handleSelectedActivity(id) : handleCanceledSelectedActivity()
    setEditMode(true);
  }

  function handleCloseForm(id?: string) {
    setEditMode(false);
    setActivity(undefined)
  }

  function handleCreateOrEditActivity(activity:ActivityInterface) {
    activity.id ? 
    setActivities([...activities.filter(x => x.id !== activity.id),activity]) : setActivities([...activities,{...activity,id: uuid()}]);
    setEditMode(false);
    setActivity(activity);
  }

  function handleDeleteActivity(id:string) {
    setActivities([...activities.filter(x => x.id !== id)])
  }


  return (
    <>
      <Navbar openForm={handleOpenForm}/>
      <Container style={{marginTop: '5rem'}}>
        <ActivityDashboard 
        activities = {activities}
        activity = {activity}
        selectedActivity = {handleSelectedActivity}
        canceledActivity={handleCanceledSelectedActivity}
        editMode = {editMode}
        openForm = {handleOpenForm}
        closeForm = {handleCloseForm}
        createOrEditActivity = {handleCreateOrEditActivity}
        deleteActivity = {handleDeleteActivity}
         />
      </Container>
            
    </>
  );
}

export default App;
