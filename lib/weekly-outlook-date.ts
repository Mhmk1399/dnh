import {
  WEEKLY_OUTLOOK_DATE_CALENDARS,
  type WeeklyOutlookDateCalendar,
} from "@/lib/weekly-outlook";

export type JalaliDateParts = {
  year: number;
  month: number;
  day: number;
};

export const weeklyOutlookDateCalendarLabels: Record<
  WeeklyOutlookDateCalendar,
  string
> = {
  jalali: "شمسی",
  gregorian: "میلادی",
};

export const jalaliMonthNames = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
] as const;

const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const GREGORIAN_CALENDAR_LOCALE = "fa-IR-u-ca-gregory";
const JALALI_CALENDAR_LOCALE = "fa-IR-u-ca-persian";
const breaks = [
  -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097,
  2192, 2262, 2324, 2394, 2456, 3178,
];

function div(a: number, b: number) {
  return Math.trunc(a / b);
}

function mod(a: number, b: number) {
  return a - Math.trunc(a / b) * b;
}

function jalCal(jy: number) {
  const bl = breaks.length;
  const gy = jy + 621;
  let leapJ = -14;
  let jp = breaks[0];
  let jm = breaks[1];
  let jump = 0;

  if (jy < jp || jy >= breaks[bl - 1]) {
    throw new Error("Jalali year is out of supported range");
  }

  for (let i = 1; i < bl; i += 1) {
    jm = breaks[i];
    jump = jm - jp;

    if (jy < jm) break;

    leapJ += div(jump, 33) * 8 + div(mod(jump, 33), 4);
    jp = jm;
  }

  let n = jy - jp;

  leapJ += div(n, 33) * 8 + div(mod(n, 33) + 3, 4);

  if (mod(jump, 33) === 4 && jump - n === 4) {
    leapJ += 1;
  }

  const leapG =
    div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;
  const march = 20 + leapJ - leapG;

  if (jump - n < 6) {
    n = n - jump + div(jump + 4, 33) * 33;
  }

  let leap = mod(mod(n + 1, 33) - 1, 4);

  if (leap === -1) {
    leap = 4;
  }

  return { leap, gy, march };
}

function g2d(gy: number, gm: number, gd: number) {
  let day =
    div((gy + div(gm - 8, 6) + 100100) * 1461, 4) +
    div(153 * mod(gm + 9, 12) + 2, 5) +
    gd -
    34840408;

  day =
    day -
    div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) +
    752;

  return day;
}

function d2g(jdn: number) {
  let j = 4 * jdn + 139361631;

  j =
    j +
    div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 -
    3908;

  const i = div(mod(j, 1461), 4) * 5 + 308;
  const day = div(mod(i, 153), 5) + 1;
  const month = mod(div(i, 153), 12) + 1;
  const year = div(j, 1461) - 100100 + div(8 - month, 6);

  return { year, month, day };
}

function j2d(jy: number, jm: number, jd: number) {
  const r = jalCal(jy);

  return (
    g2d(r.gy, 3, r.march) +
    (jm - 1) * 31 -
    div(jm, 7) * (jm - 7) +
    jd -
    1
  );
}

function d2j(jdn: number): JalaliDateParts {
  const gregorian = d2g(jdn);
  let jy = gregorian.year - 621;
  const r = jalCal(jy);
  const jdn1f = g2d(gregorian.year, 3, r.march);
  let k = jdn - jdn1f;

  if (k >= 0) {
    if (k <= 185) {
      return {
        year: jy,
        month: 1 + div(k, 31),
        day: mod(k, 31) + 1,
      };
    }

    k -= 186;
  } else {
    jy -= 1;
    k += 179;

    if (jalCal(jy).leap === 1) {
      k += 1;
    }
  }

  return {
    year: jy,
    month: 7 + div(k, 30),
    day: mod(k, 30) + 1,
  };
}

function isLeapJalaliYear(year: number) {
  return jalCal(year).leap === 0;
}

export function normalizeWeeklyOutlookDateCalendar(
  value: unknown,
): WeeklyOutlookDateCalendar {
  return typeof value === "string" &&
    WEEKLY_OUTLOOK_DATE_CALENDARS.includes(
      value as WeeklyOutlookDateCalendar,
    )
    ? (value as WeeklyOutlookDateCalendar)
    : "jalali";
}

export function parseIsoDateOnly(value: unknown) {
  if (typeof value !== "string") return null;

  const match = value.match(ISO_DATE_PATTERN);

  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day, 12));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return date;
}

export function dateOnlyToStorageDate(value: string) {
  return parseIsoDateOnly(value) ?? parseIsoDateOnly(todayIsoDate())!;
}

export function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

export function jalaliMonthLength(year: number, month: number) {
  if (month <= 6) return 31;
  if (month <= 11) return 30;

  return isLeapJalaliYear(year) ? 30 : 29;
}

export function isValidJalaliDate(year: number, month: number, day: number) {
  if (!Number.isInteger(year) || year < 1) return false;
  if (!Number.isInteger(month) || month < 1 || month > 12) return false;
  if (!Number.isInteger(day)) return false;

  return day >= 1 && day <= jalaliMonthLength(year, month);
}

export function gregorianToJalaliDateParts(
  isoDate: string,
): JalaliDateParts {
  const date = parseIsoDateOnly(isoDate) ?? parseIsoDateOnly(todayIsoDate())!;

  return d2j(
    g2d(
      date.getUTCFullYear(),
      date.getUTCMonth() + 1,
      date.getUTCDate(),
    ),
  );
}

export function jalaliToGregorianDateString(
  year: number,
  month: number,
  day: number,
) {
  const safeDay = Math.min(day, jalaliMonthLength(year, month));
  const gregorian = d2g(j2d(year, month, safeDay));

  return [
    gregorian.year.toString().padStart(4, "0"),
    gregorian.month.toString().padStart(2, "0"),
    gregorian.day.toString().padStart(2, "0"),
  ].join("-");
}

export function formatWeeklyOutlookDate(
  value: Date | string,
  calendar: WeeklyOutlookDateCalendar = "jalali",
  dateStyle: Intl.DateTimeFormatOptions["dateStyle"] = "long",
) {
  const date =
    value instanceof Date
      ? parseIsoDateOnly(value.toISOString().slice(0, 10))
      : parseIsoDateOnly(value);

  const resolvedDate = date ?? parseIsoDateOnly(todayIsoDate())!;
  const locale =
    calendar === "gregorian"
      ? GREGORIAN_CALENDAR_LOCALE
      : JALALI_CALENDAR_LOCALE;

  return new Intl.DateTimeFormat(locale, {
    dateStyle,
    timeZone: "UTC",
  }).format(resolvedDate);
}
