package waapi.accounting.fa010;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@RestController
public class Fa010 {

    private final FaService010 svc;

    public Fa010(FaService010 svc) { this.svc = svc; }

    @PostMapping("/api/fa010_search")
    public List<Map<String, Object>> search(@RequestBody List<Map<String, Object>> requestList) {
        return svc.search(requestList);
    }

    @GetMapping("/api/fa001/hello2")
    public Map<String, Object> hello2() {
        return Map.of(
                "message", "1Hello from Spring Boot 2.5.2 (JDK 17)",
                "timestamp", Instant.now().toString()
        );
    }
}