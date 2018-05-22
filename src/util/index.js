export default {
	reg:{
         //违背规则的字段提示
         alertText: {
            'illegal_word': '请输入合法字符',
            'number': '请输入数字',
            'require': '字段不能为空'
        },

        //非法字符
        illegal_word: /[`~!.\-_;:,""@\?#$%^&*+<>\\\|{}\/'[\]]/img,

        //检验数字类字段用以下两个正则
        minus: /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/, //校验负数
        positive: /^\d+(\.\d+)?$/, //校验正数,

        //检验非空
        require: /^[\s\S]*.*[^\s][\s\S]*$/
    }
}
