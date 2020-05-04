import {
  observable,
  action,
  computed
} from 'mobx'


class dayStore {
  @observable createTime = 0;
  @observable useTime = 0;

  @computed get diffDay() {
 
  }

  @computed get diffTime() {

  }

  //存储分钟数
  @action.bound
  getCreateTime(){
   
  } 

  //存储天数
  @action.bound
  getCreateDay(){
    
  } 
}
export default new dayStore()
