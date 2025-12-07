package waapi.party.party001;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class PartyService001 {

    private final PartyMapper001 mapper;

    public PartyService001(PartyMapper001 mapper) {   // 직접 작성
        this.mapper = mapper;
    }

    public List<Map<String, Object>> search() {
        return mapper.party001_search();
    }
}