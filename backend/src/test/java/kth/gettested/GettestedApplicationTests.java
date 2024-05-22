package kth.gettested;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class GettestedApplicationTests {

	@Autowired
	private MyController controller;

	@Test
	void contextLoads() throws Exception{
		assertThat(controller).isNotNull();

	}

}
