package kth.gettested.modules;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PatientRepository extends MongoRepository<Patient, String> {

}
