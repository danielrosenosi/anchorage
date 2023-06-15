export const calculationAttendanceStatus = (
    symptoms: any,
    setAttendanceStatus: (attendanceStatus: number) => void
) => {
    const symptomsCount = Object.values(symptoms).filter((symptom: any) => symptom).length;

    if(symptomsCount > 1 && symptomsCount <= 5) {
        return setAttendanceStatus(1);
    } else if(symptomsCount >= 6 && symptomsCount <= 8) {
        return setAttendanceStatus(2);
    } else if(symptomsCount >= 9) {
        return setAttendanceStatus(3);
    } else {
        return setAttendanceStatus(4);
    }
};