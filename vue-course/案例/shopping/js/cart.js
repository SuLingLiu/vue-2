
let vm = new Vue({
	el: '#app',
	data () {
		return {
			totalMoney: 0,
			productList: [],
			checkAllFlag: false,
			curProduct:'',
			delFlag: false
		}
	},

	mounted () {// 页面加载完成后会调用此函数
		this.$nextTick(function () {// 加个函数可以保证 this和vm是一样 都可以掉用
			vm.cartView();
		})
	},
	methods: {
		cartView () {
			this.$http.get('data/data.json',{"id":1}).then(res => { //作用域指向了外层 里面的this就是外面的this
                this.productList = res.body.result.list;
                // _this.productList = res.body.result.totalMoney;
            }); // 调用http方法
		},
		changeMoney (item,way) {
			if(way > 0) {
				item.productQuantity ++;
			}else {
				if(item.productQuantity > 1) {
					item.productQuantity --;
				}else {
					item.productQuantity = 1;
				}
				
			}
		},
		selectedProduct (item) {
			if(typeof item.checked === 'undefined') {
				Vue.set(item,'checked',true);
				// 全局注册 往item注册一个checked 值为true
                // this.$set(item,'checked',true);//局部注册 加$
			}else {
				item.checked = !item.checked;// 有了之后 点击是false
			}
			console.log(this.productList)
			this.productList.forEach((item, index) => {
				if(!item.checked) {
					this.checkAllFlag = false;
					return false;
				}
				if(index == this.productList.length -1) {
					this.checkAllFlag = true;
				}
			})
		},
		checkAll (flag) {
			this.checkAllFlag = flag;
			this.productList.forEach((item, index) => {
				if(typeof item.checked === 'undefined') {
					this.$set(item,'checked',true);
				}
					
				item.checked = this.checkAllFlag;
			})
		},
		delProduct () {
			// this.delProduct.$delete(this.curProduct); vue1.0的版本 现在不支持了
			//删除数组中的某一项
			var index = this.productList.indexOf(this.curProduct);
			this.productList.splice(index,1);
			this.delFlag = false;
		},
		delConfirm:function ( item ) {
            this.delFlag = true;
            this.curProduct = item;
        }
	},
	watch: {
		productList: {
			handler () {
				this.totalMoney = 0 ; // 每一次执行之后把总金额清零
				this.productList.forEach((item, index) => {
					if(item.checked) {
						this.totalMoney += item.productPrice * item.productQuantity;
					}
				})
			},
			deep: true //深度监控
		}
	},
	filters: {// 过滤器
		formatMoney (value) {// 局部过滤器
			return "￥" + value.toFixed(2);
		}
	}
})
Vue.filter('money',function ( value, type ) { //全局过滤器 好处就是所有的页面都可以使用这个过滤器
    return '￥'+value.toFixed(2)+type
});