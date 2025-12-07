package waapi.party.party001;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface PartyMapper001 {
    List<Map<String, Object>> party001_search();
}
