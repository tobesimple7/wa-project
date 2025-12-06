package waapi.config;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import javax.sql.DataSource;

@Configuration
public class MariaDbConfig {

    @Bean
    @Primary
    @ConfigurationProperties("spring.datasource.maria")
    public DataSourceProperties mariaDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean
    @Primary
    public DataSource mariaDataSource() {
        return mariaDataSourceProperties().initializeDataSourceBuilder().build();
    }

    @Bean
    @Primary
    public SqlSessionFactory mariaSqlSessionFactory(@Qualifier("mariaDataSource") DataSource dataSource) throws Exception {
        SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
        factoryBean.setDataSource(dataSource);
        factoryBean.setMapperLocations(
                new PathMatchingResourcePatternResolver().getResources("classpath:maria/**/*.xml"));
        factoryBean.setTypeAliasesPackage("waapi.model");
        return factoryBean.getObject();
    }

    @Bean
    @Primary
    public SqlSessionTemplate mariaSqlSessionTemplate(@Qualifier("mariaSqlSessionFactory") SqlSessionFactory factory) {
        return new SqlSessionTemplate(factory);
    }

    @Bean
    @Primary
    public DataSourceTransactionManager mariaTransactionManager(@Qualifier("mariaDataSource") DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }
}
