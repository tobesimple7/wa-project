package waapi.accounting.fa010;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface Fa010Mapper {
    List<Map<String, Object>> FA010_SEARCH();
}
