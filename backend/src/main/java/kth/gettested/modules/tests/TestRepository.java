package kth.gettested.modules.tests;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface TestRepository extends MongoRepository<Test, String> {
    // Add custom query methods if needed
}
