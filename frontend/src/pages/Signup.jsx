import React, { useState } from 'react';
import axios from '../contants/axios';

import { Form } from '../components';

function Signup() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState(false)

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

           console.log(user)
        });
    };

    return (
        <>
            <Form.Container>
                <Form.Inner>
                    <Form.Title>Sign Up</Form.Title>
                    {error ? <Form.Error>{error}</Form.Error> : null}
                    <Form onSubmit={handleSubmit} method="POST">
                        <Form.Input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
                        <Form.Input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
                        <Form.Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                        <Form.Input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm password" required />
                        <Form.Input type="url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="Image URL" />
                        <Form.Submit type="submit">Submit</Form.Submit>
                    </Form>
                    <Form.Text>Already user? <Form.Link to="/signin">Sign In</Form.Link></Form.Text>
                </Form.Inner>
            </Form.Container>
        </>
    );
};

export default Signup
