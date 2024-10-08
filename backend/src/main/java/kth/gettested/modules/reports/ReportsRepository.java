package kth.gettested.modules.reports;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;


@Repository
public interface ReportsRepository extends MongoRepository<Reports, String> {
    @Query("{'test': ?0}")
    List<Reports> findByTestId(ObjectId testId);

}
