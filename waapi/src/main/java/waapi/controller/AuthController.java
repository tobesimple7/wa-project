package waapi.controller;

import org.springframework.web.bind.annotation.*;
import waapi.service.AuthService;
import jakarta.servlet.http.HttpSession;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // 로그인
    @PostMapping("/login")
    public Map<String, Object> login(
            @RequestParam String username,
            @RequestParam String password,
            HttpSession session) {

        boolean success = authService.login(username, password, session);
        return Map.of(
                "success", success,
                "message", success ? "Login successful" : "Invalid username or password"
        );
    }

    // 로그아웃
    @PostMapping("/logout")
    public Map<String, Object> logout(HttpSession session) {
        authService.logout(session);
        return Map.of("success", true, "message", "Logged out successfully");
    }

    // 세션 상태 조회
    @GetMapping("/session")
    public Map<String, Object> session(HttpSession session) {
        Object user = session.getAttribute("user");
        return Map.of(
                "loggedIn", user != null,
                "user", user
        );
    }
}
