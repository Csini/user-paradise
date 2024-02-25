package hu.spring.feladat.config;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


import hu.spring.feladat.dozer.OffsetDateTimeConverter;

@Configuration
public class MapperConfiguration {
	
	@Autowired
	OffsetDateTimeConverter offsetDateTimeConverter;
	
	@Bean
	public ModelMapper getMapper() {
		ModelMapper mapper = new ModelMapper(); 
		mapper.addConverter(offsetDateTimeConverter);
		return mapper;
	}
}
