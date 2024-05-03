package kth.gettested.modules.patient;

import kth.gettested.modules.patient.Patient;
import kth.gettested.modules.reports.Reports;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;


@Repository
public interface PatientRepository extends MongoRepository<Patient, String> {
    @Query("{'phoneCode': ?0}")
    List<Patient> findByphoneCode(String phoneCode);

    @Query("{'dateOfBirth': {$gte: ?0, $lte: ?1}}")
    List<Patient> findByDateOfBirthBetween(String start, String end);
}
