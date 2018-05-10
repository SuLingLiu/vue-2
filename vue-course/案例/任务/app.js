

var list = [
	{
		title:"吃饭打豆豆",
		isChecked:true // 状态为false，为不选中  任务未完成
	},
	{
		title:"妙味课堂",
		isChecked:true   //状态为true，为选中    任务完成
	}
];
new Vue({
	data: {
		list: list
	},
	el: '.main'
})