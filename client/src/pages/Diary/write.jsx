import Taro, { Component } from "@tarojs/taro";
import { View, Image, Textarea,Text, Button } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import NavBar from "@/components/Navbar/index";
import Group6 from "@/assets/Group6.png";
import topSign from "@/assets/topSign.png";
import Mood from "@/components/Mood/index";
import userStore from "@/store/user";

import bottomSign from "@/assets/bottomSign.png";
import share from "@/assets/fx.png";
import { getResultData_postsDiary,getResultData_postComment,getResultData_checkMood,getResultData_moodTody } from "@/servers/servers";

import "./write.less";

@inject("userStore")
@observer
class Index extends Component {
  constructor() {
    super();
    this.state = {
      commentText:'',
      showComment: false,
      isShow: false,
    };
  }
  componentWillMount() {}

  async componentDidMount() {

  }

  static options = {
    addGlobalClass: true
  };

  onPostDiary(){
    const { showComment, commentText } =  this.state

    if(showComment){
      commentText && getResultData_postsDiary({'text': commentText, location:'public'})
      commentText && getResultData_postsDiary({'text': commentText, location: 'private'})
    } else {
      commentText && getResultData_postsDiary({'text': commentText, location: 'private'})
    }
    Taro.navigateTo({ url: `/pages/index/index` });
  }

  handleChange(e){
    this.setState({commentText: e.detail.value});
  }

  onCheck(){
    this.setState({showComment: !this.state.showComment})
  }
  componentDidHide() {}

  render() {
    const { showComment,commentText , isShow} = this.state;

    return (
      <View>
        <NavBar text='' color='white' type='' />
        <View class='modal_content'>
          <View class='modal_btn'>
            <View className='played'>
              <span>写日记</span>
              <Image className='iconImg topSign' src={topSign} />
              <View className='AreaDiv'>
              {
               !isShow && <Textarea placeholder='记录今天的冥想日记吧~' className='textArea'  value={commentText}  onInput={this.handleChange.bind(this)}  autoFocus  autoHeight />
              }<View className={showComment ? 'cheShareView': 'shareView'} onClick={this.onCheck}> 
              </View>  
              <Text className='shareText'>
                分享到评论区
              </Text>
              </View>
              <Image className='iconImg bottomSign' src={bottomSign} />
              <View className='foot'>
                <View  className='record' onClick={this.onPostDiary}>
                  记录
                </View>
                <Button className='shareBtn'>
                  <Image className='shareImg' src={share} />
                </Button>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default Index;
