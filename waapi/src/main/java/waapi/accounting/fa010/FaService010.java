package waapi.accounting.fa010;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

@Service
public class FaService010 {

    private final FaMapper010 mapper;

    public FaService010(FaMapper010 mapper) {   // 직접 작성
        this.mapper = mapper;
    }

    public List<Map<String, Object>> search(@RequestBody List<Map<String, Object>> requestList) {
        return mapper.fa010_search();
    }
}