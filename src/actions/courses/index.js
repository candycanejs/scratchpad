import { createAfterHook } from 'candycane/decorators/action-hook-helpers';

import Action from 'candycane/action';

const slowDown = createAfterHook(function(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({data}), 800);
  });
});

@slowDown
export default class CourseIndex extends Action {

  /**
   * Simplified promise aware hook for finding data
   * @return {any} POJO or Promise of data
   */
  data() {
    return [
      {
        type: 'courses',
        id: 1,
        attributes: {
          name: this.request.query.name || 'Learn Ember',
        },
      },
    ];
  }
}
