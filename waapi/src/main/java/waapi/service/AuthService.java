package waapi.service;

import org.springframework.stereotype.Service;
import waapi.mapper.UserMapper;
import waapi.model.User;
import jakarta.servlet.http.HttpSession;

@Service
public class AuthService {

    private final UserMapper userMapper;

    public AuthService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    /** 로그인 처리 */
    public boolean login(String username, String password, HttpSession session) {
        User user = userMapper.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            session.setAttribute("user", user);
            return true;
        }
        return false;
    }

    /** 로그아웃 처리 */
    public void logout(HttpSession session) {
        session.invalidate();
    }
}
