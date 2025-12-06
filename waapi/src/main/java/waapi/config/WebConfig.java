package waapi.config; 

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")             // 허용할 API 경로
                        .allowedOrigins("http://localhost:5173") // Vue 개발 서버
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "FETCH", "HTTP", "XHR")
                        //.allowCredentials(true)              // 세션 쿠키 공유(JSESSIONID)
                        .allowedHeaders("*");
            }
        };
    }
}
