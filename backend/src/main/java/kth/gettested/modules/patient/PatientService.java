

package kth.gettested.modules.patient;

import kth.gettested.modules.patient.Patient;
import kth.gettested.modules.patient.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class PatientService {

    private final PatientRepository patientRepository;

    @Autowired
    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
        getAllPatientGenders();

    }

    public List<Patient> getAllPatientGenders() {
        return patientRepository.findAll();
    }
}

