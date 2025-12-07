package waapi.party.party002;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;


@RestController
public class Party002 {

    @GetMapping("/api/party/party002")
    public Map<String, Object> party002() {
        return Map.of(
            "message", "pary001",
            "timestamp", Instant.now().toString()
        );
    }
}