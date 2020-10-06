import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import axios from '../constants/axios';

import { UserContext } from '../context/userContext';

import { Form } from '../components';

function Signup() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState(false);

    const { setUser } = useContext(UserContext);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        await axios.post('/api/user/register', {
            name,
            username,
            password,
            confirmPassword,
            imageUrl
        }).then(resp => {
            const { user, error } = resp.data;

            if (error) {
                setName('');
                setUsername('');
                setPassword('');
                setConfirmPassword('');
                setImageUrl('');
                setError(error);
                return
            };

            localStorage.setItem('authUser', JSON.stringify(user))
            setUser(user)
            history.push('/chat')
        });
    };

    return (
        <>
            <Form.Container>
                <Form.Inner>
                    
                    <Form.Title>Sign Up </Form.Title>
                    {error ? <Form.Error>{error}</Form.Error> : null}
                    <Form onSubmit={handleSubmit} method="POST">
                        <Form.Group>
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
                        </Form.Group>
                        <Form.Group>
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
                        </Form.Group>
                        <Form.Group>
                            <Form.Input
                                type="url"
                                value={imageUrl}
                                onChange={e => setImageUrl(e.target.value)}
                                placeholder="Image URL (optional)"
                                maxWidth="100%"
                            />
                        </Form.Group>

                        <Form.Submit type="submit">Sign up</Form.Submit>
                    </Form>
                    <Form.Text>Already user? <Form.Link to="/signin">Sign In</Form.Link></Form.Text>
                </Form.Inner>
            </Form.Container>
        </>
    );
};

export default Signup
