import React from 'react'
import { Grid } from 'semantic-ui-react'
import { ActivityInterface } from '../../../app/models/Activity'
import ActitvityDetails from '../details/ActitvityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'

interface PropInterface {
    activities: ActivityInterface[],
    activity: ActivityInterface | undefined,
    selectedActivity: (id:string) => void,
    canceledActivity: () => void,
    editMode: boolean,
    openForm: (id: string) => void,
    closeForm: () => void,
    createOrEditActivity: (activity: ActivityInterface) => void;
    deleteActivity: (id: string) => void;
  }
  

function ActivityDashboard({ activities, activity, selectedActivity, canceledActivity, openForm, closeForm, editMode, createOrEditActivity, deleteActivity }: PropInterface) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList 
                activities={activities} 
                selectedActivity={selectedActivity}
                deleteActivity = {deleteActivity} />
            </Grid.Column>
            <Grid.Column width='6'>
                {activity && !editMode &&
                <ActitvityDetails 
                activity={activity}  
                canceledActivity={canceledActivity}
                openForm = {openForm}/>
                }

                {editMode && <ActivityForm 
                activity={activity} 
                closeForm = {closeForm} 
                createOrEditActivity = {createOrEditActivity} />}
            </Grid.Column>
        </Grid>
        
    )
}

export default ActivityDashboard
