

package kth.gettested.modules.patient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;


@Service
public class PatientService {

    private final PatientRepository patientRepository;

    @Autowired
    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public List<Patient> getAllPatientGenders() {
        return patientRepository.findAll();
    }

    public List<Patient> getPatientAfterPhoneCode(String phoneCode) {return patientRepository.findByphoneCode(phoneCode);}

    public List<Patient> getBetween(String start,String end){
        return patientRepository.findByDateOfBirthBetween(start,end);
    }

}

