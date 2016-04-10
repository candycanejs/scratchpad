import { jsonApiSupport } from 'candycane/decorators/actions';
import Action from 'candycane/action';

@jsonApiSupport('users', {collection: true})
export default class CourseIndex extends Action {

  /**
   * Simplified promise aware hook for finding data
   * @return {any} POJO or Promise of data
   */
  data() {
    return this.app.db('users')
      .select(['email', 'id']);
  }
}
