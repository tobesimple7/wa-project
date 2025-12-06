package waapi.accounting.fa010;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class Fa010Service {

    private final Fa010Mapper mapper;

    public Fa010Service(Fa010Mapper mapper) {   // 직접 작성
        this.mapper = mapper;
    }

    public List<Map<String, Object>> search() {
        return mapper.FA010_SEARCH();
    }
}