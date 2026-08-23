window.STORE={
  profileKey:'tin_review_profile_v2',
  stateKey:g=>`tin${g}_review_v2`,
  defaults(){return {completedLessons:[],attempted:0,correct:0,wrongIds:[],examHistory:[],theme:'light'};},
  loadProfile(){try{return {...{name:'',className:'',studentCode:''},...(JSON.parse(localStorage.getItem(this.profileKey))||{})};}catch(e){return {name:'',className:'',studentCode:''};}},
  saveProfile(p){localStorage.setItem(this.profileKey,JSON.stringify(p));},
  load(g){try{return {...this.defaults(),...(JSON.parse(localStorage.getItem(this.stateKey(g)))||{})};}catch(e){return this.defaults();}},
  save(g,d){localStorage.setItem(this.stateKey(g),JSON.stringify(d));},
  reset(g){localStorage.removeItem(this.stateKey(g));return this.defaults();}
};
