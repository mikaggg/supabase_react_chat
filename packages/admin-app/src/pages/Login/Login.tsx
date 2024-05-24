import { useForm, SubmitHandler } from "react-hook-form";
import Box from "@mui/material/Box";
import { Button, Container, Paper, Typography } from "@mui/material";
import { InputText } from "../../component/InputText";
import { supabase } from "../../utils/supabase";
import { useNavigate } from "react-router-dom";

export type FormValues = {
  email?: string;
  password?: string;
};

export const Login = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FormValues>();

  const validationRules = {
    email: {
      required: "メールアドレスは必須項目です。",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "メールアドレスを入力して下さい。",
      },
      maxLength: { value: 254, message: "メールアドレスは254文字以下" },
    },
    password: {
      required: "パスワードは必須項目です。",
      minLength: { value: 6, message: "パスアードは6文字以上" },
    },
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const { email, password } = data;
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        throw new Error(error.message);
        console.log(`Error: error.message`);
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Paper style={{ width: "30%", margin: "auto" }}>
      <Container component="main" maxWidth="xl">
        <Typography variant="h3" align="left">
          Login
        </Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            width: "100%",
            flexGrow: 1,
          }}
          onClick={handleSubmit(onSubmit)}
        >
          <InputText
            name={"email"}
            rules={validationRules.email}
            required={true}
            id={"email"}
            type={"email"}
            label={"Email Address"}
            autoComplete={"email"}
            autoFocus={true}
            control={control}
          />
          <InputText
            name={"password"}
            rules={validationRules.password}
            required={true}
            id={"password"}
            type={"password"}
            label={"password"}
            autoComplete={"password"}
            autoFocus={true}
            control={control}
          />
          <Button
            disabled={isSubmitting}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            LOG IN
          </Button>
        </Box>
      </Container>
      <Typography>パスワード忘れはこちら</Typography>
    </Paper>
  );
};
