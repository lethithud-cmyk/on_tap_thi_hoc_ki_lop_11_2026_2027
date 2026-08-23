window.STORE = {
  key:'tin11_review_v1',
  defaults(){return {completedLessons:[],attempted:0,correct:0,wrongIds:[],examHistory:[],theme:'light',profile:{name:'',className:''}};},
  load(){try{return {...this.defaults(),...(JSON.parse(localStorage.getItem(this.key))||{})};}catch(e){return this.defaults();}},
  save(data){localStorage.setItem(this.key,JSON.stringify(data));},
  reset(){localStorage.removeItem(this.key); return this.defaults();}
};
