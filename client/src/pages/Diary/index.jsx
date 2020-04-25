import Taro, { Component } from "@tarojs/taro";
import { View, Text  } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import NavBar from "@/components/Navbar/index";
import Comment from '@/components/Comment/index';
import Comment2 from '@/components/Comment2/index';


import { getResultData_getDiary,getResultData_getComment } from '@/servers/servers'

import "./index.less";

@inject("userStore")
@observer
class Index extends Component {
  constructor(){
    super();
    this.state = {
      commentList:[],
      diaryList:[]
    }
  }

  componentWillMount() {

  }

  async componentDidMount() {
    const diary = await getResultData_getDiary()
    this.setState({diaryList: diary.data.objects})
    const comment = await getResultData_getComment()
    this.setState({commentList: comment.data.objects})
  }

  componentWillUnmount() {}

  static options = {
    addGlobalClass: true
  };

  componentDidShow() {

  }

  componentDidHide() {}



  onMail(){
    Taro.navigateTo({ url: `/pages/Mail/index` });
  }
  render() {
    const { diaryList, commentList } = this.state;
    let CommentList , CommentList2;
    if(commentList.length>0){
       CommentList = commentList.map((comment) =>{
        const time = (comment.created_at).split(' ');
        comment.time = time[0]
         return(
           <Comment taroKey={String(comment.id)} created_at={comment.time} text={comment.text} />
         )
     })
    }
    if(diaryList.length>0){
      CommentList2  = diaryList.map( (diary)=>{
        const time = (diary.created_at).split(' ');
        diary.time = time[0]
        return(
          <Comment2 taroKey={String(diary.id)} created_at={diary.time} text={diary.text} />
        )
      })
    }

         
    return (
      <View>
        <NavBar text='' color='#fff' type='2' />
        <View className='head'>我的冥想日记</View>
        {CommentList}
        <View className='foot'>
          <Text class='text1'>评论区</Text>
          <Text class='text2' onClick={this.onMail}>查看全部</Text>
          {CommentList2}
        </View>
      </View>
    );
  }
}
export default Index;
