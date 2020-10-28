import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { createUser } from '../../services/user';

import { UserContext } from '../../context/userContext';

import { Form } from '../../components';
import {
    Container,
    Content,
    Link
} from './styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function Signup() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState(false);

    const { setUser } = useContext(UserContext);
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();

        const data = {
            name,
            username,
            password,
            confirmPassword,
            imageUrl
        };

        createUser(data).then(response => {
            const { user, error } = response;

            if (!error) {
                setUser(user);
                history.push('/chat');
            };

            setName('');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setImageUrl('');
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

                    <Form.Title>Sign Up </Form.Title>
                    {error ? <Form.Error>{error}</Form.Error> : null}


                    <div>
                        <Form.Input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Name"
                            required
                        />

                        <Form.Input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                        />

                        <Form.InputWrapper>
                            <Form.Input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />

                            <Form.Input
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                placeholder="Confirm password"
                                required
                            />
                        </Form.InputWrapper>

                        <Form.Input
                            type="url"
                            value={imageUrl}
                            onChange={e => setImageUrl(e.target.value)}
                            placeholder="Image URL (optional)"
                        />
                    </div>

                    <Form.Submit type="submit">Sign up</Form.Submit>

                    <Form.Description>
                        Already user?
                        <Form.Link to="/signin">
                            Sign In
                        </Form.Link>
                    </Form.Description>

                </Form>

            </Content>
        </Container>
    );
};

export default Signup;
