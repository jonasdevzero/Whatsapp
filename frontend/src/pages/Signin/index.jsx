import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { login } from '../../services/user';

import { UserContext } from '../../context/userContext';

import { Form } from '../../components';
import {
    Container,
    Content,
    Link
} from './styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function Signin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const history = useHistory();
    const { setUser } = useContext(UserContext);

    function handleSubmit(e) {
        e.preventDefault();

        login({ username, password }).then(response => {
            const { user, error } = response;

            if (!error) {
                setUser(user);
                history.push('/chat');
            };

            setUsername('');
            setPassword('');
            setError(error);
        });
    };

    return (
        <Container>

            <Link onClick={_ => history.goBack()}>
                <ArrowBackIcon />
            </Link>

            <Content>

                <Form
                    onSubmit={handleSubmit}
                    method="POST"
                >
                    <Form.Title>Sign In</Form.Title>
                    {error ? <Form.Error>{error}</Form.Error> : null}

                    <div>
                        <Form.Input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                        />
                        <Form.Input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>

                    <Form.Submit type="submit">Sign in</Form.Submit>

                    <Form.Description>
                        New? 
                        <Form.Link to="/signup">
                            Sign Up
                        </Form.Link>
                    </Form.Description>
                </Form>

            </Content>
        </Container>
    );
};

export default Signin;
