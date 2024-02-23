package hu.spring.feladat.config;

import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;
import org.dozer.loader.api.BeanMappingBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;

@Configuration
public class DozerConfiguration {
	
	@Bean
	public Mapper getMapper() {
//		BeanMappingBuilder builder = new BeanMappingBuilder() {
//
//			protected void configure() {
//				mapping(org.archfirst.bfoms.domain.security.User.class,
//						org.archfirst.bfoms.webservice.security.User.class).fields("person.firstName", "firstName")
//								.fields("person.lastName", "lastName");
//				mapping(org.archfirst.bfoms.domain.security.User.class, org.archfirst.bfoms.restservice.user.User.class)
//						.fields("person.firstName", "firstName").fields("person.lastName", "lastName");
//				mapping(org.archfirst.bfoms.domain.account.brokerage.order.Order.class,
//						org.archfirst.bfoms.restservice.order.Order.class).fields("account.id", "accountId")
//								.fields("account.name", "accountName")
//								.fields("creationTime", "creationTime", copyByReference())
//								.fields("quantity", "quantity", copyByReference())
//								.fields("cumQty", "cumQty", copyByReference())
//								.fields("limitPrice", "limitPrice", copyByReference());
//				mapping(org.archfirst.bfoms.domain.account.brokerage.order.Execution.class,
//						org.archfirst.bfoms.restservice.order.Execution.class)
//								.fields("creationTime", "creationTime", copyByReference())
//								.fields("quantity", "quantity", copyByReference())
//								.fields("price", "price", copyByReference());
//			}
//		};
		// Create mapper
		DozerBeanMapper mapper = new DozerBeanMapper();
		// Add mappings
//		mapper.addMapping(builder);
		return mapper;
	}
}
