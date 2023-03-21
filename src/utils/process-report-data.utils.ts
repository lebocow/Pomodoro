import { PomodoroData } from "./firebase/firebase.utils";

export const processReportData = (
  userData: PomodoroData[],
  reportType: string
) => {
  const processedData = userData.map((entry) => ({
    ...entry,
    totalWorkTime: entry.cycles * entry.workMinutes,
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

    return processedData.reduce((acc: PomodoroData[], entry) => {
      const date = new Date(entry.startTime);
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
    return processedData.reduce((acc: PomodoroData[], entry) => {
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
