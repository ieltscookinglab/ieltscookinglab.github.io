async function loadReviews() {
  try {
    const res = await fetch('/data/reviews.json');
    const reviews = await res.json();
    Alpine.store('json').reviews = reviews;

  } catch (error) {
    console.error("Error loading reviews data:", error);
  }
}
async function loadStudents() {
  try {
    const res = await fetch('/data/students.json');
    const students = await res.json();
    Alpine.store('json').students = students;
    Alpine.store('json').recentStudents = students.slice(-4);

  } catch (error) {
    console.error("Error loading students data:", error);
  }
}
async function loadActivities() {
  try {
    const res = await fetch('/data/activities.json');
    const activities = await res.json();
    Alpine.store('json').activities = activities;
    Alpine.store('json').recentActivities = activities.slice(-4);
  } catch (error) {
    console.error("Error loading activities data:", error);
  }
}
async function loadURLs() {
  try {
    const res = await fetch('/data/urls.json');
    const URLs = await res.json();
    Alpine.store('json').URLs = URLs;
    scrollAnimation();
  } catch (error) {
    console.error("Error loading URLs data:", error);
  }
}

document.addEventListener('alpine:init', () => {
  Alpine.store('json', {
    reviews: [],
    students: [],
    recentStudents: [],
    activities: [],
    recentActivities: [],
    URLs: {},
  });

  Promise.all([
    loadReviews(),
    loadActivities(),
    loadURLs(),
    loadStudents()
  ])
  .then(() => {
    // 👇 Alpine re-renders after data change — this waits for DOM
    Alpine.nextTick(() => {
      scrollAnimation();
      carousel();
    });
  })
  .catch(err => console.error("Error loading data:", err));
});