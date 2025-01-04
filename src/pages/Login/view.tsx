import FormButton from "../../components/Form/FormButton";
import FormInput from "../../components/Form/FormInput";
import { useLoginModel } from "./model";
import { LoginForm } from "./styles";

export const LoginView = ({
  auth,
  loginData,
  handleLoginChange,
  handleLoginSubmit,
}: ReturnType<typeof useLoginModel>) => {
  return (
    <LoginForm onSubmit={handleLoginSubmit}>
      <h1>Login</h1>
      <FormInput
        type="text"
        name="email"
        id="email"
        placeholder="Email"
        value={loginData.email}
        handleChange={handleLoginChange}
      />
      <FormInput
        type="text"
        name="password"
        id="password"
        placeholder="Password"
        value={loginData.password}
        handleChange={handleLoginChange}
      />
      <FormButton onClick={() => {}}>Send</FormButton>
      {auth.status === "loading" && <p>Loading...</p>}
      {auth.error && <p style={{ color: "red" }}>{auth.error}</p>}
    </LoginForm>
  );
};
