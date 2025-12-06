package waapi.accounting.fa010;
import lombok.Data;

public class Fa010Dto {
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
