package kth.gettested.modules.patient;

import kth.gettested.modules.patient.Patient;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PatientRepository extends MongoRepository<Patient, String> {

}
