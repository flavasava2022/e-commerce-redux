import { Button, Form, Input } from "antd";
import signUpPic from "../../assets/6310507.jpg";

import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

import { setCurrentUser } from "../../store/user/user.reducer";
import { useDispatch } from "react-redux";
import { signUp } from "../../utils/strapi/strapi";
import { useNavigate } from "react-router-dom";
function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    if (values.password === values.ConfirmPass) {
      let email = values.email;
      let password = values.password;
      let displayName = values.username;
      try {
        const user = await signUp(email, password, displayName);
        dispatch(setCurrentUser(user));
        navigate("/");
      } catch (error) {
        console.log(error.response?.data?.error?.message || error.message);
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
      <div className="w-[60%]">
        <img src={signUpPic} alt="" className="w-full object-cover" />
      </div>
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
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
