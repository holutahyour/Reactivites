import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Button, Item, ItemContent, Label, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/stores';


function ActivityList() {
    const {activityStore} = useStore();
    const {activityByDate,deleteActivity, submitting} = activityStore

    const [target, setTarget] = useState('');

    function handleDeleteActivity(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name)
        deleteActivity(id)
    }

    return (
        <Segment>
            <Item.Group divided>
                {activityByDate.map(activity =>(
                    <Item key={activity.id}>
                        <ItemContent>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button 
                                loading={submitting && target === activity.id} 
                                name = {activity.id}
                                onClick={(e) => handleDeleteActivity(e,activity.id)} 
                                floated='right' 
                                content='Delete' 
                                color='red' />
                                <Button onClick={() => activityStore.selectActivity(activity.id)} floated='right' content='View' color='blue' />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </ItemContent>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}

export default observer(ActivityList) 
