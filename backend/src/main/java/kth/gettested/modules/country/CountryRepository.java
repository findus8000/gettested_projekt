package kth.gettested.modules.country;
import kth.gettested.modules.country.Country;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CountryRepository extends MongoRepository<Country, String> {
    // Add custom query methods if needed
}
