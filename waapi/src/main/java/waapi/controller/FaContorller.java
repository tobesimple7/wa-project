package waapi.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Map;

public class FaContorller {
    // 회계전표
    @GetMapping("/api/fa010_search")
    public Map<String, Object> session(HttpSession session) {
        Object user = session.getAttribute("user");
        return Map.of(
                "loggedIn", user != null,
                "user", user
        );
    }
}
