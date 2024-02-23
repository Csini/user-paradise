package hu.spring.feladat.entity;

import java.io.Serializable;

import org.hibernate.validator.constraints.Length;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "USER_PARADISE_USER")
public class User implements Serializable {

	@Id
	@GeneratedValue
	private Long id;

	@Column(name = "firstname")
	@Length(min = 2, max = 64)
	private String firstname;

	@Column(name = "lastname")
	@Length(min = 2, max = 64)
	private String lastname;
	
	@Column(name = "address")
	@Length(min = 0, max = 128)
	private String address;

	@Column(name = "telephone")
	@Length(min = 0, max = 128)
	private String telephone;

	@Column(name = "active")
	private Boolean active = false;
	
	@Column(name = "job")
	@Enumerated(EnumType.STRING)
	private Job job = Job.UNKNOWN;
}
