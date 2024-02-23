package hu.spring.feladat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@SpringBootApplication
//@EnableJpaRepositories
@EnableTransactionManagement
public class UserBusinessApplication {

	public static void main(String[] args) {
		SpringApplication.run(UserBusinessApplication.class, args);
	}

}
