import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../../features/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { register } from "../../features/auth/authSlice";
import { RegisterInterface } from "../../types/auth.types";

export const RegisterView = () => {
  const dispatch = useAppDispatch(); // Use the typed dispatch
  const auth = useSelector((state: RootState) => state.auth); // Access auth state
  const [registerData, setRegisterData] = useState<RegisterInterface>(
    {} as RegisterInterface
  );

  const handleRegisterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleRegisterSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(register(registerData)); // Dispatch the register thunk
  };

  return (
    <div>
      <h1>Register</h1>
      <div>
        <form action="" method="post" onSubmit={handleRegisterSubmit}>
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
        </form>
        {auth.status === "loading" && <p>Loading...</p>}
        {auth.error && <p style={{ color: "red" }}>{auth.error}</p>}
      </div>
    </div>
  );
};
