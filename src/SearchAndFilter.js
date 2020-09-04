class SearchAndFilter {
  searchAndFilter(courses, searchList, subject, minimumCredits, maximumCredits, selector) {
    if(searchList.length) {
      let coursesAfterSearch = [];

      for(const course of Object.values(courses)) {
        if (selector === 'AND' && searchList.every((t) => course.keywords.includes(t))) {
          coursesAfterSearch.push(course);
          console.log('found it');
        } else if (selector === 'OR' && searchList.some((t) => course.keywords.includes(t))) {
          coursesAfterSearch.push(course);
        }
      }

      courses = coursesAfterSearch;
    }

    if(subject !== 'All') {
      let coursesAfterSubject = [];

      for(const course of Object.values(courses)) {
        if(course.subject === subject)
          coursesAfterSubject.push(course)
      }
      courses = coursesAfterSubject;
    }

    if(minimumCredits !== '') {
      let coursesAfterMinimumCredits = [];

      for(const course of Object.values(courses)) {
        if(course.credits >= parseInt(minimumCredits))
          coursesAfterMinimumCredits.push(course);
      }
      courses = coursesAfterMinimumCredits;
    }

    if(maximumCredits !== '') {
      let coursesAfterMaximumCredits = [];

      for(const course of Object.values(courses)) {
        if(course.credits <= parseInt(maximumCredits))
          coursesAfterMaximumCredits.push(course);
      }
      courses = coursesAfterMaximumCredits;
    }

    return courses;
  }
}

export default SearchAndFilter;
