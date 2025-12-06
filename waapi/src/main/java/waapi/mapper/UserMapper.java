package waapi.mapper;

import org.apache.ibatis.annotations.Mapper;
import waapi.model.User;

@Mapper
public interface UserMapper {
    User findByUsername(String username);
}
