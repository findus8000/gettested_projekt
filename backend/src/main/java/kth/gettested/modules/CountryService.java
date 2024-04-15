package kth.gettested.modules;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryService {

    private final CountryRepository repository;

    @Autowired
    public CountryService(CountryRepository repository) {
        this.repository = repository;
        readAllCountry();
    }

  /*  public void readFromDatabase() {
        // Perform a read operation
        List<Country> entities = repository.findAll();
        for (int i = 0; i < entities.size()/2 ; i++) {
            System.out.println( entities.get(i).getName());
        };
        //entities.forEach(System.out::println);
    }
   */
    public List<Country> readAllCountry() {
        return repository.findAll();
    }
}
