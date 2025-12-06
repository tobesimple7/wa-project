package waapi.party.party001;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class Party001_Service {

    private final Party001_Mapper mapper;

    public Party001_Service(Party001_Mapper mapper) {   // 직접 작성
        this.mapper = mapper;
    }

    public List<Map<String, Object>> search() {
        return mapper.party001_search();
    }
}