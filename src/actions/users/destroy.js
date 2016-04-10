import { jsonApiSupport } from 'candycane/lib/decorators/actions';
import Action from 'candycane/lib/action';

@jsonApiSupport('users')
export default class CourseIndex extends Action {
  /**
   * Simplified promise aware hook for finding data
   * @return {any} POJO or Promise of data
   */
  data() {
    return this.app.db('users')
      .where({id: this.request.params.id})
      .delete();
  }
}
