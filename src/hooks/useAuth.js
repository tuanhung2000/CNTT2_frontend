import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  // const token = useSelector(selectCurrentToken);
  const token = localStorage.getItem("token");
  let isAdmin = false;
  let status = "Member";

  if (token) {
    const decoded = jwtDecode(token);
    console.log(decoded);
    const { username, role } = decoded.UserInfo;

    isAdmin = role.includes("admin");

    if (isAdmin) status = "Admin";

    return { username, role, status, isAdmin };
  }

  return { username: "", role: [], isAdmin, status };
};

export default useAuth;
