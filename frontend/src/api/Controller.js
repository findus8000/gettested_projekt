import axios from "axios";

async function getAllReports(testName, startDate, endDate) {
    try {
        const response = await axios.get(`http://localhost:8080/api/reports/byTestIdAndDateRange`, {
            params: { testName, startDate, endDate }
        });
        const results = response.data.map(entity => entity.results).filter(r => r);
        console.log("Data from server:", results);

        if (results.length === 0) {
            console.log("No results available in data.");
            return [];
        }

        const aggregatedResults = results.map(arr =>
            arr.map(result => ({
                name: result.name || 'Unnamed',
                value: parseFloat(result.value.replace('<', '').trim())
            })).filter(result => !isNaN(result.value))
        );

        return aggregatedResults.reduce((acc, curr) => {
            curr.forEach(item => {
                const existing = acc.find(a => a.name === item.name);
                if (existing) {
                    existing.value += item.value;
                    existing.count++;
                } else {
                    acc.push({ ...item, count: 1 });
                }
            });
            return acc;
        }, []).map(item => ({
            name: item.name,
            value: item.value / item.count,
            amt: 2000
        }));
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

export { getAllReports };
