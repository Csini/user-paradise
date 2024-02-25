package hu.spring.feladat;

import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import hu.spring.feladat.entity.User;
import hu.spring.feladat.repository.UserRepository;

@DataJpaTest
@ExtendWith(SpringExtension.class)
//@ContextConfiguration(classes = { SpringTestConfiguration.class })
public class UserJpaTest {

    @Autowired
    private TestEntityManager entityManager;
    @Autowired
    private UserRepository userRepository;

    @Test
    public void testFindByFirstNameMethod_usingEntityManager() {
        User expectedUser = new User();
        expectedUser.setLastname("lastname");
        expectedUser.setFirstname("firstname");
        
        entityManager.persist(expectedUser);
		List<User> assertUserList = userRepository.findAll();
		
		Assertions.assertEquals(1, assertUserList.size());
		Assertions.assertEquals(expectedUser,assertUserList.get(0));
		Assertions.assertNotNull(assertUserList.get(0).getId());
    }

}
