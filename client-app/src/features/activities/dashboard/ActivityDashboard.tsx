import { observer } from 'mobx-react-lite'
import React from 'react'
import { Grid } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/stores'
import ActitvityDetails from '../details/ActitvityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'


function ActivityDashboard() {
    const {activityStore} = useStore();
    const {activity,editMode} = activityStore;
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                {activity && !editMode &&
                <ActitvityDetails />
                }

                {editMode && <ActivityForm />
                }
            </Grid.Column>
        </Grid>
        
    )
}

export default observer(ActivityDashboard) 
