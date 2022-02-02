import React, { useEffect } from 'react';
import './styles.css';
import { Container } from 'semantic-ui-react';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/stores';
import { observer } from 'mobx-react-lite';


function App() {
  const {activityStore} = useStore()
  useEffect(() => {
    activityStore.loadActivities();
  },[activityStore])

  if (activityStore.loading) return <LoadingComponent content='Loading App' />
  
  return (
    <>
      <Navbar />
      <Container style={{marginTop: '5rem'}}>
        <ActivityDashboard />
      </Container>
            
    </>
  );
}

export default observer(App) ;
