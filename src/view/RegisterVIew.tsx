import { useState } from "react";
import background from "../assets/login-pic.jpg";
import Input from "../component/input";
import { useLoginMutation, useRegisterMutation } from "../service/loginApi";
import { useNavigate } from "react-router-dom";
import { CustomComboBox } from "../component/combobox/combobox";

const userOptions = [
  { key: "user", text: "User" },
  { key: "moderator", text: "Murchent" },
];

const RegisterView = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: "",
  });

  const [register, { isLoading }] = useRegisterMutation();

  let navigate = useNavigate();

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
  ): void => {
    // switch (type) {
    //   case "username":
    //     setUsername(e.target.value);
    //     break;
    //   case "password":
    //     setPassword(e.target.value);
    //     break;
    // }
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = async () => {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      role,
    } = formData;

    // const error = validateForm();
    // if (error) {
    //   console.error(error);
    //   return;
    // }

    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !role
    ) {
      //   return "All fields are required.";
      alert("All fields are required.");
    } else {
      try {
        console.log(formData);
        const res = await register({
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
          role: formData.role,
          profilePic: "",
        }).unwrap();

        console.log("Register success:", res);
        navigate('/')
        alert(res.message);
      } catch (err) {
        console.error("Login failed:", err);
        alert(err?.data?.message);
      }
    }
  };

  return (
    <>
      <section className="min-h-screen bg-green-200/20 font-[Poppins] flex items-center justify-center p-3">
        <div className="min-h-[85%] h-max w-full md:w-max md:max-w-[70%] bg-[#ffffff] drop-shadow rounded-xl py-4 px-5 flex items-center justify-center">
          <div className="h-full flex items-center justify-center p-5 px-[5%]">
            <div className="h-full">
              {/* image baner in the top */}
              <div
                className="h-[145px] w-full md:w-[400px] max-w-[400px] bg-cover bg-center rounded-xl p-5 flex items-end"
                style={{ backgroundImage: `url(${background})` }}
              >
                <div className="text-white text-[30px] font-normal">
                  Grow Your, <br /> Bussiness With Us.
                </div>
              </div>

              {/* Create account text */}

              <h1 className="text-[#3d5306] text-[35px] font-medium mb-3 mt-5 ">
                <span className="text-[20px] md:text-[45px]">*</span>
                <br />
                Create your account
              </h1>

              <h1 className="text-[12px] text-[#053931]">
                It's quick and easy.
              </h1>
              {/* ------- login form --------- */}
              <div className="mt-7 flex flex-col gap-4">
                <div>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    label="First Name"
                    message="Username not found."
                    borderRequired={true}
                    callBack={handleInput}
                    required={true}
                    validate={true}
                  />
                </div>

                <div>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    label="Last Name"
                    message="Username not found."
                    borderRequired={true}
                    callBack={handleInput}
                    required={true}
                    validate={true}
                  />
                </div>

                <div>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    label="Username"
                    message="Username not found."
                    borderRequired={true}
                    callBack={handleInput}
                    required={true}
                    validate={true}
                  />
                </div>

                <div>
                  <Input
                    id="email"
                    type="text"
                    placeholder="Email"
                    value={formData.email}
                    label="Email"
                    message="Username not found."
                    borderRequired={true}
                    callBack={handleInput}
                    required={true}
                    validate={true}
                  />
                </div>

                <div>
                  <Input
                    id="phoneNumber"
                    type="text"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    label="Phone Number"
                    message="Username not found."
                    borderRequired={true}
                    callBack={handleInput}
                    required={true}
                    validate={true}
                  />
                </div>

                <div className="">
                  <CustomComboBox
                    label="Select Role"
                    placeholder="Choose a role"
                    options={userOptions}
                    selectedKey={formData.role}
                    required
                    onChange={(value) => updateField("role", value || "")}
                  />
                </div>

                <div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    label="Password"
                    message="Password in correct."
                    borderRequired={true}
                    callBack={handleInput}
                    required={true}
                    validate={true}
                    passBtn={true}
                  />
                </div>

                <div>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Password"
                    value={formData.confirmPassword}
                    label="Conform Password"
                    message="Password not matched."
                    borderRequired={true}
                    callBack={handleInput}
                    required={true}
                    validate={true}
                    passBtn={true}
                  />
                </div>

                <div
                  className="w-full h-[38px] bg-[#3d5306] rounded text-white flex items-center justify-center cursor-pointer"
                  onClick={handleLogin}
                >
                  Register
                </div>

                <div className="w-full">
                  <hr className="mb-5" />
                  <h1 className="text-[12px] text-[#71990d] text-center flex gap-2">
                    Already have account?
                    <span
                      className="underline cursor-pointer text-black hover:text-[#71990d]"
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      Login
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterView;
