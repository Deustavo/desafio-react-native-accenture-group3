import { DateInfo } from '../store/modules/accounts/types';

export const brlMask = (value: string): string => {
    let cleanValue = value.replace(/\D/g, '');

    if (!cleanValue) {
        return '';
    }
    if (cleanValue.length > 6) {
        cleanValue = cleanValue.slice(0, -1);
    }

    if (cleanValue.length === 6) {
        cleanValue =
            cleanValue.slice(0, 1) +
            '.' +
            cleanValue.slice(1, 4) +
            ',' +
            cleanValue.slice(-2);
    } else if (cleanValue.length >= 3) {
        cleanValue = cleanValue.slice(0, -2) + ',' + cleanValue.slice(-2);
    }
    return cleanValue;
};

export const formatDate = (date: string): string => {
    type Months = {
        [key: string]: string;
    };

    const months: Months = {
        '01': 'Jan',
        '02': 'Fev',
        '03': 'Mar',
        '04': 'Abr',
        '05': 'Mai',
        '06': 'Jun',
        '07': 'Jul',
        '08': 'Ago',
        '09': 'Set',
        '10': 'Out',
        '11': 'Nov',
        '12': 'Dez',
    };
    const [, mes, dia] = date.split('-');
    return `Dia ${dia} de ${months[mes]}.`;
};

export function formatCPF(cpf: string) {
    return cpf
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
}

export function createFloat(value: string | number): number {
    if (typeof value === 'number') return value;
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length < 3) return Number(cleanValue);
    return Number(cleanValue.slice(0, -2) + '.' + cleanValue.slice(-2));
}

export function getDateInfo(): DateInfo[] {
    const date = new Date();
    const currMonth = date.getMonth() + 1;
    const currMonthString = String(currMonth).padStart(2, '0');
    const currYear = date.getFullYear();
    const lastDayOfMonth = new Date(currYear, currMonth, 0).getDate();
    date.setDate(1);
    date.setMonth(date.getMonth() - 1);

    const lastMonth = date.getMonth() + 1;
    const lastMonthString = String(lastMonth).padStart(2, '0');
    const lastMonthYear = date.getFullYear();
    const previousLastDayOfMonth = new Date(
        lastMonthYear,
        lastMonth,
        0
    ).getDate();

    return [
        { month: currMonthString, year: currYear, lastDay: lastDayOfMonth },
        {
            month: lastMonthString,
            year: lastMonthYear,
            lastDay: previousLastDayOfMonth,
        },
    ];
}
