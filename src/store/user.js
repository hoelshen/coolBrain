import {
  observable,
  action,
  computed
} from 'mobx'


class userStore {
  @observable createTime = 0;
  @observable useTime = 0;
  @observable creatDay =  '';
  @observable useDay =  0;
  @observable avatarUrl =  '';
  @observable name =  '';
  
  @computed get diffDay() {
    var dateStart = this.creatDay;
    var dateEnd = new Date();
    return this.useDay = (dateEnd - dateStart) / (1000 * 60 * 60 * 24)
  }

  @computed get diffTime() {
    var dateStart = this.createTime;
    console.log('dateStart: ', dateStart);
    /* var dateEnd = new Date();
    return this.useDay = (dateEnd - dateStart) / (1000 * 60 * 60 * 24) */
  }

  //存储分钟数
  @action.bound
  getCreateTime(){
    this.createTime = new Date().getMinutes();
  } 

  //存储天数
  @action.bound
  getCreateDay(){
    this.createDay = new Date();
  } 

  @action.bound
  updateInfo(avatarUrl, name){
    this.avatarUrl = avatarUrl
    this.name = name
  }
}
export default new userStore()
