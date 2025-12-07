package waapi.accounting.fa010;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface FaMapper010 {
    List<Map<String, Object>> fa010_search();
}
