import { useState } from 'react';
import { Button, Modal, TextInput, PasswordInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import "./SignUp.css"

const SignUp = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    email: '',
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
      const response = await fetch('http://localhost:5000/api/auth/register', {
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

      close();
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Sign up" centered  overlayProps={{
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
        <TextInput
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="you@example.com"
          required
          mt="md"
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
        <Button fullWidth mt="xl"  className="button" onClick={handleSubmit}>
          Sign up
        </Button>
      </Modal>

      <Button onClick={open} size="md">Sign Up</Button>
    </>
  );
};

export default SignUp;
