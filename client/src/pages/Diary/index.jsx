import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { observer } from "@tarojs/mobx";
import NavBar from "@/components/Navbar/index";
import Comment from "@/components/Comment/index";
import Comment2 from "@/components/Comment2/index";

import { getResultData_getDiary } from "@/servers/servers";

import "./index.less";

@observer
class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      commentList: [],
      diaryList: []
    };
  }

  async componentDidMount() {
    const diary = await getResultData_getDiary({ location: "private" }); //日记
    if (JSON.stringify(diary.data) !== "{}") {
      this.setState({ diaryList: diary.data.objects });
    }
    const comment = await getResultData_getDiary({ location: "public" }); //评论

    if (JSON.stringify(comment.data) !== "{}") {
      this.setState({ commentList: comment.data.objects });
    }
  }
  
  // mobx数据改变进行渲染函数（）
  componentWillReact () {
    console.log('该更新数据了')
  }
  static options = {
    addGlobalClass: true
  };


  onPostDiary(){
    Taro.navigateTo({ url: `/pages/Diary/write` });
  }
  
  onMail() {
    Taro.navigateTo({ url: `/pages/Mail/index` });
  }

  render() {
    const { diaryList, commentList } = this.state;
    let CommentList, CommentList2;
    if (diaryList.length > 0) {
      //日记
      CommentList = diaryList.map(diary => {
        const time = diary.created_at.split(" ");
        diary.time = time[0];
        return (
          <Comment2
            key={String(diary.id)}
            created_at={diary.time}
            text={diary.text}
            showPush={diary.is_public}
            CommentId={diary.id}
          />
        );
      });
    }

    if (commentList.length > 0) {
      //评论
      CommentList2 = commentList
        .filter((l, index) => index < 2)
        .map(comment => {
          const time = comment.created_at.split(" ");
          comment.time = time[0];
          return (
            <Comment
              key={String(comment.id)}
              avatarUrl={comment.owner.avatar}
              nickName={comment.owner.name}
              created_at={comment.time}
              text={comment.text}
            />
          );
        });
    }

    return (
      <View>
        <NavBar text='' color='#fff' type='2' />
        <View className='head'>
          <View className='text1'>我的冥想日记</View>
          <View onClick={this.onPostDiary} className='postDiary'>写日记</View>
        </View>
          {diaryList.length > 0 ? (
            CommentList
          ) : (
            <View style='margin: 20px'>暂无数据</View>
          )}
        <View className='foot'>
          <Text className='text1'>评论区</Text>
          <Text className='text2' onClick={this.onMail}>
            查看全部
          </Text>
          {commentList.length > 0 ? (
            CommentList2
          ) : (
            <View style='margin:20px 0'>暂无数据</View>
          )}
        </View>
      </View>
    );
  }
}
export default Index;
