export class DateUtils {
    static addDays(date: Date, days: number): Date {
        const result = new Date(date);
        result.setTime(result.getTime() + days * 86400000); // 86400000 ms in a day
        return result;
    }
}