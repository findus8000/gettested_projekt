package kth.gettested.modules.reports;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

@Repository
public class ReportRepositoryCustomImpl implements ReportRepositoryCustom {

    private final MongoTemplate mongoTemplate;
    private final MongoOperations mongoOperations;


    public ReportRepositoryCustomImpl(MongoTemplate mongoOperations, MongoOperations mongoOperations1) {
        this.mongoTemplate = mongoOperations;
        this.mongoOperations = mongoOperations1;
    }

    @Override
    public List<Reports> getReportsByTestNameAndPatientGender(ObjectId testName, String gender) {
        Aggregation aggregation = newAggregation(
                lookup("patients", "patient", "_id", "patient"),
                match(Criteria.where("test").is(testName).and("patient.gender").is(gender))
        );
        AggregationResults<Reports> results = mongoTemplate.aggregate(aggregation, "reports", Reports.class);

        return results.getMappedResults();
    }


    @Override
    public List<Reports> getReportsByTestIdAndDateRange(ObjectId testId, Date startDate, Date endDate) {
        MatchOperation matchStage = Aggregation.match(
                Criteria.where("test").is(testId)
                        .and("sent").gte(startDate).lte(endDate)
        );

        Aggregation aggregation = Aggregation.newAggregation(matchStage);
        AggregationResults<Reports> results = mongoOperations.aggregate(aggregation, "reports", Reports.class);
        return results.getMappedResults();
    }

    @Override
    public List<Reports> getReportsByTestNameAndDateAndPatientGender(ObjectId testId, Date startDate, Date endDate, String gender) {
        Aggregation aggregation;
        Criteria criteria = Criteria.where("test").is(testId).and("sent").gte(startDate).lte(endDate);

        if (gender.equals("Male") || gender.equals("Female")) {
            criteria = criteria.and("patient.gender").is(gender);
            aggregation = Aggregation.newAggregation(
                    lookup("patients", "patient", "_id", "patient"),
                    match(criteria)
            );
        } else {
            aggregation = Aggregation.newAggregation(
                    match(criteria)
            );
        }

        AggregationResults<Reports> results = mongoTemplate.aggregate(aggregation, "reports", Reports.class);
        return results.getMappedResults();
    }


    @Override
    public List<Reports> getReportsByTestNameDatePatientGenderCountryCode(ObjectId testId, Date startDate, Date endDate, String gender, String phoneCode) {
        Aggregation aggregation;
        Criteria criteria = Criteria.where("test").is(testId).and("sent").gte(startDate).lte(endDate);


        if (gender.equals("Male") || gender.equals("Female")) {
            criteria = criteria.and("patient.gender").is(gender);
        }


        if (phoneCode != null && !phoneCode.trim().isEmpty()) {
            criteria = criteria.and("patient.phoneCode").is(phoneCode);
        }


        if (criteria.getCriteriaObject().containsKey("patient.gender") || criteria.getCriteriaObject().containsKey("patient.phoneCode")) {
            aggregation = Aggregation.newAggregation(
                    lookup("patients", "patient", "_id", "patient"),
                    match(criteria)
            );
        } else {
            aggregation = Aggregation.newAggregation(match(criteria));
        }

        AggregationResults<Reports> results = mongoTemplate.aggregate(aggregation, "reports", Reports.class);
        return results.getMappedResults();
    }
}

