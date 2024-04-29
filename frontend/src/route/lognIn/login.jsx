import { Button, Form, Input } from "antd";
import signUpPic from "../../assets/6310507.jpg";
import { Link } from "react-router-dom";
import googleIco from "../../assets/Icon-Google.svg";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import {
  signInAuthWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase";

function LogIn() {
  const onFinish = async (values) => {
    try {
      signInAuthWithEmailAndPassword(values.email, values.password);
      // console.log(user);
    } catch (error) {
      if (error.code === "auth / invalid - credential") {
        console.log("already in use");
      } else {
        console.log(error);
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const logInWithGoogle = async () => {
    signInWithGooglePopup();
  };
  return (
    <div className="flex items-center justify-start gap-6 h-[80vh] ">
      <img src={signUpPic} alt="" className="max-h-[100%]" />
      <div className=" flex flex-col   h-full justify-center gap-2">
        <h1 className="text-[32px] font-semibold text-[#6895D2]">
          Log in to MEGA Store
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

            <div className="flex flex-col gap-4 mt-4 items-center w-full">
              <Form.Item className="m-0 w-full">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full rounded-full p-4 h-auto flex items-center justify-center text-base"
                >
                  Log in
                </Button>
              </Form.Item>
              <Button
                className="w-full rounded-full p-4 h-auto flex items-center justify-center gap-2"
                onClick={logInWithGoogle}
              >
                <img src={googleIco} alt="" />
                <p className="text-base">Log in with Google</p>
              </Button>
              <p className="text-base mt-2">
                Don't have account?{" "}
                <Link
                  to={"/signUp"}
                  className=" underline
"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
