import { Button, Modal, TextInput, PasswordInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import "./signUp.css"

const SignUp = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Sign up" centered  overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}>
        <TextInput label="Name" placeholder="Your name" required />
        <TextInput
          label="Email"
          placeholder="you@example.com"
          required
          mt="md"
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <Button fullWidth mt="xl"  className="button" onClick={close}>
          Sign up
        </Button>
      </Modal>

      <Button onClick={open} size="md">Sign Up</Button>
    </>
  );
};

export default SignUp;
