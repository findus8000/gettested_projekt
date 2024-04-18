package kth.gettested.modules.reports;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReportsService {
    private final ReportsRepository reportsRepository;
    private final ReportRepositoryCustom reportRepositoryCustom;

    @Autowired
    public ReportsService(ReportsRepository reportsRepository, ReportRepositoryCustom reportRepositoryCustom) {
        this.reportsRepository = reportsRepository;
        this.reportRepositoryCustom = reportRepositoryCustom;
    }

    public List<Reports> getAllReports() {
        return reportsRepository.findAll();
    }


    public List<Reports> getReportsByTestIdAndPatientGender(ObjectId testId,String gender) {
        return reportRepositoryCustom.getReportsByTestNameAndPatientGender(testId, gender);
    }

    public List<Reports> getReportsByTestId(ObjectId testId) {
        return reportsRepository.findByTestId(testId);
    }
}
