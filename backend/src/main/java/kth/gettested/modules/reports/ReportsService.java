package kth.gettested.modules.reports;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
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


    // ReportsService.java
    public List<Reports> getReportsByTestIdAndDateRange(ObjectId testId, Date startDate, Date endDate) {
        return reportRepositoryCustom.getReportsByTestIdAndDateRange(testId, startDate, endDate);
    }

    public List<Reports> getReportsByTestIdAndDateAndGender(ObjectId testId, Date startDate, Date endDate, String gender) {
        return reportRepositoryCustom.getReportsByTestNameAndDateAndPatientGender(testId,startDate,endDate,gender);
    }

    public List<Reports> getReportsByTestNameDatePatientGenderAndCountryCode(ObjectId testId, Date startDate, Date endDate, String gender, String phoneCode){
        return reportRepositoryCustom.getReportsByTestNameDatePatientGenderCountryCode(testId, startDate, endDate, gender, phoneCode);
    }

}


