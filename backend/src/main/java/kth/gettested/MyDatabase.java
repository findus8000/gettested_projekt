package kth.gettested;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyDatabase extends MongoRepository<Country, String> {
    // Add custom query methods if needed
}
