import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, PasswordInput } from "@mantine/core";
import "./signIn.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors);
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('isAdmin', data.user.isAdmin);
      setFormData({ username: '', password: '' });
      setErrors({});
      close();

      if (data.user.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/user');
      }

    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Log in" centered overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}>
        <TextInput
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
          placeholder="Your username"
          required
        />
        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Your password"
          required
          mt="md"
        />
        <Button fullWidth mt="xl" onClick={handleSubmit} className="button">
          Sign in
        </Button>
      </Modal>

      <Button onClick={open} size="md">Sign In</Button>
    </>
  );
};

export default SignIn;