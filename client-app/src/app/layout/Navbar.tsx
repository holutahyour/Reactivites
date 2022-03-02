import { NavLink } from 'react-router-dom'
import { Button, Container, Menu } from 'semantic-ui-react'

function Navbar() {
    
    return (
        <div>
            <Menu inverted fixed-top='top'>
                <Container>
                    <Menu.Item as={NavLink} to="/" exact header>
                        <img src="/assets/logo.png" alt="" style={{marginRight: '10px'}} />
                        Reactivities
                    </Menu.Item>
                    <Menu.Item as={NavLink} to="/activities" name='Activities'/>
                    <Menu.Item> 
                        <Button as={NavLink} to="/createactivity" positive content='Create Activity'/>
                    </Menu.Item>
                </Container>
            </Menu>
        </div>
    )
}

export default Navbar
