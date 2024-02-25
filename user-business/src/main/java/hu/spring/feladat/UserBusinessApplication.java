package hu.spring.feladat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@SpringBootApplication
//@EnableJpaRepositories
//@EnableTransactionManagement
@ComponentScan
public class UserBusinessApplication {

	public static void main(String[] args) {
		SpringApplication.run(UserBusinessApplication.class, args);
	}

}
