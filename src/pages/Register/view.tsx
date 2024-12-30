import { useRegisterModel } from "./model";
import { RegisterForm, StyledRegisterPage } from "./styles";

export const RegisterView = ({
  auth,
  registerData,
  handleRegisterChange,
  handleRegisterSubmit,
}: ReturnType<typeof useRegisterModel>) => {
  return (
    <StyledRegisterPage>
      <RegisterForm action="" method="post" onSubmit={handleRegisterSubmit}>
        <h1>Register</h1>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={registerData.name || ""}
          onChange={handleRegisterChange}
        />
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          value={registerData.email || ""}
          onChange={handleRegisterChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={registerData.password || ""}
          onChange={handleRegisterChange}
        />
        <button>Register</button>
        {auth.status === "loading" && <p>Loading...</p>}
        {auth.error && <p style={{ color: "red" }}>{auth.error}</p>}
      </RegisterForm>
    </StyledRegisterPage>
  );
};
