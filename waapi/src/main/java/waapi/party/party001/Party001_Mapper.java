package waapi.party.party001;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface Party001_Mapper {
    List<Map<String, Object>> party001_search();
}
