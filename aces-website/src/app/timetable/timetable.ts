export interface DayEntry {
  day: string;
  startTime?: string;
  endTime?: string;
}

export interface TimetableEntry {
  id?: string;
  courseTitle?: string;
  level?: string;
  session?: string;
  semester?: string;
  courseCode?: string;
  lecturers?: string[];
  days?: DayEntry[];
}

export interface ClassItem {
  time: string;
  endTime: string;
  course: string;
  title: string;
  lecturers: string[];
  type: string;
}

// Fetch the full timetable once. Returns parsed entries array.
export async function fetchAllTimetable(baseUrl: string, opts?: { limit?: number; signal?: AbortSignal }) {
  const limit = String(opts?.limit ?? 1000);
  const params = new URLSearchParams({ page: '1', limit });
  const url = `${baseUrl}?${params.toString()}`;
  const res = await fetch(url, { headers: { Accept: '*/*' }, signal: opts?.signal });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Timetable API ${res.status} ${res.statusText}${body ? ': ' + body : ''}`);
  }
  const data = await res.json().catch(() => ({}));
  return (data?.entries || data || []) as TimetableEntry[];
}

export function parseTime(t: string) {
  if (!t) return 0;
  const m = t.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (!m) return 0;
  let hh = parseInt(m[1], 10);
  const mm = parseInt(m[2], 10);
  const ampm = m[3];
  if (ampm) {
    if (/pm/i.test(ampm) && hh !== 12) hh += 12;
    if (/am/i.test(ampm) && hh === 12) hh = 0;
  }
  return hh * 60 + mm;
}

export function formatTime(t: string) {
  if (!t) return '';
  if (/AM|PM/i.test(t)) return t;
  const parts = t.split(':');
  if (parts.length < 2) return t;
  let hh = parseInt(parts[0], 10);
  const mm = parts[1];
  const ampm = hh >= 12 ? 'PM' : 'AM';
  hh = hh % 12 || 12;
  return `${hh}:${mm} ${ampm}`;
}

export function filterTimetableEntries(
  entries: TimetableEntry[],
  filters: { day?: string; level?: string; session?: string; semester?: string }
): ClassItem[] {
  const classes: ClassItem[] = [];
  const { day: selectedDay, level: selectedLevel, session: selectedSession, semester: selectedSemester } = filters;

  const expectedSem = (selectedSemester || '').toString().toLowerCase().includes('first')
    ? 'first'
    : (selectedSemester || '').toString().toLowerCase().includes('second')
      ? 'second'
      : (selectedSemester || '').toString().toLowerCase();

  entries.forEach((entry) => {
    const matchesLevel = (entry.level || '').toString().trim() === (selectedLevel || '').toString().trim();
    const matchesSession = (entry.session || '') === (selectedSession || '');
    const sem = (entry.semester || '').toString().toLowerCase();
    const matchesSemester = expectedSem ? sem.includes(expectedSem) : true;
    if (!matchesLevel || !matchesSession || !matchesSemester) return;

    const daysArr = entry.days || [];
    daysArr.forEach(d => {
      if (!selectedDay || d.day === selectedDay) {
        classes.push({
          time: formatTime(d.startTime || ''),
          endTime: formatTime(d.endTime || ''),
          course: entry.courseCode || entry.courseTitle || 'Unknown',
          title: entry.courseTitle || entry.courseCode || 'No title',
          lecturers: entry.lecturers || [],
          type: 'lecture',
        });
      }
    });
  });

  classes.sort((a, b) => parseTime(a.time) - parseTime(b.time));
  return classes;
}

export interface CurrentSemesterResponse {
  currentSemester?: string;
  currentSession?: string;
}


export function getDefaultDay(): string {
  const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const d = new Date();
  return names[d.getDay()];
}

export async function fetchCurrentSemester(
  apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/timetable/current-semester`,
  opts?: { signal?: AbortSignal }
): Promise<CurrentSemesterResponse> {
  const res = await fetch(apiUrl, { headers: { Accept: 'application/json' }, signal: opts?.signal });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Current-semester API ${res.status} ${res.statusText}${body ? ': ' + body : ''}`);
  }
  const data = await res.json().catch(() => ({}));
  return {
    currentSemester: data?.currentSemester,
    currentSession: data?.currentSession,
  } as CurrentSemesterResponse;
}

/**
 * Convenience helper that returns the default filters: day, session and semester.
 * It computes day locally and fetches current session/semester from the API.
 */
export async function getDefaultFilters(apiUrl?: string, opts?: { signal?: AbortSignal }) {
  const day = getDefaultDay();
  const sem = await fetchCurrentSemester(apiUrl, opts).catch(() => ({} as CurrentSemesterResponse));
  return { day, session: sem.currentSession, semester: sem.currentSemester };
}
