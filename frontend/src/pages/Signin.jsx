import React, { useState } from 'react';
import axios from '../contants/axios';

import { Form } from '../components';

function Signin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault();

        await axios.post('/api/user/auth', {
            username,
            password
        }).then(resp => {
            const { user, error } = resp.data;

            if (error) {
                setError(error);
                setUsername('');
                setPassword('');
                return
            };

            localStorage.setItem('authUser', JSON.stringify(user));
        });
    };

    return (
        <>
            <Form.Container>
                <Form.Inner>
                    <Form.Title>Sign In</Form.Title>
                    {error ? <Form.Error>{error}</Form.Error> : null}
                    <Form onSubmit={handleSubmit} method="POST">
                        <Form.Input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
                        <Form.Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                        <Form.Submit type="submit">Submit</Form.Submit>
                    </Form>
                    <Form.Text>New? <Form.Link to="/signup">Sign Up</Form.Link></Form.Text>
                </Form.Inner>
            </Form.Container>
        </>
    );
};

export default Signin;
