package kth.gettested.modules.country;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CountryPhoneCodeLookupTable {

    private final CountryRepository countryRepository;
    private final Map<String, String> countryToPhoneCodeMap = new HashMap<>();

    @Autowired
    public CountryPhoneCodeLookupTable(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    @PostConstruct
    public void init() {
        List<Country> countries = countryRepository.findAll();
        countries.forEach(country -> countryToPhoneCodeMap.put( country.getName(),country.getPhoneCode()));
    }

    public String getPhoneCodeByCountryName(String countryName) {
        return countryToPhoneCodeMap.get(countryName);
    }
}
