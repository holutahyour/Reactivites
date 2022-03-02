import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

function HomePage() {
  return (
    <Container style={{marginTop: '5rem'}}> 
        <h2>Home Page</h2>
        <h3>Go to Activities Page <Link to='/activities'>Click here</Link></h3>
    </Container>
);
} 

export default HomePage;
