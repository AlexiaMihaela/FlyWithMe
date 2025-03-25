import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, PasswordInput } from "@mantine/core";
import "./signIn.css";

const SignIn = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Log in" centered  overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}>
        <TextInput label="Username" placeholder="Your username" required />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <Button fullWidth mt="xl" onClick={close} className="button">
          Sign in
        </Button>
      </Modal>

      <Button onClick={open} size="md">Sign In</Button>
    </>
  );
};
export default SignIn;