import { Button, Card, Image } from 'semantic-ui-react'
import { ActivityInterface } from '../../../app/models/Activity'

interface PropInterface{
    activity: ActivityInterface,
    canceledActivity: () => void,
    openForm: (id: string) => void,
}

function ActitvityDetails({activity,canceledActivity, openForm}:PropInterface) {
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(activity.id)} basic color='blue' content='Edit' />
                    <Button onClick={canceledActivity} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

export default ActitvityDetails
