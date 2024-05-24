import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "../utils/supabase";
import { authUserType } from "../../types/FormProps";

interface AuthState {
  authUser: authUserType | null;
}
// Contextの作成
const AuthContext = createContext<AuthState | undefined>(undefined);

// Contextプロバイダーの作成
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authUser, setAuthUser] = useState<authUserType | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user);
      if (user) {
        setAuthUser({ id: user?.id, email: user?.email });
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser }}>{children}</AuthContext.Provider>
  );
};

// Contextを使用するカスタムフック
export const useAuth = () => {
  return useContext(AuthContext);
};
