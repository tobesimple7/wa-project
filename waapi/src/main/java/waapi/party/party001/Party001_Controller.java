package waapi.party.party001;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@RestController
public class Party001_Controller {

    private final Party001_Service svc;

    public Party001_Controller(Party001_Service svc) {
        this.svc = svc;
    }

    @GetMapping("/api/party001/search")
    public List<Map<String, Object>> search() {

        return svc.search();
    }
    @GetMapping("/api/party001/hello2")
    public Map<String, Object> hello2() {
        return Map.of(
                "message", "1Hello from Spring Boot 2.5.2 (JDK 17)",
                "timestamp", Instant.now().toString()
        );
    }
}