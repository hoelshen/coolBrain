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

import "./success.less";

@inject("userStore")
@observer
class Index extends Component {
  constructor() {
    super();
    this.state = {
      isDuration: '',
      commentText:'',
      showComment: false,
      isShow: false,
      fileId: ''
    };
  }
  componentWillMount() {}

  async componentDidMount() {
    const  {  duration, fileId   } = this.$router.params;
    this.setState({
      isDuration: parseInt(Number(duration) / 60),
      fileId
    });
    const value = await getResultData_checkMood()
    if(value.data.is_clock){
      this.setState({isShow: false})
    } else {
      this.setState({isShow: true})
    }
  }

  static options = {
    addGlobalClass: true
  };

  onPostDiary(){
    const { showComment, commentText, isDuration } =  this.state
    getResultData_moodTody({duration:isDuration})

    if(showComment){
      commentText && getResultData_postsDiary({'text': commentText, location:'public'})
      commentText && getResultData_postsDiary({'text': commentText, location: 'private'})
    } else {
      commentText && getResultData_postsDiary({'text': commentText, location: 'private'})
    }
    Taro.navigateTo({ url: `/pages/index/index` });
  }
  onClose(){
    Taro.reLaunch({ url: `/pages/index/index` });
  }
  handleChange(e){
    this.setState({commentText: e.detail.value});
  }

  onCheck(){
    this.setState({showComment: !this.state.showComment})
  }
  componentDidHide() {}

  render() {
    const {isDuration, showComment,commentText , isShow} = this.state;
    const ModalComProps = {
      isShow: this.state.isShow,
      onCancelCallback: ()=>{     
        this.setState({isShow: false})
      }
    }
    return (
      <View>
        <NavBar text='' color='#8CC9BD' type='' />
        <View class='modal_content'>
          <View class='modal_btn'>
            <View className='played'>
              <View className='head ' style='background-size: 100% 100%;'>
                <View className='top' onClick={this.onClose}>
                  <Image src={Group6} className='Group6Img' />
                </View>
                <View className='body'>
                  <View>本次冥想分钟数</View>
                  <View className='num'>{isDuration}</View>
                </View>
              </View>
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
        <Mood  isShow={isShow} isDuration={isDuration} {...ModalComProps} />
      </View>
    );
  }
}
export default Index;
