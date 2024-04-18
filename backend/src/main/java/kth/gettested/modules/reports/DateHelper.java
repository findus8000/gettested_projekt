package kth.gettested.modules.reports;

import java.util.Calendar;
import java.util.Date;

public class DateHelper {

    /**
     * Get the start and end dates for the specified season.
     *
     * @param season the season name ("Spring", "Summer", "Autumn", "Winter")
     * @return an array of two dates, where the first element is the start date and the second is the end date of the season
     */
    public static Date[] getSeasonDateRange(String season) {
        Calendar start = Calendar.getInstance();
        Calendar end = Calendar.getInstance();

        switch (season.toLowerCase()) {
            case "spring":
                start.set(Calendar.MONTH, Calendar.MARCH);
                start.set(Calendar.DAY_OF_MONTH, 1);
                end.set(Calendar.MONTH, Calendar.MAY);
                end.set(Calendar.DAY_OF_MONTH, 31);
                break;
            case "summer":
                start.set(Calendar.MONTH, Calendar.JUNE);
                start.set(Calendar.DAY_OF_MONTH, 1);
                end.set(Calendar.MONTH, Calendar.AUGUST);
                end.set(Calendar.DAY_OF_MONTH, 31);
                break;
            case "autumn":
                start.set(Calendar.MONTH, Calendar.SEPTEMBER);
                start.set(Calendar.DAY_OF_MONTH, 1);
                end.set(Calendar.MONTH, Calendar.NOVEMBER);
                end.set(Calendar.DAY_OF_MONTH, 30);
                break;
            case "winter":
                // Handle winter crossing over the year boundary
                if (start.get(Calendar.MONTH) <= Calendar.FEBRUARY) {  // If it's currently January or February
                    start.set(Calendar.YEAR, start.get(Calendar.YEAR) - 1); // Set to December last year
                }
                start.set(Calendar.MONTH, Calendar.DECEMBER);
                start.set(Calendar.DAY_OF_MONTH, 1);
                end.set(Calendar.MONTH, Calendar.FEBRUARY);
                end.set(Calendar.DAY_OF_MONTH, 28);

                break;
            default:
                throw new IllegalArgumentException("Invalid season name");
        }
        start.set(Calendar.HOUR_OF_DAY, 0);
        start.set(Calendar.MINUTE, 0);
        start.set(Calendar.SECOND, 0);
        start.set(Calendar.MILLISECOND, 0);

        end.set(Calendar.HOUR_OF_DAY, 23);
        end.set(Calendar.MINUTE, 59);
        end.set(Calendar.SECOND, 59);
        end.set(Calendar.MILLISECOND, 999);

        return new Date[] { start.getTime(), end.getTime() };
    }
}
