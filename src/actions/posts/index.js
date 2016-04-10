import Action from 'candycane/lib/action';

export default class PostsIndex extends Action {

  /**
   * Simplified promise aware hook for finding data
   * @return {any} POJO or Promise of data
   */
  data() {
    return this.app.store.model(`Post`).fetchAll({
      withRelated: ['comments'],
    });
  }

  after(data) {
    return this.app.mapper.map(data, 'post');
  }
}
