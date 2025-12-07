/**
 * dto는 사용하지 않는 것으로 함
 */
package waapi.accounting.fa010;
import lombok.Data;

public class FaDto010 {
    @Data
    public static class Party001Dto_Search {
        private String name;
        private int age;
    }

    @Data
    public static class Party001Dto_Search2 {
        private String name;
        private int age;
    }

    @Data
    public static class Response {
        private String message;
        private String timestamp;
    }
}
