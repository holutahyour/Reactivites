import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/stores'
import { v4 as uuid } from "uuid"


function ActivityForm() {

    const {activityStore} = useStore();
    const {loadActivity, closeForm, createActivity, updateActivity, submitting} = activityStore;
    const { id } = useParams<{id: string}>()
    const history = useHistory();

    const [activity, setActivity] = useState({
        id:          "",
        title:       "",
        date:        "",
        description: "",
        category:    "",
        city:        "",
        venue:       "",
    })

    useEffect(() => {
        if(id) loadActivity(id).then(activity => setActivity(activity!))
    },[id,loadActivity])
    
    function handleSubmit() {
       activity.id ? updateActivity(activity) : createActivity(activity)

       if(activity.id.length === 0){
           activity.id = uuid();
           activityStore.createActivity(activity).then(() => history.push("/activities"))
       }else{
            updateActivity(activity).then(() => history.push("/activities"))
       }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity,[name]:value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button as={Link} to="/activities" floated='right' positive type='button' content='Cancel' />
                <Button loading = {submitting} floated='right' positive type='submit' content='Submit' />
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm) 
