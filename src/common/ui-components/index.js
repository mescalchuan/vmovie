//封装评分组件（目前只有展示评分的功能）
import React, {Component} from 'react';
import { View,Text } from 'react-native';
//加载字体图标
import Icon from 'react-native-vector-icons/FontAwesome';
//数字格式化预处理
const calculate=(num)=>{
	//如果传递过来的是整数，那么直接返回。
	//否则，若小数位小于等于5则进至.5，若大于5则向上取整
	if(parseInt(num)!=num){ 
		num=num.toFixed(1);
		let decimal=parseInt(num.split('.')[1]);
		if(decimal<=5){
			num=num.split('.')[0]+'.'+'5';
		}
		else{
			num=Math.ceil(num);
		}
		return parseFloat(num);
	}
	return num;
}

export default class Stars extends Component{
	//指定默认属性的值
	//starsNum：总星星数
	//goodNum：好评星星数
	//goodsColor：好评星星的颜色
	//defaultColor：默认星星的颜色
	//size：星星的大小
	static defaultProps={
    	starsNum:5,
   	 	goodNum:0,
   	 	goodColor:'#f75b25',
   	 	defaultColor:'#dddddd',
   	 	size:10
 	}
 	//指定属性的变量类型
 	static propTypes={
    	starsNum:React.PropTypes.number.isRequired,
    	goodNum:React.PropTypes.number.isRequired,
    	goodColor:React.PropTypes.string.isRequired,
    	defaultColor:React.PropTypes.string.isRequired,
    	size:React.PropTypes.number.isRequired
  	}
	render(){
		let num=calculate(this.props.goodNum);
		//判断传过来的数字是否有小数
		let flag=parseInt(num)==num?true:false;
		let floorNum=Math.floor(num);
		let props={
			size:this.props.size,
			color:this.props.goodColor,
			style:{
				paddingLeft:2
			}
		};
		//如果传递过来的属性不符合要求，提示错误信息
		if(this.props.starsNum<0 || num<0 || this.props.size<0){
			return (
				<Text style={{color:'red'}}>starsNum\goodNum\size must greater than or equal to 0</Text>
			);
		}
		let starList=[];
		//如果好评星星数大于总星星数，则全部展示为好评星星
		if(this.props.starsNum<num){
			for(let i=0;i<this.props.starsNum;i++){
				starList.push(<Icon key={i} name='star' {...props}/>);
			}
		}
		else{
			for(let i=0;i<this.props.starsNum;i++){
				//首先添加好评星星
				if(i<floorNum){
					starList.push(<Icon key={i} name='star' {...props}/>);
				}
				else{
					//如果存在半星，则添加半星并跳过当前循环
					if((i==floorNum) && !flag){
						starList.push(<Icon key={floorNum} name='star-half-o' {...props}/>);
						continue;
					}
					//添加默认星星
					starList.push(<Icon key={i} name='star' {...props} color={this.props.defaultColor}/>);
				}
			}
		}
		return(
			<View style={{flexDirection:'row'}}>
				{starList}
			</View>
		);
	}
}