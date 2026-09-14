import { COURSES } from "../src/lib/course-data";
for (const c of COURSES) {
  const units = c.levels.flatMap(l=>l.units);
  const lessons = units.flatMap(u=>u.lessons);
  console.log(c.id, "levels", c.levels.length, "units", units.length, "lessons", lessons.length, "| lastUnit", units[units.length-1].id, units[units.length-1].title, "lastLessons", units[units.length-1].lessons.map(l=>l.id).join(","));
}
