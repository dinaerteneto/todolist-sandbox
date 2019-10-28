import React from 'react'
import { Link } from 'react-router-dom';
import {
  Container,
  Image,
  Menu,
} from 'semantic-ui-react'

const FixedMenuLayout = () => (
    <div>
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item as='a' header>
            <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} />
            TodoList - MOL
          </Menu.Item>
          <Menu.Item as='a'><Link to="/">Home</Link></Menu.Item>
          <Menu.Item as='a'><Link to="/about">About</Link></Menu.Item>
        </Container>
      </Menu>
    </div>
  )
  
  export default FixedMenuLayout