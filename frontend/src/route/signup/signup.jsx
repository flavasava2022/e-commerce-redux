import { Button, Form, Input } from "antd";
import signUpPic from "../../assets/6310507.jpg";
import { Link } from "react-router-dom";

import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase";
function Signup() {
  const onFinish = async (values) => {
    if (values.password === values.ConfirmPass) {
      let email = values.email;
      let password = values.password;
      let displayName = values.username;
      try {
        createAuthUserWithEmailAndPassword(email, password, displayName);
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          console.log("already in use");
        } else {
          console.log(error);
        }
      }
    } else {
      console.log("error");
    }
    // console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="flex items-center justify-start gap-6 h-[80vh] ">
      <img src={signUpPic} alt="" className="max-h-[100%]" />
      <div className=" flex flex-col   h-full justify-center gap-2">
        <h1 className="text-[32px] font-semibold text-[#6895D2]">
          Create an account
        </h1>

        <div>
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            className="flex flex-col gap-2 w-[400px] mt-4"
          >
            <Form.Item
              label="Name"
              name="username"
              className="m-0"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Name"
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              className="m-0"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                type="email"
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              className="m-0"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="ConfirmPass"
              className="m-0"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item>

            <div className="flex flex-col gap-4 mt-4 items-center w-full">
              <Form.Item className="m-0 w-full">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full rounded-full p-4 h-auto flex items-center justify-center text-base"
                >
                  Create Account
                </Button>
              </Form.Item>

              <p className="text-base mt-2">
                Already have account?{" "}
                <Link
                  to={"/logIn"}
                  className=" underline
"
                >
                  log in
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
