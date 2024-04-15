package kth.gettested.modules.reports;

import kth.gettested.modules.reports.Reports;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ReportsRepository extends MongoRepository<Reports, String> {

}
