export const processReportData = (userData, reportType) => {
  const processedData = userData.map((entry) => ({
    ...entry,
    totalWorkTime: entry.cycles * parseInt(entry.workMinutes, 10),
  }));

  if (reportType === "Yearly") {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return processedData.reduce((acc, entry) => {
      const date = new Date(entry.startTime.seconds * 1000);
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();

      const existingIndex = acc.findIndex(
        (item) => item.displayDate === `${month} ${year}`
      );

      if (existingIndex === -1) {
        acc.push({ ...entry, displayDate: `${month} ${year}` });
      } else {
        acc[existingIndex].totalWorkTime += entry.totalWorkTime;
      }

      return acc;
    }, []);
  } else {
    return processedData.reduce((acc, entry) => {
      const existingIndex = acc.findIndex(
        (item) => item.displayDate === entry.displayDate
      );

      if (existingIndex === -1) {
        acc.push(entry);
      } else {
        acc[existingIndex].totalWorkTime += entry.totalWorkTime;
      }

      return acc;
    }, []);
  }
};
