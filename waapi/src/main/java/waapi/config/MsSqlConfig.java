package waapi.config;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import javax.sql.DataSource;

@Configuration
public class MsSqlConfig {

    @Bean
    @ConfigurationProperties("spring.datasource.mssql")
    public DataSourceProperties mssqlDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean
    public DataSource mssqlDataSource() {
        return mssqlDataSourceProperties().initializeDataSourceBuilder().build();
    }

    @Bean
    public SqlSessionFactory mssqlSqlSessionFactory(@Qualifier("mssqlDataSource") DataSource dataSource) throws Exception {
        SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
        factoryBean.setDataSource(dataSource);
        factoryBean.setMapperLocations(
                new PathMatchingResourcePatternResolver().getResources("classpath:mssql/**/*.xml"));
        factoryBean.setTypeAliasesPackage("waapi.model");
        return factoryBean.getObject();
    }

    @Bean
    public SqlSessionTemplate mssqlSqlSessionTemplate(@Qualifier("mssqlSqlSessionFactory") SqlSessionFactory factory) {
        return new SqlSessionTemplate(factory);
    }

    @Bean
    public DataSourceTransactionManager mssqlTransactionManager(@Qualifier("mssqlDataSource") DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }
}
