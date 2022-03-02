import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { useStore } from '../../../app/stores/stores'
import ActivityList from './ActivityList'


function ActivityDashboard() {
    const {activityStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore;
    useEffect(() => {
        if(activityRegistry.size <= 1) loadActivities();
    },[activityRegistry.size,loadActivities])

    if (activityStore.loading) return <LoadingComponent content='Loading App' />
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Activity Filter</h2>
            </Grid.Column>
        </Grid>
        
    )
}

export default observer(ActivityDashboard) 
