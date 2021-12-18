import React from 'react'
import { Button, Item, ItemContent, Label, Segment } from 'semantic-ui-react'
import { ActivityInterface } from '../../../app/models/Activity'


interface PropInterface{
    activities: ActivityInterface[],
    selectedActivity: (id: string) => void
    deleteActivity: (id: string) => void
}

function ActivityList({activities,selectedActivity, deleteActivity}:PropInterface) {
    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity =>(
                    <Item key={activity.id}>
                        <ItemContent>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => deleteActivity(activity.id)} floated='right' content='Delete' color='red' />
                                <Button onClick={() => selectedActivity(activity.id)} floated='right' content='View' color='blue' />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </ItemContent>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}

export default ActivityList
