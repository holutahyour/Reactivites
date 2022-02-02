import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'
import { useStore } from '../stores/stores'

function Navbar() {

    const {activityStore} = useStore()
    
    return (
        <div>
            <Menu inverted fixed-top='top'>
                <Container>
                    <Menu.Item header>
                        <img src="/assets/logo.png" alt="" style={{marginRight: '10px'}} />
                        Reactivities
                    </Menu.Item>
                    <Menu.Item name='Activities'/>
                    <Menu.Item> 
                        <Button onClick={() =>activityStore.openForm()} positive content='Create Activity'/>
                    </Menu.Item>
                </Container>
            </Menu>
        </div>
    )
}

export default Navbar
