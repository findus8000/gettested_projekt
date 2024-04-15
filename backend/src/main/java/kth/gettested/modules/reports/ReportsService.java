package kth.gettested.modules.reports;

import kth.gettested.modules.patient.Patient;
import kth.gettested.modules.patient.PatientRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReportsService {
    private final ReportsRepository reportsRepository;

    @Autowired
    public ReportsService(ReportsRepository reportsRepository) {
        this.reportsRepository = reportsRepository;
    }

    public List<Reports> getAllReports() {
        return reportsRepository.findAll();
    }
}
