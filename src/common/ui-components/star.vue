<template>
    <span class="app-star">
        <Icon 
            :size="size" 
            :name="item.name"
            :style="{color: item.isDefault ? defaultColor : goodColor}" 
            v-for="item in getStarList" 
            :key="item.key"
        />
    </span>
</template>

<script>
/* 评分组件 */
import Icon from '@/common/ui-components/Icon';
//数字格式化预处理
const calculate = (num) => {
	//如果传递过来的是整数，那么直接返回。
	//否则，若小数位小于等于5则进至.5，若大于5则向上取整
	if(parseInt(num) != num) { 
		num = num.toFixed(1);
		let decimal = parseInt(num.split('.')[1]);
		if(decimal <= 5) {
			num = num.split('.')[0]+'.'+'5';
		}
		else{
			num = Math.ceil(num);
		}
		return parseFloat(num);
	}
	return num;
}
export default {
    name: 'Star',
    props: {
        starsNum: {
            type: Number,
            default: 5
        },
        goodNum: {
            type: Number,
            default: 0
        },
        goodColor: {
            type: String,
            default: '#FFD716'
        },
        defaultColor: {
            type: String,
            default: '#dddddd'
        },
        size: {
            type: Number,
            default: 20
        }
    },
    computed: {
        getStarList() {
            const num = calculate(this.goodNum);
            //判断传过来的数字是否有小数
            const isInteger = parseInt(num) == num ? true : false;
            const floorNum = Math.floor(num);
            let startList = [];
            if(this.starsNum < num) {
                for(let i = 0; i < this.starsNum; i++) {
                    startList.push({
                        key: i,
                        name: 'md-star',
                        isDefault: false
                    })

                }
            }
            else{
                for(let i = 0; i < this.starsNum; i++) {
                    //首先添加好评星星
                    if(i < floorNum) {
                        startList.push({
                            key: i,
                            name: 'md-star',
                            isDefault: false
                        })
                    }
                    else {
                        //如果存在半星，则添加半星并跳过当前循环
                        if((i == floorNum) && !isInteger) {
                            startList.push({
                                key: floorNum,
                                name: 'md-star-half',
                                isDefault: false
                            })
                            continue;
                        }
                        //添加默认星星
                        startList.push({
                            key: i,
                            name: 'md-star',
                            isDefault: true
                        })
                    }
                }
            }
            return startList;
        }
    },
    components: {
        Icon
    }
}
</script>

<style lang="scss" scoped>
@import '../basic';
.app-star {
    i {
        padding: 0 px2rem(1);
    }   
}
</style>


