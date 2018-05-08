export default {
	filter(obj) {
		for(let i in obj) {
			if(obj[i]===null||obj[i]==='') {
				delete obj[i]
			}
		}
		return obj;
	},
	merge(obj1,obj2){
		let obj={};
		for(let i in obj1){
			if(obj[i]==undefined){
				obj[i]=obj1[i]
			}
		}
		for(let i in obj2){
			obj[i]=obj2[i]
		}
		return obj;
	}
}